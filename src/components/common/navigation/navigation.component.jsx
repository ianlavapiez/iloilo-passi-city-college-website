import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Navigation = () => {
  const [visible, setVisible] = useState('hidden')

  const minimizeNav = () => {
    document.getElementById('navi-toggle').click()
    setVisibility()
  }

  const setVisibility = () => {
    if (visible === 'hidden') {
      setVisible('visible')
    } else if (visible === 'visible') {
      setVisible('hidden')
    }
  }

  return (
    <div className='navigation'>
      <input
        type='checkbox'
        className='navigation__checkbox'
        id='navi-toggle'
      />

      <label
        htmlFor='navi-toggle'
        className='navigation__button'
        onClick={setVisibility}
      >
        <span className='navigation__icon'>&nbsp;</span>
      </label>

      <div className='navigation__background'>&nbsp;</div>

      <nav className='navigation__nav'>
        <ul
          className='navigation__list'
          style={{
            visibility: visible,
          }}
        >
          <li className='navigation__item'>
            <Link className='navigation__link' to='/' onClick={minimizeNav}>
              Home
            </Link>
          </li>
          <li className='navigation__item'>
            <Link
              className='navigation__link'
              to='/programs'
              onClick={minimizeNav}
            >
              Programs
            </Link>
          </li>
          <li className='navigation__item'>
            <Link
              className='navigation__link'
              to='/online-review'
              onClick={minimizeNav}
            >
              Online Review
            </Link>
          </li>
          <li className='navigation__item'>
            <Link
              className='navigation__link'
              to='/registration'
              onClick={minimizeNav}
            >
              Student Registration
            </Link>
          </li>
          <li className='navigation__item'>
            <Link
              className='navigation__link'
              to='/contact'
              onClick={minimizeNav}
            >
              Contact Us
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Navigation
