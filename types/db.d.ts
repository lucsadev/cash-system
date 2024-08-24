import { Tables } from "./database.types";

let profile: Tables<"profiles">;
export type ProfileType = typeof profile;

let quickDescription: Tables<"quickDescription">;
export type QuickDescriptionType = typeof quickDescription;


export interface CashWithdrawalsType {
  amount: number | null;
  created_at: string | null;
  description: string | null;
  id: string;
  profiles: {
    username: string | null;
  };
};

export interface PurchasesType extends CashWithdrawalsType { 
  typeOfPayment: string | null;  
};

interface sales extends PurchasesType {}
export type SalesType = Omit<typeof sales,'description'>;


let movementsOfTheDay: Tables<"movementsOfTheDay">;
export type MovementsOfTheDayType = Omit<typeof movementsOfTheDay, "date">;
