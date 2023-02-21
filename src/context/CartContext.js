import React from 'react'

const CartContext = React.createContext({
  cartList: [],
  addItem: () => {},
  removeItem: () => {},
  decreaseCartItemQuantity: () => {},
  increaseCartItemQuantity: () => {},
})

export default CartContext
