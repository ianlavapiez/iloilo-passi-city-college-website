import React, { useState } from 'react'
import { Row, Col, Spin } from 'antd'

import './login.styles.scss'

import LoginForm from '../../../components/admin/login/login.component'
import LoginSideImage from '../../../components/admin/login-side-image/login-side-image.component'

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <Spin tip='Signing in...' spinning={isLoading} delay={500}>
      <Row className='container'>
        <Col span={12}>
          <LoginSideImage />
        </Col>
        <Col span={12}>
          <LoginForm setIsLoading={setIsLoading} />
        </Col>
      </Row>
    </Spin>
  )
}

export default LoginPage
