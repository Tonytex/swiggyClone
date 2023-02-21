import {Link} from 'react-router-dom'
import {ImStarFull} from 'react-icons/im'
import './index.css'

const RestaurantItem = props => {
  const {restaurantDetails} = props
  const {id, imageUrl, name, cuisine, userRating} = restaurantDetails
  return (
    <Link to={`/restaurant/${id}`} className="link-item">
      <li className="restaurant-item" testid="restaurant-item" key={id}>
        <img src={imageUrl} alt="restaurant" className="thumbnail" />
        <div className="details">
          <h1 className="head">{name}</h1>
          <p className="type-of-food">{cuisine}</p>
          <div className="rating-container-restaurant">
            <ImStarFull className="star" />
            <p className="rating">{userRating.rating}</p>
          </div>
        </div>
      </li>
    </Link>
  )
}
export default RestaurantItem
