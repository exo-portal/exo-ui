import { create } from "zustand";

export type GENDER_TYPE = "male" | "female" | "other";

export interface RegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  dateOfBirth?: any;
  gender: GENDER_TYPE;
  phoneNumber: string;
  address: string;
}

interface RegistrationState {
  data: RegistrationData;
  setData: (data: Partial<RegistrationData>) => void;
  reset: () => void;
}

export const DEFAULT_REGISTRATION_DATA: RegistrationData = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  phoneNumber: "",
  address: "",
  gender: "male",
};

const LOCAL_STORAGE_REGISTRATION_STEP_KEY = "registrationStep";
const LOCAL_STORAGE_REGISTRATION_DATA_KEY = "registrationData";

export const useRegistrationStore = create<RegistrationState>((set) => ({
  data: (() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(LOCAL_STORAGE_REGISTRATION_DATA_KEY);
      return stored
        ? { ...DEFAULT_REGISTRATION_DATA, ...JSON.parse(stored) }
        : DEFAULT_REGISTRATION_DATA;
    }
    return DEFAULT_REGISTRATION_DATA;
  })(),
  setData: (data) => {
    set((state) => {
      const newData = { ...state.data, ...data };
      localStorage.setItem(
        LOCAL_STORAGE_REGISTRATION_DATA_KEY,
        JSON.stringify(newData)
      );
      return { data: newData };
    });
  },

  reset: () => {
    localStorage.removeItem(LOCAL_STORAGE_REGISTRATION_STEP_KEY);
    localStorage.removeItem(LOCAL_STORAGE_REGISTRATION_DATA_KEY);
    set({
      data: DEFAULT_REGISTRATION_DATA,
    });
  },
}));
