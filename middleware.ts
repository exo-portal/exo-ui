import { NextRequest, NextResponse } from "next/server";
import { protectedPathValues, PATH } from "./config";

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

  // If the cookie is not set, redirect to the login page
  const protectedRoutes: string[] = protectedPathValues;

  // Check if the current path is protected
  const isLoggedInValue =
    isLoggedIn === "true" ? true : isLoggedIn === "false" ? false : undefined;

  if (currentPathname === "/") {
    if (isLoggedInValue) {
      return NextResponse.redirect(
        new URL(`/${currentLocale}/${PATH.HOME.value}`, request.url)
      );
    } else {
      return NextResponse.redirect(
        new URL(`/${currentLocale}/${PATH.LOGIN.value}`, request.url)
      );
    }
  }

  // If the cookie is not set, redirect to the login page
  if (protectedRoutes.includes(currentPathname)) {
    if (isLoggedInValue) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        new URL(`/${currentLocale}/${PATH.LOGIN.value}`, request.url)
      );
    }
  } else {
    if (isLoggedInValue) {
      return NextResponse.redirect(
        new URL(`/${currentLocale}/${PATH.HOME.value}`, request.url)
      );
    } else {
      return NextResponse.next();
    }
  }
}

export const config = {
  matcher: ["/", "/:path*"], // Explicitly include the root path
};
