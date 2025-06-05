import { NextRequest, NextResponse } from "next/server";
import { PATH, protectedPathValues, routeRoleGroups } from "./config";
import jwt from "jsonwebtoken";

// Function to resolve group redirects based on the current role and pathname
// This function checks if the user is logged in, their role, and the current pathname
const resolveGroupRedirect = ({
  isLoggedInValue,
  currentRole,
  currentPathname,
  currentLocale,
  PATH,
  routeRoleGroups,
  routeRoleGroupNames,
  request,
}: {
  isLoggedInValue: boolean;
  currentRole: string;
  currentPathname: string;
  currentLocale: string;
  PATH: any;
  routeRoleGroups: any[];
  routeRoleGroupNames: string[];
  request: NextRequest;
}) => {
  for (const group of routeRoleGroups) {
    if (
      isLoggedInValue &&
      group.allowedRoles.includes(currentRole) &&
      currentPathname.startsWith(group.pathPrefix)
    ) {
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
          return NextResponse.next();
        }

        const otherGroupNames = routeRoleGroupNames.filter(
          (name) => name !== targetGroup.name
        );

        const containsOtherGroup = otherGroupNames.some((name) =>
          currentPathname.split("/").includes(name)
        );

        let newPathname;
        if (containsOtherGroup) {
          let updatedPathname = currentPathname;
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
          newPathname = updatedPathname;
        }

        if (newPathname === undefined) {
          return NextResponse.redirect(
            new URL(
              `/${currentLocale}/${targetGroup.redirectDashboard}`,
              request.url
            )
          );
        }

        return NextResponse.redirect(
          new URL(`/${currentLocale}/${newPathname}`, request.url)
        );
      } else {
        return NextResponse.next();
      }
    } else if (
      !isLoggedInValue &&
      currentPathname.startsWith(group.pathPrefix)
    ) {
      if (!group.allowedRoles.includes(currentRole)) {
        return NextResponse.redirect(
          new URL(`/${currentLocale}/${PATH.LOGIN.value}`, request.url)
        );
      }

      if (!isLoggedInValue) {
        return NextResponse.redirect(
          new URL(`/${currentLocale}/${PATH.LOGIN.value}`, request.url)
        );
      }
      return NextResponse.next();
    }
  }
  return undefined;
};

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

  // If the pathname is the root path, redirect to the login
  if (currentPathname === "/") {
    return NextResponse.redirect(
      new URL(`/${currentLocale}/${PATH.LOGIN.value}`, request.url)
    );
  }

  // If the pathname is the logout path, allow it to pass through
  if (currentPathname === "/logout") {
    return NextResponse.next();
  }

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
  const isLoggedInValue = isLoggedIn === "true";

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

  // Handle group redirects based on the current role and pathname
  const groupRedirect = resolveGroupRedirect({
    isLoggedInValue,
    currentRole,
    currentPathname,
    currentLocale,
    PATH,
    routeRoleGroups,
    routeRoleGroupNames,
    request,
  });

  // If a group redirect is determined, return it
  if (groupRedirect) return groupRedirect;
}

export const config = {
  matcher: ["/", "/:path*"], // Explicitly include the root path
};
