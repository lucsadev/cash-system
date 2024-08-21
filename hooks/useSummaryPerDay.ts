import { useEffect, useState } from "react";

import { getMovementsOfTheDay } from "../supabase/db";
import { OperationDetailModel } from "../mappers";
import { OperationDetail } from "../types/data";

export function useSummaryPerDay(date: string) {
  const [loading, setLoading] = useState(true);
  const [sales, setSales] = useState<OperationDetail[]>([]);
  const [purchases, setPurchases] = useState<OperationDetail[]>([]);


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
