import { useEffect, useState } from "react";
import { IOperationDetail } from "../types/data";
import { getMovementsOfTheMonth } from "../supabase/db";

export function useMovementsPerMonth(date: string) {
  const [loading, setLoading] = useState(true);
  const [salesOfTheMonth, setSalesOfTheMonth] = useState<IOperationDetail[]>([]);
  const [purchasesOfTheMonth, setPurchasesOfTheMonth] = useState<
    IOperationDetail[]
  >([]);

  useEffect(() => {
    setSalesOfTheMonth([]);
    setPurchasesOfTheMonth([]);
    getMovementsOfTheMonth(date)
      .then((data) =>
        data?.forEach((el) => {
          el.sales?.length &&
            setSalesOfTheMonth((prev: any) => [...prev, ...el.sales]);
          el.purchases?.length &&
            setPurchasesOfTheMonth((prev) => [...prev, ...el.purchases]);
        })
      )
      .finally(() => setLoading(false));
  }, [date]);
  return {
    salesOfTheMonth,
    purchasesOfTheMonth,
    loading,
  };
}
