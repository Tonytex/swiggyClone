import {
  FaPinterestSquare,
  FaInstagram,
  FaTwitter,
  FaFacebookSquare,
} from 'react-icons/fa'
import './index.css'

const Footer = () => (
  <div className="footer-container">
    <div className="foot-heading">
      <img
        src="https://res.cloudinary.com/chandu626/image/upload/v1633142115/white-head_voo1xn.png"
        alt="website-footer-logo"
        className="footer-image"
      />
      <h1 className="foot-head">Tasty Kitchens</h1>
    </div>
    <p className="foot-description">
      The only thing we are serious about is food. Contact us on
    </p>
    <div className="icons">
      <FaPinterestSquare className="pin" testid="pintrest-social-icon" />
      <FaInstagram className="instagram" testid="instagram-social-icon" />
      <FaTwitter className="twitter" testid="twitter-social-icon" />
      <FaFacebookSquare className="facebook" testid="facebook-social-icon" />
    </div>
  </div>
)
export default Footer
