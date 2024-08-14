import { supabase } from "..";
import type { MovementsOfTheDayType, SalesType } from "../../types/db";

export const getMovementsOfTheDay = async (date: string) => {
  const { data } = await supabase
    .from("movementsOfTheDay")
    .select("id,cashChange")
    .eq("date", date)
    .single();

  const { id: dayId, cashChange } = !!data
    ? (data as MovementsOfTheDayType)
    : ((await supabase
        .from("movementsOfTheDay")
        .insert([{ date }])
        .select("id,cashChange")
        .single()
        .then((res) => res.data)) as MovementsOfTheDayType);

  const sales = (await supabase
    .from("sales")
    .select("id,amount,created_at,typeOfPayment,profiles(username)")
    .eq("day", dayId)
    .order("created_at", { ascending: false })
    .then((res) => res.data)) as SalesType[];

  return { dayId, cashChange, sales };
};
