import { TxKeyPath } from "@/i18n";

export type InstructionConfig = {
  title: TxKeyPath;
  subTitle: TxKeyPath;
  topBadgeTitleKey: TxKeyPath;
  bottomBadgeTitleKey?: TxKeyPath;
  topBadgeData?: {
    count: number;
    keyPrefix: string;
  };
  bottomBadgeData?: {
    count: number;
    keyPrefix: string;
  };
};

export type ExoPortalErrorMessage = {
  errorMessageList: {
    errorMessage: string;
    fieldName: string;
  }[];
  errorType: string;
  status: number;
};
