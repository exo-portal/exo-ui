import { TxKeyPath } from "@/i18n";

export interface ApiResponse<T = any> {
  data: ApiResultModel<T>;
  status: number;
  statusText: string;
}

export interface ApiResultModel<T = any> {
  isSuccess: boolean;
  resultData?: T;
  errorMessage?: string;
}

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
