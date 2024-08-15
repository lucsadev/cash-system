import { Tables } from "./database.types";

let profile: Tables<"profiles">;
export type ProfileType = typeof profile;

export type SalesType = {
  amount: number | null;
  created_at: string | null;
  id: string;
  typeOfPayment: string | null;
  profiles: {
    username: string | null;
  };
};

let movementsOfTheDay: Tables<"movementsOfTheDay">;
export type MovementsOfTheDayType = Omit<typeof movementsOfTheDay, "date">;
