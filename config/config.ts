import {
  ADMIN_PATH,
  APPLICANT_PATH,
  CLIENT_PATH,
  HR_PATH,
  PROJECT_TEAM_PATH,
} from "./path";

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";
const GITHUB_OAUTH_URL = process.env.NEXT_PUBLIC_GITHUB_OAUTH_URL || "";
const GOOGLE_OAUTH_URL = process.env.NEXT_PUBLIC_GOOGLE_OAUTH_URL || "";
export const GITHUB_OAUTH_FULL_URL = BASE_URL + GITHUB_OAUTH_URL;
export const GOOGLE_OAUTH_FULL_URL = BASE_URL + GOOGLE_OAUTH_URL;
export const DEV_MODE = process.env.NEXT_PUBLIC_DEV_MODE || "development";
export const DEFAULT_OTP_LENGTH = 4;
export const DEFAULT_IDLE_TIMEOUT = 15; // minute

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
  EXTERNAL: {
    APPLICANT: ["ROLE_APPLICANT"],
    CLIENT: ["ROLE_CLIENT"],
  },
};

export const routeRoleGroups = [
  {
    name: "admin",
    pathPrefix: ADMIN_PATH.ADMIN_HOME.path,
    allowedRoles: AccessLevelGroup.INTERNAL.ADMIN,
    redirectDashboard: ADMIN_PATH.ADMIN_HOME.path,
  },
  {
    name: "hr",
    pathPrefix: HR_PATH.HR_HOME.path,
    allowedRoles: AccessLevelGroup.INTERNAL.HR,
    redirectDashboard: HR_PATH.HR_HOME.path,
  },
  {
    name: "project-team",
    pathPrefix: PROJECT_TEAM_PATH.PROJECT_TEAM_HOME.path,
    allowedRoles: AccessLevelGroup.INTERNAL.PROJECT_TEAM,
    redirectDashboard: PROJECT_TEAM_PATH.PROJECT_TEAM_HOME.path,
  },
  {
    name: "applicant",
    pathPrefix: APPLICANT_PATH.APPLICANT_HOME.path,
    allowedRoles: AccessLevelGroup.EXTERNAL.APPLICANT,
    redirectDashboard: APPLICANT_PATH.APPLICANT_HOME.path,
  },
  {
    name: "client",
    pathPrefix: CLIENT_PATH.CLIENT_HOME.path,
    allowedRoles: AccessLevelGroup.EXTERNAL.CLIENT,
    redirectDashboard: CLIENT_PATH.CLIENT_HOME.path,
  },
];
