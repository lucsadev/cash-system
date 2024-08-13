import { supabase } from "..";
import type { MovementsOfTheDayType } from "../../types/db";

export const getMovementsOfTheDay = async (date: string) => {
  const { data } = await supabase
    .from("movementsOfTheDay")
    .select("id,cashChange")
    .eq("date", date)
    .single();

  const {id ,cashChange} = !!data
    ? data as MovementsOfTheDayType
    : await supabase
        .from("movementsOfTheDay")
        .insert([{date}])
        .select("id,cashChange")
        .single().then((res) => res.data) as MovementsOfTheDayType;

 
};
