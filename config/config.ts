export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";
const GITHUB_OAUTH_URL = process.env.NEXT_PUBLIC_GITHUB_OAUTH_URL || "";
const GOOGLE_OAUTH_URL = process.env.NEXT_PUBLIC_GOOGLE_OAUTH_URL || "";
export const GITHUB_OAUTH_FULL_URL = BASE_URL + GITHUB_OAUTH_URL;
export const GOOGLE_OAUTH_FULL_URL = BASE_URL + GOOGLE_OAUTH_URL;
export const DEV_MODE = process.env.NEXT_PUBLIC_DEV_MODE || "development";
export const DEFAULT_OTP_LENGTH = 4;

export const AccessLevelGroup = {
  INTERNAL: {
    ADMIN: ["ROLE_ADMIN", "ROLE_SUPER_ADMIN"],
    HR: ["ROLE_FINANCE", "ROLE_HR"],
    PROJECT_TEAM: [
      "ROLE_MANAGER",
      "ROLE_PROJECT_LEAD",
      "ROLE_TEAM_LEAD",
      "ROLE_TECH_LEAD",
      "ROLE_SENIOR_EMPLOYEE",
      "ROLE_MID_LEVEL_EMPLOYEE",
      "ROLE_JUNIOR_EMPLOYEE",
      "ROLE_ENTRY_LEVEL_EMPLOYEE",
      "ROLE_INTERN",
    ],
  },
  EXTRENAL: {
    APPLICANT: ["ROLE_APPLICANT"],
    CLIENT: ["ROLE_CLIENT"],
  },
};