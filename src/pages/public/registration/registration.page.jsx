import React, { Fragment } from 'react'
import { Row, Col } from 'antd'

import './registration.styles.scss'

import Header from '../../../components/public/registration/header/header.component'
import RegistrationForm from '../../../components/public/registration/registration-form/registration-form.component'
import Footer from '../../../components/public/footer/footer.component'

const RegistrationPage = () => {
  return (
    <Fragment>
      <Row style={{ height: '100vh' }}>
        <Col span={24}>
          <Header />
          <RegistrationForm />
        </Col>
      </Row>
      <Footer />
    </Fragment>
  )
}

export default RegistrationPage
