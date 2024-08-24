import { useEffect, useState } from "react";

import { getMovementsOfTheDay } from "../supabase/db";
import { OperationDetailModel } from "../mappers";
import { IOperationDetail } from "../types/data";

export function useSummaryPerDay(date: string) {
  const [loading, setLoading] = useState(true);
  const [sales, setSales] = useState<IOperationDetail[]>([]);
  const [purchases, setPurchases] = useState<IOperationDetail[]>([]);


  useEffect(() => {
    getMovementsOfTheDay(date)
      .then((data) => {
        setSales(OperationDetailModel(data.sales));
        setPurchases(OperationDetailModel(data.purchases));
      })
      .finally(() => setLoading(false));
  }, [date]);

  return {
    loading,
    sales,
    purchases,
  };
}
