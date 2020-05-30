import React, { Fragment, useEffect, useState } from 'react'
import { Row, Col, Spin } from 'antd'
import { connect } from 'react-redux'

import './login.styles.scss'

import LoginForm from '../../../components/student/login/login.component'
import LoginSideImage from '../../../components/student/login-side-image/login-side-image.component'
import { popupMessageDialog } from '../../../components/common/popup-message/popup-message.component'

const LoginPage = ({ loading, error }) => {
  useEffect(() => {
    setErrorMessage(error)
  }, [error])

  const [errorMessage, setErrorMessage] = useState(error)

  const popupErrorMessageDialog = () => {
    popupMessageDialog('warning', 'error')
    setErrorMessage(null)
  }

  return (
    <Fragment>
      {errorMessage ? popupErrorMessageDialog() : null}
      <Spin tip='Signing in...' spinning={loading} delay={500}>
        <Row className='container'>
          <Col span={12}>
            <LoginSideImage />
          </Col>
          <Col span={12}>
            <LoginForm error={error} />
          </Col>
        </Row>
      </Spin>
    </Fragment>
  )
}

const mapStateToProps = (state) => ({
  error: state.user.error,
  loading: state.user.isLoading,
})

export default connect(mapStateToProps)(LoginPage)
