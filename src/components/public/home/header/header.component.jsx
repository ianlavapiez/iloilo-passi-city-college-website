import React from 'react'
import { Link } from 'react-router-dom'

import Logo from '../../../../assets/header-logo.png'

const Header = () => {
  return (
    <header className='header'>
      <div className='header__logo-box'>
        <img src={Logo} alt='Logo' className='header__logo' />
      </div>
      <div className='header__text-box'>
        <h1 className='heading-primary'>
          <span className='heading-primary--main'>Brainhub</span>
          <span className='heading-primary--sub'>clever minds trust us</span>
        </h1>

        <Link to='/registration' className='btn btn--white btn--animated'>
          Enroll Now!
        </Link>
      </div>
    </header>
  )
}

export default Header
