import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiFillStar} from 'react-icons/ai'
import {FaRupeeSign} from 'react-icons/fa'
import NavBar from '../NavBar'
import FoodItem from '../FoodItem'
import Footer from '../Footer'
import './index.css'

const appConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class RestaurantDetails extends Component {
  state = {status: appConstants.initial, restaurantItemDetails: []}

  componentDidMount() {
    this.getDetailsSection()
  }

  getDetailsSection = async () => {
    this.setState({status: appConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/restaurants-list/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const formattedData = {
        rating: data.rating,
        id: data.id,
        name: data.name,
        costForTwo: data.cost_for_two,
        cuisine: data.cuisine,
        imageUrl: data.image_url,
        reviewsCount: data.reviews_count,
        opensAt: data.opens_at,
        location: data.location,
        itemsCount: data.itemsCount,
        foodItems: data.food_items.map(eachFood => ({
          name: eachFood.name,
          cost: eachFood.cost,
          foodType: eachFood.food_type,
          foodImageUrl: eachFood.image_url,
          id: eachFood.id,
          rating: eachFood.rating,
        })),
      }
      this.setState({
        status: appConstants.success,
        restaurantItemDetails: formattedData,
      })
    } else {
      this.setState({status: appConstants.failure})
    }
  }

  renderSuccessDetails = () => {
    const {restaurantItemDetails} = this.state
    const {
      name,
      imageUrl,
      cuisine,
      location,
      rating,
      reviewsCount,
      costForTwo,
      foodItems,
    } = restaurantItemDetails
    return (
      <div className="details-container">
        <div className="restaurant-banner">
          <img src={imageUrl} alt="restaurant" className="image-item" />
          <div className="banner-details">
            <h1 className="name">{name}</h1>
            <p className="cuisine">{cuisine}</p>
            <p className="cuisine">{location}</p>
            <div className="rating-and-price-container">
              <div className="rating-container">
                <div className="rating-item-container">
                  <AiFillStar className="item-star" />
                  <p className="rating">{rating}</p>
                </div>
                <p className="total">{reviewsCount}+ ratings</p>
              </div>
              <hr className="line" />
              <div className="price-container">
                <p className="price-item">
                  <FaRupeeSign /> {costForTwo}
                </p>
                <p className="price">Cost for two</p>
              </div>
            </div>
          </div>
        </div>
        <ul className="food-items-container">
          {foodItems.map(eachItem => (
            <FoodItem
              key={eachItem.id}
              foodDetails={eachItem}
              testid="foodItem"
            />
          ))}
        </ul>
      </div>
    )
  }

  renderFailureDetails = () => <h1>something went wrong</h1>

  progressView = () => (
    <div className="loader" testid="restaurant-details-loader">
      <Loader type="TailSpin" color="#F7931E" height="50" width="50" />
    </div>
  )

  renderDetails = () => {
    const {status} = this.state
    switch (status) {
      case appConstants.success:
        return this.renderSuccessDetails()
      case appConstants.failure:
        return this.renderFailureDetails()
      case appConstants.inProgress:
        return this.progressView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <NavBar />
        {this.renderDetails()}
        <Footer />
      </>
    )
  }
}
export default RestaurantDetails
