import {Link} from 'react-router-dom'
import './index.css'

const EmptyCartView = () => (
  <div className="empty-cart">
    <img
      src="https://res.cloudinary.com/chandu626/image/upload/v1633146039/OBJECTS_vdqvex.png"
      alt="empty cart"
      className="empty-image"
    />
    <h1 className="no-items">No Orders Yet!</h1>
    <p className="empty-description">
      Your cart is empty.Add something to the menu.
    </p>
    <Link to="/">
      <button className="empty-button" type="button" testid="order-now">
        Order Now
      </button>
    </Link>
  </div>
)
export default EmptyCartView
