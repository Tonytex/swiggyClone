import {Link} from 'react-router-dom'
import CartContext from '../../context/CartContext'

import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      let total = 0
      cartList.forEach(eachCartItem => {
        total += eachCartItem.cost * eachCartItem.quantity
      })

      return (
        <>
          <hr />
          <div className="cart-summary-container">
            <div className="heading-price">
              <h1 className="order-total-value">Order Total:</h1>
              <h1 className="total-price" testid="total-price">
                {total}
              </h1>
            </div>
            <Link to="/payment">
              <div testid="place-order-button" className="bt-cont">
                <button type="button" className="checkout-button">
                  place Order
                </button>
              </div>
            </Link>
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
