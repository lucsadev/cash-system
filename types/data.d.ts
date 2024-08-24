export interface PurchaseSaleType {
  sales: IOperationDetail[];
  purchases: IOperationDetail[];
}

export interface IOperationDetail {
  amount: number;
  profiles: IProfiles;
  typeOfPayment: string;
}

export interface IProfiles {
  username?: string;
}

export type ImagePickerAssetType = {
  uri: string;
  assetId?: string | null;
  width: number;
  height: number;
  type?: "image" | "video";
  fileName?: string | null;
  fileSize?: number;
  exif?: Record<string, any> | null;
  base64?: string | null;
  duration?: number | null;
  mimeType?: string;
}