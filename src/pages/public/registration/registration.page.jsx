import React, { useEffect, Fragment } from 'react'

import './registration.styles.scss'

import Header from '../../../components/public/registration/header/header.component'
import RegistrationForm from '../../../components/public/registration/registration-form/registration-form.component'
import Footer from '../../../components/public/footer/footer.component'

const RegistrationPage = ({ loading }) => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <Fragment>
      <div className='row'>
        <Header />
        <RegistrationForm />
      </div>
      <Footer />
    </Fragment>
  )
}

export default RegistrationPage
