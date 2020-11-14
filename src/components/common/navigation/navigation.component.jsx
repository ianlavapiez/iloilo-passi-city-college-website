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
              to='/courses'
              onClick={minimizeNav}
            >
              Courses
            </Link>
          </li>
          <li className='navigation__item'>
            <Link
              className='navigation__link'
              to='/facilities'
              onClick={minimizeNav}
            >
              Facilities
            </Link>
          </li>
          <li className='navigation__item'>
            <Link
              className='navigation__link'
              to='/events'
              onClick={minimizeNav}
            >
              Events
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Navigation
