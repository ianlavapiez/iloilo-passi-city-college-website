import React, { Fragment } from 'react'
import { Row, Col, Spin } from 'antd'
import { connect } from 'react-redux'

import './login.styles.scss'

import LoginForm from '../../../components/ra/login/login.component'
import LoginSideImage from '../../../components/ra/login-side-image/login-side-image.component'

const LoginPage = ({ loading, error }) => {
  return (
    <Fragment>
      <Spin tip='Signing in...' spinning={loading} delay={500}>
        <Row className='container'>
          <Col span={12}>
            <LoginSideImage />
          </Col>
          <Col span={12}>
            <LoginForm />
          </Col>
        </Row>
      </Spin>
    </Fragment>
  )
}

const mapStateToProps = (state) => {
  return {
    loading: state.async.loading,
  }
}

export default connect(mapStateToProps)(LoginPage)
