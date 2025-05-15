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
};
export const protectedPath: PathInterface = Object.fromEntries(
  Object.entries(PATH).filter(([_, value]) => value.isProtected)
);

export const protectedPathValues: string[] = Object.values(PATH)
  .filter((item) => item.isProtected)
  .map((item) => item.path);
