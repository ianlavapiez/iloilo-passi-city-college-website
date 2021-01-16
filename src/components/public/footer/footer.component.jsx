import React from 'react';
import { Link } from 'react-router-dom';

import FooterLogo from '../../../assets/passi-logo.jpg';

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footer__logo-box'>
        <img src={FooterLogo} alt='Full logo' className='footer__logo' />
      </div>
      <div className='row'>
        <div className='col-1-of-2'>
          <div className='footer__navigation'>
            <ul className='footer__list'>
              <li className='footer__item'>
                <Link to='/' className='footer__link'>
                  Home
                </Link>
              </li>
              <li className='footer__item'>
                <Link to='/courses' className='footer__link'>
                  Courses
                </Link>
              </li>
              <li className='footer__item'>
                <Link to='/facilities' className='footer__link'>
                  Facilities
                </Link>
              </li>
              <li className='footer__item'>
                <Link to='/events' className='footer__link'>
                  Events
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
  );
};

export default Footer;
