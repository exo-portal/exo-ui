import { redirect } from "next/navigation";
import { BASE_URL, PATH } from "@/config";
import { getCurrentLocale } from "@/lib";

export default async function LogoutPage() {
  // Call the API route to logout
  await fetch(`${BASE_URL}/api/logout`, { method: "POST", cache: "no-store" });
  redirect(PATH.LOGIN.getPath(getCurrentLocale()));
}
