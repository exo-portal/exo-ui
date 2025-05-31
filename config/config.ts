export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";
const GITHUB_OAUTH_URL = process.env.NEXT_PUBLIC_GITHUB_OAUTH_URL || "";
const GOOGLE_OAUTH_URL = process.env.NEXT_PUBLIC_GOOGLE_OAUTH_URL || "";
export const GITHUB_OAUTH_FULL_URL = BASE_URL + GITHUB_OAUTH_URL;
export const GOOGLE_OAUTH_FULL_URL = BASE_URL + GOOGLE_OAUTH_URL;
export const DEV_MODE = process.env.NEXT_PUBLIC_DEV_MODE || "development";
export const DEFAULT_OTP_LENGTH = 6;