import { NextRequest, NextResponse } from "next/server";
import {
  PATH,
  AccessLevelGroup,
  ADMIN_PATH,
  HR_PATH,
  PROJECT_TEAM_PATH,
  protectedPathValues,
  APPLICANT_PATH,
  CLIENT_PATH,
} from "./config";
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

  let currentRole: string | undefined = undefined;
  if (exoTkn) {
    try {
      const decoded = jwt.decode(exoTkn) as { currentRole?: string } | null;
      currentRole = decoded?.currentRole;
    } catch {
      currentRole = undefined;
    }
  }

  if (!currentRole) {
    currentRole = "ROLE_APPLICANT"; // Default role if not found in JWT
  }

  // Define your protected route groups and their allowed roles
  const routeRoleGroups = [
    {
      pathPrefix: ADMIN_PATH.ADMIN_HOME.path,
      allowedRoles: AccessLevelGroup.INTERNAL.ADMIN,
      redirectDashboard: ADMIN_PATH.ADMIN_HOME.path,
    },
    {
      pathPrefix: HR_PATH.HR_HOME.path,
      allowedRoles: AccessLevelGroup.INTERNAL.HR,
      redirectDashboard: HR_PATH.HR_HOME.path,
    },
    {
      pathPrefix: PROJECT_TEAM_PATH.PROJECT_TEAM_HOME.path,
      allowedRoles: AccessLevelGroup.INTERNAL.PROJECT_TEAM,
      redirectDashboard: PROJECT_TEAM_PATH.PROJECT_TEAM_HOME.path,
    },
    {
      pathPrefix: APPLICANT_PATH.APPLICANT_HOME.path,
      allowedRoles: AccessLevelGroup.EXTRENAL.APPLICANT,
      redirectDashboard: APPLICANT_PATH.APPLICANT_HOME.path,
    },
    {
      pathPrefix: CLIENT_PATH.CLIENT_HOME.path,
      allowedRoles: AccessLevelGroup.EXTRENAL.CLIENT,
      redirectDashboard: CLIENT_PATH.CLIENT_HOME.path,
    },
  ];

  // Check if the current path is protected
  const isLoggedInValue =
    isLoggedIn === "true" ? true : isLoggedIn === "false" ? false : undefined;

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

  const isProtectedPath = protectedPathValues.some((path) =>
    currentPathname.startsWith(path)
  );

  if (isProtectedPath && !isLoggedInValue) {
    return NextResponse.redirect(
      new URL(`/${currentLocale}/${PATH.LOGIN.value}`, request.url)
    );
  }

  // Usage in your middleware:
  for (const group of routeRoleGroups) {
    if (currentPathname.startsWith(group.pathPrefix)) {
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
    } else if (
      group.allowedRoles.includes(currentRole) &&
      isLoggedInValue &&
      !currentPathname.startsWith(group.pathPrefix)
    ) {
      // User with this role trying to access a non-group route, redirect to their dashboard
      return NextResponse.redirect(
        new URL(`/${currentLocale}${group.redirectDashboard}`, request.url)
      );
    }
  }
}

export const config = {
  matcher: ["/", "/:path*"], // Explicitly include the root path
};
