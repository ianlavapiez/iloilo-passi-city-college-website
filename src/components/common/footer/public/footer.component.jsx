import React from 'react'
import { Link } from 'react-router-dom'

import FooterLogo from '../../../../assets/header-logo.png'

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footer__logo-box'>
        <img src={FooterLogo} alt='Full logo' className='footer__logo' />
        <h2 className='heading-tertiary'>&copy; Brainhub</h2>
      </div>
      <div className='row'>
        <div className='col-1-of-2'>
          <div className='footer__navigation'>
            <ul className='footer__list'>
              <li className='footer__item'>
                <Link to='/programs' className='footer__link'>
                  Programs
                </Link>
              </li>
              <li className='footer__item'>
                <Link to='/online-review' className='footer__link'>
                  Online Review
                </Link>
              </li>
              <li className='footer__item'>
                <Link to='/contact' className='footer__link'>
                  Contact Us
                </Link>
              </li>
              <li className='footer__item'>
                <Link to='/privacy-policy' className='footer__link'>
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className='col-1-of-2'>
          <p className='footer__copyright'>
            All Rights Reserved. Copyright &copy; 2020.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
