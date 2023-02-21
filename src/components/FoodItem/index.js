import {Component} from 'react'
import {ImStarFull} from 'react-icons/im'
import CartContext from '../../context/CartContext'
import './index.css'

class FoodItem extends Component {
  state = {quantity: 0}

  render() {
    return (
      <CartContext.Consumer>
        {value => {
          const {
            addItem,
            decreaseCartItemQuantity,
            increaseCartItemQuantity,
          } = value
          const {foodDetails} = this.props
          const {id, cost, foodImageUrl, name, rating} = foodDetails
          const {quantity} = this.state

          const addItemToCart = () => {
            this.setState(
              prevState => ({
                quantity: prevState.quantity + 1,
              }),
              addItem({...foodDetails, quantity: 1}),
            )
          }

          const onDecrement = () => {
            this.setState(prevState => ({quantity: prevState.quantity - 1}))
            decreaseCartItemQuantity(id)
          }

          const onIncrement = () => {
            this.setState(prevState => ({
              quantity: prevState.quantity + 1,
            }))
            increaseCartItemQuantity(id)
          }

          return (
            <li className="food-container" testid="food-item">
              <img src={foodImageUrl} alt="food" className="food-image" />
              <div className="food-details">
                <h1 className="food-name">{name}</h1>
                <p className="cost">{cost}.00</p>
                <div className="rating-item-container">
                  <ImStarFull className="star-image" />
                  <p className="rating">{rating}</p>
                </div>
                {quantity !== 0 ? (
                  <div className="quantity-buttons">
                    <button
                      type="button"
                      onClick={onDecrement}
                      className="button"
                      testid="decrement-count"
                    >
                      -
                    </button>
                    <div testid="active-count">{quantity}</div>
                    <button
                      type="button"
                      onClick={onIncrement}
                      className="button"
                      testid="increment-count"
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    className="add-button"
                    onClick={addItemToCart}
                    type="button"
                    testid="add-button"
                  >
                    Add
                  </button>
                )}
              </div>
            </li>
          )
        }}
      </CartContext.Consumer>
    )
  }
}
export default FoodItem
