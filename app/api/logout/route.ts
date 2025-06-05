import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const backendUrl = process.env.BACKEND_URL;
  if (!backendUrl) {
    return NextResponse.json(
      { success: false, error: "BACKEND_URL not set" },
      { status: 500 }
    );
  }

  // Call your backend API to logout
  await fetch(`${backendUrl}/api/auth/authentication/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Clear your auth cookies here
  const cookieStore = cookies();
  (await cookieStore).set("exoRfTkn", "", { path: "/", expires: new Date(0) });
  (await cookieStore).set("exoTkn", "", { path: "/", expires: new Date(0) });
  (await cookieStore).set("JSESSIONID", "", {
    path: "/",
    expires: new Date(0),
  });
  (await cookieStore).set("isLoggedIn", "", {
    path: "/",
    expires: new Date(0),
  });
  // Add more cookies as needed

  return NextResponse.json({ success: true });
}
