import React from 'react'
import { Form, Input, Button, Typography, Layout } from 'antd'
import { MailOutlined, LockOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { adminLogin } from '../../../redux/auth/auth.actions'

import './login.styles.scss'

import { fireAlert } from '../../common/confirmation-message/confirmation-message.component'

const { Title } = Typography
const { Content } = Layout

const LoginForm = ({ history, adminLogin, setIsLoading }) => {
  const onFinish = async (values) => {
    setIsLoading(true)
    const isLoggedIn = await adminLogin(values)

    if (!isLoggedIn) {
      setIsLoading(false)
      return
    } else {
      setIsLoading(false)
      fireAlert('Welcome Admin!', 'success')
      history.push('/admin')
    }
  }

  return (
    <Content className='login-container'>
      <Title level={2} style={{ fontWeight: 300 }}>
        Welcome Admin!
      </Title>
      <Form
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
            type='email'
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
          <Input.Password
            prefix={<LockOutlined className='site-form-item-icon' />}
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

const mapDispatchToProps = {
  adminLogin,
}

export default withRouter(connect(null, mapDispatchToProps)(LoginForm))
