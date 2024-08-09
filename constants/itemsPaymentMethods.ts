export const CASH = 'Efectivo'
export const OTHERS = 'Otros'
export const CUENTA_DNI = 'Cuenta DNI'
export const DEBIT = 'Débito'
export const CREDIT = 'Crédito'
export const MERCADO_PAGO = 'Mercado Pago'
export const TRANSFER = 'Transferencia'
export const MODO = 'MODO'
export const BG_COLOR = '#004d70'

const cash =
  'https://fnrggtvnecuajkfgookn.supabase.co/storage/v1/object/public/images/money.android.png'
const dni =
  'https://fnrggtvnecuajkfgookn.supabase.co/storage/v1/object/public/images/DNI.android.jpg'
const debit =
  'https://fnrggtvnecuajkfgookn.supabase.co/storage/v1/object/public/images/debit.android.png'
const credit =
  'https://fnrggtvnecuajkfgookn.supabase.co/storage/v1/object/public/images/credit.android.png'
const mp =
  'https://fnrggtvnecuajkfgookn.supabase.co/storage/v1/object/public/images/mp.android.png'
const transfer =
  'https://fnrggtvnecuajkfgookn.supabase.co/storage/v1/object/public/images/transfer.png'
const modo = 'https://fnrggtvnecuajkfgookn.supabase.co/storage/v1/object/public/images/modo.png'

export const itemsPaymentMethods = [
  {
    name: CASH,
    icon: cash,
  },
  {
    name: CUENTA_DNI,
    icon: dni,
  },
  {
    name: DEBIT,
    icon: debit,
  },
  {
    name: CREDIT,
    icon: credit,
  },
  {
    name: MERCADO_PAGO,
    icon: mp,
  },
  {
    name: TRANSFER,
    icon: transfer,
  },
  {
    name: MODO,
    icon: modo,
  },
]
