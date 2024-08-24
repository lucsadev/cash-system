import { create } from "zustand";
import { devtools } from 'zustand/middleware'

import { createSelectors } from "./createSelectors";
import { PaymentMethods } from "../constants";
import type {
  CashWithdrawalsType,
  ProfileType,
  PurchasesType,
  QuickDescriptionType,
  SalesType,
} from "../types/db";

interface IDay {
  dayId: string;
  cashChange: number;
  cashAvailable: number;
  sales: SalesType[];
  purchases: PurchasesType[];
  cashWithdrawals: CashWithdrawalsType[];
  users :ProfileType[];
  quickDescriptions: QuickDescriptionType[];
}

interface State extends IDay {
  today: string;
  editUser: ProfileType | null;
  CurrentPaymentMethods: PaymentMethods;
}

interface Actions {
  setCurrentPaymentMethods: (CurrentPaymentMethods: PaymentMethods) => void;
  setMovementsOfTheDay: (dataDay: IDay) => void;
  setEditUser: (editUser: ProfileType | null) => void;
  setQuickDescription: (quickDescription: QuickDescriptionType) => void
  deleteQuickDescription: (id: string) => void
}

const INITIAL_STATE: State = {
  dayId: "",
  cashAvailable: 0,
  cashChange: 0,
  sales: [],
  purchases: [],
  cashWithdrawals: [],
  users :[],
  quickDescriptions: [],
  editUser: null,
  today: new Date()
    .toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    .replaceAll("/", "-"),
  CurrentPaymentMethods: PaymentMethods.CASH,
};

const cashSystemStoreBase = create<State & Actions>()(devtools((set, get) => ({
  ...INITIAL_STATE,

  setCurrentPaymentMethods: (CurrentPaymentMethods: PaymentMethods) =>
    set({ CurrentPaymentMethods }),

  setMovementsOfTheDay: (dataDay: IDay) => set({ ...dataDay }),

  setEditUser: (editUser: ProfileType | null) => set({ editUser }),

  setQuickDescription: (quickDescription: QuickDescriptionType) => set({ quickDescriptions: [...get().quickDescriptions, quickDescription] }),

  deleteQuickDescription: (id: string) => {
    set({ quickDescriptions: get().quickDescriptions.filter(quickDescription => quickDescription.id !== id) })
  },
  
})));

export const useCashSystemStore = createSelectors(cashSystemStoreBase);
