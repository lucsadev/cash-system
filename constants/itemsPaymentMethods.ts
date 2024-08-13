export const BG_COLOR = '#004d70'

export enum PaymentMethods {
  CASH = 'Efectivo',
  OTHERS = 'Otros',
  CUENTA_DNI = 'Cuenta DNI',
  DEBIT = 'Débito',
  CREDIT = 'Tarjeta de Crédito',
  MERCADO_PAGO = 'Mercado Pago',
  TRANSFER = 'Transferencia',
  MODO = 'MODO',
  CHANGE_IN_BOX = 'Ingresar cambio en caja',
}

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
    name: PaymentMethods.CASH,
    icon: cash,
  },
  {
    name: PaymentMethods.CUENTA_DNI,
    icon: dni,
  },
  {
    name: PaymentMethods.DEBIT,
    icon: debit,
  },
  {
    name: PaymentMethods.CREDIT,
    icon: credit,
  },
  {
    name: PaymentMethods.MERCADO_PAGO,
    icon: mp,
  },
  {
    name: PaymentMethods.TRANSFER,
    icon: transfer,
  },
  {
    name: PaymentMethods.MODO,
    icon: modo,
  },
]
