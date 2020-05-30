import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Form, Input, Button, Typography, Layout } from 'antd'
import { MailOutlined, LockOutlined } from '@ant-design/icons'

import './login.styles.scss'

import {
  emailSignInStart,
  fetchUserStart,
} from '../../../redux/user/user.actions'
import { selectCurrentUser } from '../../../redux/user/user.selectors'
import { popupMessageDialog } from '../../common/popup-message/popup-message.component'

const { Title } = Typography
const { Content } = Layout

const LoginForm = ({ emailSignInStart, currentUser, history, error }) => {
  useEffect(() => {
    if (
      currentUser &&
      currentUser.type === 'student' &&
      currentUser.verified === true
    ) {
      history.push('/student')
    }
  }, [currentUser, history])

  const onFinish = async ({ email, password }) => {
    await emailSignInStart(email, password)
  }

  return (
    <Content className='login-container'>
      <Title level={2} style={{ fontWeight: 300 }}>
        Welcome Student!
      </Title>
      <Form
        name='normal_login'
        className='login-form'
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name='email'
          rules={[
            {
              required: true,
              message: 'Please input your Email!',
            },
          ]}
        >
          <Input
            prefix={<MailOutlined className='site-form-item-icon' />}
            placeholder='Email'
          />
        </Form.Item>
        <Form.Item
          name='password'
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className='site-form-item-icon' />}
            type='password'
            placeholder='Password'
          />
        </Form.Item>
        <Form.Item>
          <Button
            size='large'
            style={{
              borderRadius: 5,
              backgroundColor: '#f97204',
              border: 'none',
            }}
            type='primary'
            htmlType='submit'
            className='login-form-button'
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    </Content>
  )
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
  error: state.user.error,
})

const mapDispatchToProps = (dispatch) => ({
  emailSignInStart: (email, password) =>
    dispatch(emailSignInStart({ email, password })),
  fetchUserStart: () => dispatch(fetchUserStart()),
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LoginForm)
)
