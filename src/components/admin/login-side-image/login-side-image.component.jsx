import React from 'react';

import './login-side-image.styles.scss';

import LoginImage from '../../../assets/login-logo.jpg';

const LoginSideImage = () => {
  return (
    <div>
      <img className='logo-container' src={LoginImage} alt='Login Logo' />
    </div>
  );
};

export default LoginSideImage;
