import CartContext from '../../context/CartContext'
import NavBar from '../NavBar'
import CartListView from '../CartListView'
import EmptyCartView from '../EmptyCartView'
import CartSummary from '../CartSummary'
import Footer from '../Footer'
import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const isEmpty = cartList.length === 0

      return (
        <>
          <NavBar activeTab="Cart" />
          <div className="cart_item_container">
            {isEmpty ? (
              <EmptyCartView />
            ) : (
              <div className="cart-container">
                <div className="total-items">
                  <p className="item-image">Item</p>
                  <p className="item-image">Quantity</p>
                  <p className="item-image">Price</p>
                </div>
                <CartListView />
                <CartSummary />
              </div>
            )}
          </div>
          <Footer />
        </>
      )
    }}
  </CartContext.Consumer>
)
export default Cart
