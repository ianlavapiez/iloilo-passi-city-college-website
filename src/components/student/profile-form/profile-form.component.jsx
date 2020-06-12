import React, { useEffect } from 'react'
import { Form, Input, Spin, Button, Typography } from 'antd'
import { connect } from 'react-redux'

import {
  updatePassword,
  updateStudentProfile,
} from '../../../redux/auth/auth.actions'

import {
  fireAlert,
  fireAlertWithConfirmation,
} from '../../common/confirmation-message/confirmation-message.component'

const { Title } = Typography

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
}

const ProfileForm = ({
  updatePassword,
  updateStudentProfile,
  loading,
  currentUser,
  initialValues,
}) => {
  const [form] = Form.useForm()
  const [secondForm] = Form.useForm()

  useEffect(() => {
    if (currentUser) {
      const { displayName, address, contact } = currentUser[0]

      form.setFieldsValue({
        displayName,
        address,
        contact,
      })
    }
  }, [currentUser, form])

  const onFinish = async (user) => {
    const { displayName, address, contact } = user

    await updateStudentProfile({
      id: currentUser[0].id,
      displayName,
      address,
      contact,
    })

    form.resetFields()
  }

  const onUpdate = async ({ passwordDetails }) => {
    const { password, confirmPassword } = passwordDetails

    if (password.length < 8) {
      return fireAlert(
        'Password should be at least 8 characters in length.',
        'warning'
      )
    }

    if (password !== confirmPassword) {
      return fireAlert('Password does not match.', 'warning')
    }

    fireAlertWithConfirmation(
      'Are you sure you want to update your password?',
      'Successfully changed your password, please do login again.',
      async (confirmed) => {
        if (confirmed) {
          await updatePassword(password)
          secondForm.resetFields()
        } else {
          return false
        }
      }
    )
  }

  return (
    <Spin spinning={loading} delay={500}>
      <Form
        {...layout}
        onFinish={onFinish}
        validateMessages={validateMessages}
        form={form}
      >
        <Title style={{ textAlign: 'center', marginLeft: -250 }} level={4}>
          Basic Information
        </Title>
        <Form.Item
          name='displayName'
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
          name='address'
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
          name='contact'
          label='Contact No.'
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
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
            Update Basic Information
          </Button>
        </Form.Item>
      </Form>
      <Form
        {...layout}
        name='nest-messages'
        onFinish={onUpdate}
        validateMessages={validateMessages}
        form={secondForm}
      >
        <Title style={{ textAlign: 'center', marginLeft: -250 }} level={4}>
          Update Password
        </Title>
        <Form.Item
          name={['passwordDetails', 'password']}
          label='New Password'
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name={['passwordDetails', 'confirmPassword']}
          label='Confirm Password'
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input.Password />
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
            Update Password
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  )
}

const mapStateToProps = (state) => ({
  loading: state.async.loading,
  currentUser: state.auth.currentUser,
})

const mapDispatchToProps = {
  updatePassword,
  updateStudentProfile,
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileForm)
