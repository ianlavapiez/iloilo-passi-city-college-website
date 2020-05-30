import React, { Fragment } from 'react'
import { Form, Input, Select, Button, Checkbox } from 'antd'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import './registration-form.styles.scss'

import { signUpStart } from '../../../../redux/user/user.actions'
import { selectError } from '../../../../redux/user/user.selectors'

import { popupMessageDialog } from '../../../common/popup-message/popup-message.component'

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
  required: '${label} is required!',
  types: {
    email: '${label} is not validate email!',
  },
}

const RegistrationForm = ({ signUpStart, error }) => {
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
      return popupMessageDialog('warning', "Password doesn't match.")
    }

    if (!accept) {
      return popupMessageDialog(
        'warning',
        'You must accept the Terms of Service and have read the Services Privacy Policy before registering.'
      )
    }

    signUpStart({
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
    <Fragment>
      {error !== null ? popupMessageDialog('warning', error) : null}
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
            I accept the <a href='#'>Terms of Service</a> and have read the{' '}
            <a href='#'>Services Privacy Policy</a>.
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
    </Fragment>
  )
}

const mapStateToProps = createStructuredSelector({
  error: selectError,
})

const mapDispatchToProps = (dispatch) => ({
  signUpStart: (userCredentials) => dispatch(signUpStart(userCredentials)),
})

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm)
