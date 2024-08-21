import { create } from "zustand";

import { createSelectors } from "./createSelectors";
import { PaymentMethods } from "../constants";
import type {
  CashWithdrawalsType,
  PurchasesType,
  SalesType,
} from "../types/db";

interface IDay {
  dayId: string;
  cashChange: number;
  cashAvailable: number;
  sales: SalesType[];
  purchases: PurchasesType[];
  cashWithdrawals: CashWithdrawalsType[];
  users :string[]
}

interface State extends IDay {
  today: string;
  CurrentPaymentMethods: PaymentMethods;
}

interface Actions {
  setCurrentPaymentMethods: (CurrentPaymentMethods: PaymentMethods) => void;
  setMovementsOfTheDay: (dataDay: IDay) => void;
}

const INITIAL_STATE: State = {
  dayId: "",
  cashAvailable: 0,
  cashChange: 0,
  sales: [],
  purchases: [],
  cashWithdrawals: [],
  users :[],
  today: new Date()
    .toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    .replaceAll("/", "-"),
  CurrentPaymentMethods: PaymentMethods.CASH,
};

const cashSystemStoreBase = create<State & Actions>()((set, get) => ({
  ...INITIAL_STATE,

  setCurrentPaymentMethods: (CurrentPaymentMethods: PaymentMethods) =>
    set({ CurrentPaymentMethods }),

  setMovementsOfTheDay: (dataDay: IDay) => set({ ...dataDay }),
}));

export const useCashSystemStore = createSelectors(cashSystemStoreBase);
