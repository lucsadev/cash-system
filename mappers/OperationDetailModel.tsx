import { IOperationDetail, PurchaseSaleType } from "../types/data";
import type { PurchasesType, SalesType } from "../types/db";

type Props = SalesType[] | PurchasesType[];

export const OperationDetailModel = (data: Props): IOperationDetail[] =>
  data.map((el) => ({
    amount: el.amount,
    profiles: el.profiles,
    typeOfPayment: el.typeOfPayment,
  }));
