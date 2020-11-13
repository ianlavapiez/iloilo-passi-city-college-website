import React from 'react'
import { Link } from 'react-router-dom'

import Logo from '../../../../assets/passi-logo.jpg'

const Header = () => {
  return (
    <header className='header'>
      <div className='header__logo-box'>
        <img src={Logo} alt='Logo' className='header__logo' />
      </div>
      <div className='header__text-box'>
        <h1 className='heading-primary'>
          <span className='heading-primary--main'>Passi City College</span>
          <span className='heading-primary--sub'>The center of hope!</span>
        </h1>

        <Link to='/courses' className='btn btn--white btn--animated'>
          View Courses Offered
        </Link>
      </div>
    </header>
  )
}

export default Header
