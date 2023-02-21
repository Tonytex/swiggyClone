import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import NavBar from '../NavBar'
import ReactSlick from '../ReactSlick'
import PopularRestaurants from '../PopularRestaurants'
import Footer from '../Footer'
import './index.css'

const Home = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }
  return (
    <div className="home-container">
      <div className="header-container">
        <NavBar activeTab="Home" />
        <ReactSlick />
      </div>
      <div className="popular-restaurants" testid="popularRestaurants">
        <PopularRestaurants />
      </div>
      <Footer />
    </div>
  )
}

export default Home
