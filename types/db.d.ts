import { Tables } from "./database.types";

let profile: Tables<'profiles'>;
export type ProfileType = Omit<typeof profile, 'id'>;

let sales: Tables<'sales'>;
export type SalesType = Omit<typeof sales, 'day' | 'isCombo'>;

let movementsOfTheDay: Tables<'movementsOfTheDay'>;
export type MovementsOfTheDayType = Omit<typeof movementsOfTheDay, 'date'>;