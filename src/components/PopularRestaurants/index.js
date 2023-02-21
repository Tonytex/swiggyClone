import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {GrFormNext, GrFormPrevious} from 'react-icons/gr'
import RestaurantsHeader from '../RestaurantsHeader'
import RestaurantItem from '../RestaurantItem'
import './index.css'

const appConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

class PopularRestaurants extends Component {
  state = {
    restaurantsList: [],
    status: appConstants.initial,
    activeCategory: sortByOptions[1].value,
    activePage: 1,
  }

  componentDidMount() {
    this.getRestaurants()
  }

  getRestaurants = async () => {
    this.setState({status: appConstants.inProgress})
    const {activeCategory, activePage} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const limit = 9
    const offset = (activePage - 1) * limit
    const apiUrl = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${limit}&sort_by_rating=${activeCategory}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const data = await response.json()
      const formattedData = data.restaurants.map(eachRestaurant => ({
        hasOnlineDelivery: eachRestaurant.has_online_delivery,
        id: eachRestaurant.id,
        costForTwo: eachRestaurant.cost_for_two,
        cuisine: eachRestaurant.cuisine,
        groupByTime: eachRestaurant.group_by_time,
        hasTableBooking: eachRestaurant.has_table_booking,
        imageUrl: eachRestaurant.image_url,
        isDeliveringNow: eachRestaurant.is_delivering_now,
        location: eachRestaurant.location,
        menuType: eachRestaurant.menu_type,
        name: eachRestaurant.name,
        opensAt: eachRestaurant.opens_at,
        userRating: {
          rating: eachRestaurant.user_rating.rating,
          ratingColor: eachRestaurant.user_rating.rating_color,
          ratingText: eachRestaurant.user_rating.rating_text,
          totalReviews: eachRestaurant.user_rating.total_reviews,
        },
      }))
      this.setState({
        restaurantsList: formattedData,
        status: appConstants.success,
      })
    } else {
      this.setState({status: appConstants.failure})
    }
  }

  failureRestaurants = () => (
    <div className="failure-container">
      <h1 className="warning">Oops! something went Wrong</h1>
    </div>
  )

  progressView = () => (
    <div className="loader" testid="restaurants-list-loader">
      <Loader type="TailSpin" color="#F7931E" height="50" width="50" />
    </div>
  )

  previousPage = () => {
    const {activePage} = this.state
    if (activePage > 1) {
      this.setState(
        prevState => ({activePage: prevState.activePage - 1}),
        this.getRestaurants,
      )
    }
  }

  nextPage = () => {
    this.setState(
      prevState => ({activePage: prevState.activePage + 1}),
      this.getRestaurants,
    )
  }

  changeCategory = activeCategory => {
    this.setState({activeCategory}, this.getRestaurants)
  }

  successRestaurants = () => {
    const {activePage, restaurantsList, activeCategory} = this.state
    return (
      <div className="restaurants-container">
        <RestaurantsHeader
          activeCategory={activeCategory}
          sortByOptions={sortByOptions}
          changeCategory={this.changeCategory}
        />
        <hr className="horizontal-line" />
        <ul className="list-restaurants" testid="restaurant-item">
          {restaurantsList.map(eachRestaurant => (
            <RestaurantItem
              key={eachRestaurant.id}
              restaurantDetails={eachRestaurant}
            />
          ))}
        </ul>
        <div className="pagination-container">
          <button
            type="button"
            onClick={this.previousPage}
            className="button"
            testid="pagination-left-button"
          >
            <GrFormPrevious className="next-button" />
          </button>
          <h1 className="active-page" testid="active-page-number">
            {activePage} of 20
          </h1>
          <button
            className="button"
            type="button"
            onClick={this.nextPage}
            testid="pagination-right-button"
          >
            <GrFormNext className="next-button" />
          </button>
        </div>
      </div>
    )
  }

  renderRestaurants = () => {
    const {status} = this.state
    switch (status) {
      case appConstants.success:
        return this.successRestaurants()
      case appConstants.failure:
        return this.failureRestaurants()
      case appConstants.inProgress:
        return this.progressView()
      default:
        return null
    }
  }

  render() {
    return this.renderRestaurants()
  }
}
export default PopularRestaurants
