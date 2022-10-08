import { atom } from 'recoil'

export const Carts = atom<any[]>({
  key: 'Cart',
  default: []
})

export const NumberOfCart = atom({
  key: 'NumberOfCart',
  default: 0
})

export const AmountPriceCart = atom({
  key: 'AmountPriceCartf',
  default: 0
})

export const UUID = atom({
  key: 'UUID',
  default: ''
})
