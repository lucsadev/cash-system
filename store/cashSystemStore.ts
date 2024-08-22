import { create } from "zustand";

import { createSelectors } from "./createSelectors";
import { PaymentMethods } from "../constants";
import type {
  CashWithdrawalsType,
  ProfileType,
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
  users :ProfileType[]
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
}

const INITIAL_STATE: State = {
  dayId: "",
  cashAvailable: 0,
  cashChange: 0,
  sales: [],
  purchases: [],
  cashWithdrawals: [],
  users :[],
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

const cashSystemStoreBase = create<State & Actions>()((set, get) => ({
  ...INITIAL_STATE,

  setCurrentPaymentMethods: (CurrentPaymentMethods: PaymentMethods) =>
    set({ CurrentPaymentMethods }),

  setMovementsOfTheDay: (dataDay: IDay) => set({ ...dataDay }),

  setEditUser: (editUser: ProfileType | null) => set({ editUser }),
}));

export const useCashSystemStore = createSelectors(cashSystemStoreBase);
