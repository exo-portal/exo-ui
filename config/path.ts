export interface PathInterface {
  [key: string]: {
    name: string;
    path: string;
    getPath: (locale: string) => string;
    value: string;
    isProtected: boolean;
  };
}

export const PATH: PathInterface = {
  LOGIN: {
    name: "login",
    path: "/login",
    value: "login",
    getPath: (locale: string) => `/${locale}/login`,
    isProtected: false,
  },
  HOME: {
    name: "home",
    path: "/home",
    value: "home",
    getPath: (locale: string) => `/${locale}/home`,
    isProtected: true,
  },
  REGISTER: {
    name: "register",
    path: "/register",
    value: "register",
    getPath: (locale: string) => `/${locale}/register`,
    isProtected: false,
  },
  REGISTER_PERSONAL_DETAILS: {
    name: "register-personal-details",
    path: "/register/personal-details",
    value: "register/personal-details",
    getPath: (locale: string) => `/${locale}/register/personal-details`,
    isProtected: false,
  },
  REGISTER_CONTACT_DETAILS: {
    name: "register-contact-details",
    path: "/register/contact-details",
    value: "register/contact-details",
    getPath: (locale: string) => `/${locale}/register/contact-details`,
    isProtected: false,
  },
};
export const protectedPath: PathInterface = Object.fromEntries(
  Object.entries(PATH).filter(([_, value]) => value.isProtected)
);

export const protectedPathValues: string[] = Object.values(PATH)
  .filter((item) => item.isProtected)
  .map((item) => item.path);
