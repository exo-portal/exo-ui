import { NextRequest, NextResponse } from "next/server";

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

  // Check the isLoggedIn cookie
  const isLoggedIn = request.cookies.get("isLoggedIn")?.value;
  const isLoggedInValue =
    isLoggedIn === "true" ? true : isLoggedIn === "false" ? false : undefined;

    // TODO::: handling redirection for authenticated users
  // const tokenValue = await request.cookies.get("tkn")?.value;

  // const guestRoutes: string[] = ["/login", "/register", "/", ""];

  // if (tokenValue != undefined) {
  //   if (isLoggedInValue === false) {
  //     // User is not logged in
  //     console.log("case 1");
  //     if (!guestRoutes.includes(currentPathname)) {
  //       return NextResponse.redirect(
  //         new URL(`/${currentLocale}/login`, request.url)
  //       );
  //     }
  //   } else if (isLoggedInValue === true) {
  //     // User is logged in
  //     console.log("case 2");
  //     if (guestRoutes.includes(currentPathname)) {
  //       return NextResponse.redirect(
  //         new URL(`/${currentLocale}/home`, request.url)
  //       );
  //     }
  //   } else {
  //     console.log("case 3");
  //     return NextResponse.redirect(
  //       new URL(`/${currentLocale}/login`, request.url)
  //     );
  //   }
  // } else {
  //   console.log("case 4");
  //   if (currentPathname !== "/login") {
  //     // User is not logged in and not on the root path
  //     return NextResponse.redirect(
  //       new URL(`/${currentLocale}/login`, request.url)
  //     );
  //   }
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/:path*"], // Explicitly include the root path
};
