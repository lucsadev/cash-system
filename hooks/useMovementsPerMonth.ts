import { useEffect, useState } from "react";
import { OperationDetail } from "../types/data";
import { getMovementsOfTheMonth } from "../supabase/db";

export function useMovementsPerMonth(date: string) {
  const [loading, setLoading] = useState(true);
  const [salesOfTheMonth, setSalesOfTheMonth] = useState<OperationDetail[]>([]);
  const [purchasesOfTheMonth, setPurchasesOfTheMonth] = useState<
    OperationDetail[]
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
