import {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import Cart from './components/Cart'
import ProtectedRoute from './components/ProtectedRoute'
import RestaurantDetails from './components/RestaurantDetails'
import Payment from './components/Payment'
import NotFound from './components/NotFound'
import CartContext from './context/CartContext'
import './App.css'

const cartListFromLocalStorage = () => {
  const getCart = localStorage.getItem('cartData')
  const parseCart = JSON.parse(getCart)
  if (parseCart === null) {
    return []
  }
  return parseCart
}

class App extends Component {
  state = {cartList: cartListFromLocalStorage()}

  addItem = product => {
    const {cartList} = this.state
    console.log(cartList)
    const productObject = cartList.find(
      eachCartItem => eachCartItem.id === product.id,
    )
    console.log(product.id)
    console.log(productObject)
    if (productObject) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachCartItem => {
          if (productObject.id === eachCartItem.id) {
            const updatedQuantity = product.quantity

            return {...eachCartItem, quantity: updatedQuantity}
          }

          return eachCartItem
        }),
      }))
    } else {
      const updatedCartList = [...cartList, product]
      this.setState({cartList: updatedCartList})
    }
  }

  removeItem = id => {
    const {cartList} = this.state
    const updatedCartList = cartList.filter(
      eachCartItem => eachCartItem.id !== id,
    )
    this.setState({cartList: updatedCartList})
  }

  decreaseCartItemQuantity = id => {
    const {cartList} = this.state
    const productObject = cartList.find(eachCartItem => eachCartItem.id === id)
    if (productObject.quantity > 1) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachCartItem => {
          if (id === eachCartItem.id) {
            const updatedQuantity = eachCartItem.quantity - 1
            return {...eachCartItem, quantity: updatedQuantity}
          }
          return eachCartItem
        }),
      }))
    } else {
      this.removeItem(id)
    }
  }

  increaseCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachCartItem => {
        if (id === eachCartItem.id) {
          const updatedQuantity = eachCartItem.quantity + 1
          return {...eachCartItem, quantity: updatedQuantity}
        }
        return eachCartItem
      }),
    }))
  }

  render() {
    const {cartList} = this.state
    localStorage.setItem('cartData', JSON.stringify(cartList))
    return (
      <CartContext.Provider
        value={{
          cartList,
          addItem: this.addItem,
          removeItem: this.removeItem,
          decreaseCartItemQuantity: this.decreaseCartItemQuantity,
          increaseCartItemQuantity: this.increaseCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute
            exact
            path="/restaurant/:id"
            component={RestaurantDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <ProtectedRoute exact path="/payment" component={Payment} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
