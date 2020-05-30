import React, { useEffect } from 'react'
import { Spin } from 'antd'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import './registration.styles.scss'

import { selectIsLoading } from '../../../redux/user/user.selectors'

import Header from '../../../components/public/registration/header/header.component'
import RegistrationForm from '../../../components/public/registration/registration-form/registration-form.component'
import Footer from '../../../components/public/footer/footer.component'

const RegistrationPage = ({ loading }) => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <Spin spinning={loading} delay={500}>
      <div className='row'>
        <Header />
        <RegistrationForm />
      </div>
      <Footer />
    </Spin>
  )
}

const mapStateToProps = createStructuredSelector({
  loading: selectIsLoading,
})

export default connect(mapStateToProps)(RegistrationPage)
