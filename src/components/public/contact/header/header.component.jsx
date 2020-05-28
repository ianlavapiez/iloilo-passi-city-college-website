import React from 'react'

import './header.styles.scss'

const Header = () => {
  return (
    <header className='contact-header'>
      <div className='contact-header__text-box'>
        <h1 className='heading-primary-contact'>
          <span className='heading-primary-contact--main'>Let's Connect</span>
          <span className='heading-primary-contact--sub'>
            We'd love to help you to start your profession goals!
          </span>
        </h1>
      </div>
    </header>
  )
}

export default Header
