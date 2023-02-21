import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import {AiFillCloseCircle} from 'react-icons/ai'
import {FaRupeeSign} from 'react-icons/fa'
import CartContext from '../../context/CartContext'

import './index.css'

const CartItem = props => (
  <CartContext.Consumer>
    {value => {
      const {
        removeItem,
        decreaseCartItemQuantity,
        increaseCartItemQuantity,
      } = value
      const {cartItemDetails} = props
      const {id, name, cost, foodImageUrl, quantity} = cartItemDetails

      const onClickDecrement = () => {
        decreaseCartItemQuantity(id)
      }
      const onClickIncrement = () => {
        increaseCartItemQuantity(id)
      }
      const onRemoveCartItem = () => {
        removeItem(id)
      }
      const totalPrice = cost * quantity
      return (
        <li className="cart-item">
          <div className="mobile-view">
            <img
              className="cart-product-image-mobile"
              src={foodImageUrl}
              alt={name}
            />
            <div className="details-of-cart-item">
              <p className="cart-product-title">{name}</p>
              <div className="cart-quantity-container-mobile">
                <button
                  type="button"
                  className="quantity-controller-button"
                  testid="decrement-quantity"
                  onClick={onClickDecrement}
                >
                  <BsDashSquare className="icon-quantity" />
                </button>
                <p className="cart-quantity" testid="item-quantity">
                  {quantity}
                </p>
                <button
                  type="button"
                  className="quantity-controller-button"
                  testid="increment-quantity"
                  onClick={onClickIncrement}
                >
                  <BsPlusSquare className="icon-quantity" />
                </button>
              </div>
              <p className="cart-total-price-mobile">Rs {totalPrice}/-</p>
            </div>
          </div>

          <div className="cart-product-title-brand-container">
            <img className="cart-product-image" src={foodImageUrl} alt={name} />
            <p className="cart-product-title">{name}</p>
          </div>
          <div className="cart-quantity-container">
            <button
              type="button"
              className="quantity-controller-button"
              testid="decrement-quantity"
              onClick={onClickDecrement}
            >
              <BsDashSquare className="icon-quantity" />
            </button>
            <p className="cart-quantity" testid="item-quantity">
              {quantity}
            </p>
            <button
              type="button"
              className="quantity-controller-button"
              testid="increment-quantity"
              onClick={onClickIncrement}
            >
              <BsPlusSquare className="icon-quantity" />
            </button>
          </div>
          <div className="total-price-remove-container">
            <p className="cart-total-price">
              <FaRupeeSign /> {totalPrice}/-
            </p>
            <button
              className="remove-button"
              type="button"
              onClick={onRemoveCartItem}
            >
              Remove
            </button>
          </div>
          <button
            className="delete-button"
            type="button"
            onClick={onRemoveCartItem}
            testid="remove"
          >
            <AiFillCloseCircle color="#616E7C" size={20} />
          </button>
        </li>
      )
    }}
  </CartContext.Consumer>
)

export default CartItem
