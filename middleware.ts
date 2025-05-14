import { NextRequest, NextResponse } from "next/server";
import { axiosInstance } from "./lib";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const cookie = request.headers.get('cookie') || '';

  console.log("Cookie:", cookie);

  // Define supported locales
  const supportedLocales = ["en", "fr", "es"]; // Add your supported locales here
  const defaultLocale = "en";

  if (pathname.includes("/api/auth")) {
    console.log("API request detected");
    console.log(pathname);
  }

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

  console.log("Current Locale:", currentLocale);
  console.log("Current Pathname:", currentPathname);

  if (currentPathname === "/") {
    return NextResponse.redirect(
      new URL(`/${currentLocale}/login`, request.url)
    );
  }

  let isAuthenticated = false;

  console.log("testing axios instance");
  // const session = await fetch(
  //   "http://localhost:8080/api/auth/authentication/validate-session",
  //   {
  //     method: "GET",
  //     credentials: "include",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   }
  // )
  //   .then((response) => {
  //     if (response.status === 200) {
  //       isAuthenticated = true;
  //     }
  //   })
  //   .catch(() => {
  //     console.log("User is not authenticated, redirecting to login page.");
  //     isAuthenticated = false;
  //   });

  // Define guest routes
  const guestRoutes: string[] = [
    "/login",
    "/register",
    "/forgot-password",
    "/",
  ];

  // Check if the current pathname is a guest route
  const isGuestRoute = guestRoutes.some((route) =>
    currentPathname.startsWith(route)
  );

  console.log("Is Guest Route:", isGuestRoute);
  console.log("Is Authenticated:", isAuthenticated);

  if (isGuestRoute) {
    return NextResponse.next();
  } else {
    if (isAuthenticated) {
      console.log("User is authenticated");
    } else {
      console.log("User is not authenticated");
      return NextResponse.redirect(
        new URL(`/${currentLocale}/login`, request.url)
      );
    }
  }

  // Allow the request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/:path*"], // Explicitly include the root path
};
