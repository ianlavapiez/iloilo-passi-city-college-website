import React, { useState, Fragment } from 'react'
import { Row, Col, Spin } from 'antd'

import './login.styles.scss'

import LoginForm from '../../../components/student/login/login.component'
import LoginSideImage from '../../../components/student/login-side-image/login-side-image.component'

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <Fragment>
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
    </Fragment>
  )
}

export default LoginPage
