import { supabase } from "..";
import type {
  CashWithdrawalsType,
  MovementsOfTheDayType,
  PurchasesType,
  SalesType,
} from "../../types/db";

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

  const purchases = (await supabase
    .from("purchases")
    .select("id,amount,created_at,typeOfPayment,description,profiles(username)")
    .eq("day", dayId)
    .order("created_at", { ascending: false })
    .then((res) => res.data)) as PurchasesType[];

  const cashWithdrawals = (await supabase
    .from("cashWithdrawals")
    .select("id,amount,created_at,description,profiles(username)")
    .eq("day", dayId)
    .order("created_at", { ascending: false })
    .then((res) => res.data)) as CashWithdrawalsType[];


  const cashAvailable = await supabase
    .from("cashAvailable")
    .select("amount")
    .eq("id", dayId)
    .single()
    .then((res) => res.data?.amount || 0);

  return { dayId, cashChange, sales, purchases, cashAvailable, cashWithdrawals };
};
