import { NextRequest, NextResponse } from "next/server";
import { PATH, protectedPathValues, routeRoleGroups } from "./config";
import jwt from "jsonwebtoken";

// Middleware to handle locale and authentication
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Define supported locales
  const supportedLocales = ["en", "fr", "es"]; // Add your supported locales here
  const defaultLocale = "en";

  // Skip if requesting static assets or OAuth2 authorization endpoints
  if (
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/static/") ||
    pathname.includes(".") ||
    pathname.endsWith(".css") ||
    pathname.startsWith("/api/") || // Skip all API calls
    pathname.startsWith("/api/auth/oauth2/authorization/") || // Skip OAuth2 authorization
    pathname.startsWith("/api/auth/oauth2/callback/") || // Skip OAuth2 callback
    pathname.includes("/api/")
  ) {
    return NextResponse.next();
  }

  // Extract the locale and real pathname
  const localeMatch = pathname.match(/^\/([a-z]{2})(\/|$)/);
  const currentLocale = localeMatch ? localeMatch[1] : defaultLocale;
  const currentPathname = localeMatch
    ? pathname.replace(/^\/[a-z]{2}/, "")
    : pathname;

  // Redirect if locale is not supported
  if (localeMatch && !supportedLocales.includes(currentLocale)) {
    return NextResponse.redirect(
      new URL(`/${defaultLocale}/${PATH.HOME.value}`, request.url)
    );
  }

  // Check the isLoggedIn cookie
  const isLoggedIn = request.cookies.get("isLoggedIn")?.value;
  const exoTkn = request.cookies.get("exoTkn")?.value;

  // Check if the current path is protected
  const isLoggedInValue =
    isLoggedIn === "true" ? true : isLoggedIn === "false" ? false : undefined;

  let currentRole: string | undefined = undefined;
  if (exoTkn) {
    try {
      const decoded = jwt.decode(exoTkn) as { currentRole?: string } | null;
      currentRole = decoded?.currentRole;
    } catch {
      // Not logged in, clear cookies and redirect to login
      const response = NextResponse.redirect(
        new URL(`/${currentLocale}/${PATH.LOGIN.value}`, request.url)
      );
      response.cookies.set("isLoggedIn", "", { maxAge: 0, path: "/" });
      response.cookies.set("exoTkn", "", { maxAge: 0, path: "/" });
      return response;
    }
  } else {
    const isProtectedPath = protectedPathValues.some((path) =>
      currentPathname.startsWith(path)
    );

    if (isProtectedPath && !isLoggedInValue) {
      return NextResponse.redirect(
        new URL(`/${currentLocale}/${PATH.LOGIN.value}`, request.url)
      );
    }

    return NextResponse.next();
  }

  if (currentRole === undefined) {
    const response = NextResponse.redirect(
      new URL(`/${currentLocale}/${PATH.LOGIN.value}`, request.url)
    );
    response.cookies.set("isLoggedIn", "", { maxAge: 0, path: "/" });
    response.cookies.set("exoTkn", "", { maxAge: 0, path: "/" });
    return response;
  }

  // Define your protected route groups and their allowed roles

  const routeRoleGroupNames = routeRoleGroups.map((group) => group.name);

  // If the pathname is the root path, redirect to the appropriate dashboard or login
  if (currentPathname === "/") {
    if (isLoggedInValue) {
      // Find the dashboard for the user's role
      const group = routeRoleGroups.find((g) =>
        g.allowedRoles.includes(currentRole)
      );
      if (group) {
        // Redirect to the dashboard for the currentRole
        return NextResponse.redirect(
          new URL(`/${currentLocale}${group.redirectDashboard}`, request.url)
        );
      } else {
        // Fallback: redirect to home if no dashboard found for role
        return NextResponse.redirect(
          new URL(`/${currentLocale}/${PATH.HOME.value}`, request.url)
        );
      }
    } else {
      // Not logged in, redirect to login
      return NextResponse.redirect(
        new URL(`/${currentLocale}/${PATH.LOGIN.value}`, request.url)
      );
    }
  }

  // Usage in your middleware:
  for (const group of routeRoleGroups) {
    // User with this role trying to access a non-group route, redirect to the equivalent route with the correct prefix
    // Example: /en/internal/admin/profile -> /en/internal/project-team/profile for project-team role
    if (
      isLoggedInValue &&
      group.allowedRoles.includes(currentRole) &&
      currentPathname.startsWith(group.pathPrefix)
    ) {
      // Already at the correct group's prefix, proceed
      return NextResponse.next();
    }

    if (
      isLoggedInValue &&
      group.allowedRoles.includes(currentRole) &&
      !currentPathname.startsWith(group.pathPrefix)
    ) {
      const targetGroup = routeRoleGroups.find((g) =>
        g.allowedRoles.includes(currentRole)
      );

      if (targetGroup && !currentPathname.startsWith(targetGroup.pathPrefix)) {
        if (currentPathname === `/${PATH.LOGIN.value}`) {
          // If the current path is /login, skip and proceed
          return NextResponse.next();
        }

        // Get all routeRoleGroup names except for the targetGroup name
        const otherGroupNames = routeRoleGroupNames.filter(
          (name) => name !== targetGroup.name
        );

        // Check if currentPathname contains any of the otherGroupNames as a path segment
        const containsOtherGroup = otherGroupNames.some((name) =>
          currentPathname.split("/").includes(name)
        );

        let newPathname;
        if (containsOtherGroup) {
          // Replace the other group name in the path with the targetGroup name
          let updatedPathname = currentPathname;
          const otherGroupNames = routeRoleGroupNames.filter(
            (name) => name !== targetGroup.name
          );
          for (const name of otherGroupNames) {
            const regex = new RegExp(`/${name}(/|$)`);
            if (regex.test(updatedPathname)) {
              updatedPathname = updatedPathname.replace(
                regex,
                `/${targetGroup.name}$1`
              );
              break;
            }
          }
          // Update newPathname to use the updatedPathname
          newPathname = updatedPathname;
        }

        if (newPathname === undefined) {
          // If no other group name was found, just prepend the targetGroup name
          return NextResponse.next();
        }

        // Remove console logs in production
        return NextResponse.redirect(
          new URL(`/${currentLocale}/${newPathname}`, request.url)
        );
      } else {
        // Already at the correct group's prefix, proceed
        return NextResponse.next();
      }
    } else if (
      !isLoggedInValue &&
      currentPathname.startsWith(group.pathPrefix)
    ) {
      if (!group.allowedRoles.includes(currentRole)) {
        // Not allowed, redirect to login
        return NextResponse.redirect(
          new URL(`/${currentLocale}/${PATH.LOGIN.value}`, request.url)
        );
      }

      if (!isLoggedInValue) {
        // Not logged in, redirect to login
        return NextResponse.redirect(
          new URL(`/${currentLocale}/${PATH.LOGIN.value}`, request.url)
        );
      }
      // Allowed and logged in
      return NextResponse.next();
    }
  }
}

export const config = {
  matcher: ["/", "/:path*"], // Explicitly include the root path
};
