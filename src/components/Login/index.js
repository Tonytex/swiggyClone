import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import {AiFillEye, AiFillEyeInvisible} from 'react-icons/ai'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    error: false,
    errorMessage: '',
    showPassword: false,
  }

  changePassword = event => {
    this.setState({password: event.target.value})
  }

  changeUsername = event => {
    this.setState({username: event.target.value})
  }

  successSubmit = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  failureSubmit = message => {
    this.setState({error: true, errorMessage: message})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    console.log(userDetails)
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const apiUrl = 'https://apis.ccbp.in/login'
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      this.successSubmit(data.jwt_token)
    } else {
      this.failureSubmit(data.error_msg)
    }
  }

  onClickShow = () => {
    this.setState({
      showPassword: true,
    })
  }

  onClickHide = () => {
    this.setState({
      showPassword: false,
    })
  }

  renderPassword = () => {
    const {password, showPassword} = this.state
    return (
      <>
        <label htmlFor="password" className="input-label">
          PASSWORD
        </label>
        <div className="password-container">
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            value={password}
            className="input-user-password"
            onChange={this.changePassword}
            placeholder="ENTER PASSWORD"
          />
          {showPassword ? (
            <button
              type="button"
              className="eye-button"
              onClick={this.onClickHide}
            >
              <AiFillEyeInvisible className="eye" />
            </button>
          ) : (
            <button
              type="button"
              className="eye-button"
              onClick={this.onClickShow}
            >
              <AiFillEye className="eye" />
            </button>
          )}
        </div>
      </>
    )
  }

  renderUsername = () => {
    const {username} = this.state
    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={this.changeUsername}
          className="input-user"
          placeholder="ENTER USERNAME"
        />
      </>
    )
  }

  render() {
    const {error, errorMessage} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="log-in-container">
        <div className="form-mid-container">
          <form className="form-container" onSubmit={this.submitForm}>
            <div className="mobile-background">
              <img
                src="https://res.cloudinary.com/chandu626/image/upload/v1633074092/Rectangle_1456_p3k1rn.png"
                alt="website login"
                className="back-image"
              />
            </div>
            <div className="logo-container">
              <img
                src="https://res.cloudinary.com/chandu626/image/upload/v1633073146/website-logo_oa49xd.png"
                alt="website logo"
                className="logo-image"
              />
              <h1 className="log-in-heading">Tasty Kitchens</h1>
            </div>
            <h1 className="log-in">Login</h1>
            <div className="input-container">{this.renderUsername()}</div>
            <div className="input-container">{this.renderPassword()}</div>
            {error && <p className="error-message">{errorMessage}</p>}

            <button
              className="log-in-button"
              type="submit"
              testid="submitButton"
            >
              Login
            </button>
          </form>
        </div>
        <div className="background-container">
          <img
            src="https://res.cloudinary.com/chandu626/image/upload/v1633074092/Rectangle_1456_p3k1rn.png"
            alt="website login"
            className="back-image"
          />
        </div>
      </div>
    )
  }
}
export default Login
