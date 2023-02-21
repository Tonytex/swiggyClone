import {Component} from 'react'
import Slider from 'react-slick'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import './index.css'

const appConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class ReactSlick extends Component {
  state = {carousalImages: [], status: appConstants.initial}

  componentDidMount() {
    this.getCarousal()
  }

  getCarousal = async () => {
    this.setState({status: appConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const apiUrl = 'https://apis.ccbp.in/restaurants-list/offers'
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const formattedData = data.offers.map(eachItem => ({
        imageUrl: eachItem.image_url,
        id: eachItem.id,
      }))
      this.setState({
        status: appConstants.success,
        carousalImages: formattedData,
      })
    } else {
      this.setState({status: appConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {carousalImages} = this.state

    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      pauseOnHover: true,
    }

    return (
      <ul className="carousal-container">
        <Slider {...settings}>
          {carousalImages.map(eachItem => (
            <li className="carousal-list-item" key={eachItem.id}>
              <img
                src={eachItem.imageUrl}
                alt="offer"
                className="carousal-image-item"
              />
            </li>
          ))}
        </Slider>
      </ul>
    )
  }

  renderProgressView = () => (
    <div className="loader" testid="restaurants-offers-loader">
      <Loader type="TailSpin" color="#F7931E" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-container">
      <h1 className="warning">Oops! something went Wrong</h1>
    </div>
  )

  renderCarousal = () => {
    const {status} = this.state
    switch (status) {
      case appConstants.inProgress:
        return this.renderProgressView()
      case appConstants.success:
        return this.renderSuccessView()
      case appConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return this.renderCarousal()
  }
}
export default ReactSlick
