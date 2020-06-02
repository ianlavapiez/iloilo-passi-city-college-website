import React from 'react'
import { Form, Input, Select, Button, Checkbox, Spin } from 'antd'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import './registration-form.styles.scss'

import { registerUser } from '../../../../redux/auth/auth.actions'
import { fireAlert } from '../../../common/confirmation-message/confirmation-message.component'

const { Option } = Select

const layout = {
  labelCol: {
    span: 9,
  },
  wrapperCol: {
    span: 7,
  },
}
const validateMessages = {
  // eslint-disable-next-line no-template-curly-in-string
  required: '${label} is required!',
  types: {
    // eslint-disable-next-line no-template-curly-in-string
    email: '${label} is not validate email!',
  },
}

const RegistrationForm = ({ registerUser, loading }) => {
  const [form] = Form.useForm()

  const onFinish = async ({ user, accept }) => {
    const {
      address,
      confirmPassword,
      contact,
      course,
      email,
      fullname,
      password,
      program,
    } = user

    if (password !== confirmPassword) {
      return fireAlert("Password doesn't match.", 'warning')
    }

    if (!accept) {
      return fireAlert(
        'You must accept the Terms of Service and have read the Services Privacy Policy before registering.',
        'warning'
      )
    }

    await registerUser({
      address,
      contact,
      course,
      email,
      displayName: fullname,
      password,
      program,
    })

    form.resetFields()
  }

  return (
    <Spin spinning={loading} delay={500}>
      <Form
        {...layout}
        name='nest-messages'
        onFinish={onFinish}
        validateMessages={validateMessages}
        form={form}
      >
        <Form.Item
          name={['user', 'fullname']}
          label='Fullname'
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={['user', 'address']}
          label='Address'
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name={['user', 'contact']}
          label='Contact No.'
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={['user', 'course']}
          label='Course'
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select placeholder='Select course'>
            <Option value='BSCRIM'>BS in Criminology</Option>
            <Option value='BSD'>BS in Dentistry</Option>
            <Option value='BSMT'>BS in Medical Technology</Option>
            <Option value='BSN'>BS in Nursing</Option>
            <Option value='BSPT'>BS in Physical Therapy</Option>
            <Option value='BSRT'>BS in Radio Technology</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name={['user', 'program']}
          label='Program'
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select placeholder='Select program'>
            <Option value='Refresher'>Refresher</Option>
            <Option value='Enhancement'>Enhancement</Option>
            <Option value='Intensive'>Intensive</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name={['user', 'email']}
          label='Email Address'
          rules={[
            {
              type: 'email',
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={['user', 'password']}
          label='Password'
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input type='password' />
        </Form.Item>
        <Form.Item
          name={['user', 'confirmPassword']}
          label='Confirm Password'
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input type='password' />
        </Form.Item>
        <Form.Item
          name='accept'
          valuePropName='checked'
          className='checkbox-margin'
        >
          <Checkbox>
            I accept the <Link to='/terms-of-service'>Terms of Service</Link>{' '}
            and have read the{' '}
            <Link to='/services-privacy-policy'>Services Privacy Policy</Link>.
          </Checkbox>
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 9 }}>
          <Button
            type='primary'
            htmlType='submit'
            size='large'
            style={{
              backgroundColor: '#f97204',
              border: 'none',
              borderRadius: '5px',
            }}
          >
            Register
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  )
}

const mapStateToProps = (state) => {
  return {
    loading: state.async.loading,
  }
}

const mapDispatchToProps = {
  registerUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm)
