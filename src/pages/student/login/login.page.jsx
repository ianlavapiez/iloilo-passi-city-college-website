import React from 'react'
import { Row, Col } from 'antd'

import './login.styles.scss'

import LoginForm from '../../../components/student/login/login.component'
import LoginSideImage from '../../../components/student/login-side-image/login-side-image.component'

const LoginPage = () => {
  return (
    <Row className='container'>
      <Col span={12}>
        <LoginSideImage />
      </Col>
      <Col span={12}>
        <LoginForm />
      </Col>
    </Row>
  )
}

export default LoginPage
