import { create } from "zustand";

import { createSelectors } from "./createSelectors";
import { PaymentMethods } from "../constants";
import type { SalesType } from "../types/db";

interface IDay {
  dayId: string | null;
  cashAvailable: 0;
  cashChange: 0;
  sales: SalesType[];
}

interface State extends IDay {
  today: string;
  CurrentPaymentMethods: PaymentMethods;
}

interface Actions {
  setCurrentPaymentMethods: (CurrentPaymentMethods: PaymentMethods) => void;
  loadMovementsOfTheDay: () => void;
  setDay: (dataDay: IDay) => void;
}

const INITIAL_STATE: State = {
  dayId: null,
  cashAvailable: 0,
  cashChange: 0,
  sales: [],
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

  loadMovementsOfTheDay: () => {},

  setDay: (dataDay: IDay) => set({ ...dataDay }),
}));

export const useCashSystemStore = createSelectors(cashSystemStoreBase);
