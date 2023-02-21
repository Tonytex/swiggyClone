import {Link} from 'react-router-dom'
import NavBar from '../NavBar'
import './index.css'

const NotFound = () => (
  <>
    <NavBar activeTab="CART" />
    <div className="not-found">
      <img
        src="https://res.cloudinary.com/chandu626/image/upload/v1633146338/erroring_1_ldmjjl.png"
        className="no-image"
        alt="not found"
      />
      <h1 className="no-head">Page Not Found</h1>
      <p className="no-description">
        we are sorry, the page you requested could not be found
      </p>
      <Link to="/">
        <button className="no-button" type="button" testid="home-page">
          Home Page
        </button>
      </Link>
    </div>
  </>
)
export default NotFound
