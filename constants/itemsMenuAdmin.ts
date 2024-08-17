
const retiros =
  'https://fnrggtvnecuajkfgookn.supabase.co/storage/v1/object/public/images/CajaRegistradora.png?t=2023-06-13T00%3A23%3A15.272Z'
const dailySummary =
  'https://fnrggtvnecuajkfgookn.supabase.co/storage/v1/object/public/images/resumen.png?t=2023-06-13T00%3A23%3A27.583Z'
const monthlySummary =
  'https://fnrggtvnecuajkfgookn.supabase.co/storage/v1/object/public/images/resMensual.png'
const users = 'https://fnrggtvnecuajkfgookn.supabase.co/storage/v1/object/public/images/users.png'
const calendar =
  'https://fnrggtvnecuajkfgookn.supabase.co/storage/v1/object/public/images/calendario.png'


export const itemsMenuAdmin = [
  {
    name: 'Retiros de caja',
    image: retiros,
    page: 'cashWithdrawalsScreen',
  },
  {
    name: 'Resumen del día',
    image: dailySummary,
    page: 'dailySummaryScreen',
  },
  {
    name: 'Resumen mensual',
    image: monthlySummary,
    page: 'monthlySummaryScreen',
  },
  {
    name: 'Administración de usuarios',
    image: users,
    page: 'adminUserScreen',
  },
  {
    name: 'Movimientos por día',
    image: calendar,
    page: 'movementsPerDayScreen',
  }
]
