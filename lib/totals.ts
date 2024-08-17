import { PurchasesType, SalesType } from "../types/db"

export type SummaryType = PurchasesType[] | SalesType[]
type DataResult = Record<string,{ amount: number; quantity: number }>

export const totals = (array: SummaryType) =>
  array.reduce((totals: DataResult, item) => {
    !totals[item.typeOfPayment] && (totals[item.typeOfPayment] = { amount: 0, quantity: 0 })

    totals[item.typeOfPayment] = {
      amount: totals[item.typeOfPayment].amount + (item.amount || 0),
      quantity: totals[item.typeOfPayment].quantity + 1
    }
    return totals
  }, {})

export const total = (array : SummaryType) => array.reduce((sum, item) => sum + (item.amount || 0), 0)
