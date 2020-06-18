import React from 'react'
import { Form, Input, Button, Typography, Layout } from 'antd'
import { MailOutlined, LockOutlined } from '@ant-design/icons'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import './login.styles.scss'

import { raLogin } from '../../../redux/auth/auth.actions'

import { fireAlert } from '../../common/confirmation-message/confirmation-message.component'

const { Title } = Typography
const { Content } = Layout

const LoginForm = ({ raLogin, history }) => {
  const onFinish = async (values) => {
    const isLoggedIn = await raLogin(values)

    if (!isLoggedIn) {
      return
    } else {
      fireAlert('Welcome RA!', 'success')
      history.push('/ra')
    }
  }

  return (
    <Content className='login-container'>
      <Title level={2} style={{ fontWeight: 300 }}>
        Welcome RA!
      </Title>
      <Form
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
  raLogin,
}

export default withRouter(connect(null, mapDispatchToProps)(LoginForm))
