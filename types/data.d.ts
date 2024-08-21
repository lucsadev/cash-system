 
  export interface PurchaseSaleType {
  sales:     OperationDetail[];
  purchases: OperationDetail[];
}

export interface OperationDetail {
  amount:        number;
  profiles:      Profiles;
  typeOfPayment: string;
}

export interface Profiles {
  username?: string;
}

