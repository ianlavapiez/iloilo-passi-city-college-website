import React from 'react'
import { Form, Input, Button, Typography, Layout } from 'antd'
import { MailOutlined, LockOutlined } from '@ant-design/icons'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import './login.styles.scss'

import { studentLogin } from '../../../redux/auth/auth.actions'

import { fireAlert } from '../../common/confirmation-message/confirmation-message.component'

const { Title } = Typography
const { Content } = Layout

const LoginForm = ({ history, studentLogin }) => {
  const onFinish = async (values) => {
    const isLoggedIn = await studentLogin(values)

    if (isLoggedIn) {
      fireAlert('Welcome Student!', 'success')
      history.push('/student')
    }
  }

  return (
    <Content className='login-container'>
      <Title level={2} style={{ fontWeight: 300 }}>
        Welcome Student!
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
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    </Content>
  )
}

const mapDispatchToProps = {
  studentLogin,
}

export default withRouter(connect(null, mapDispatchToProps)(LoginForm))
