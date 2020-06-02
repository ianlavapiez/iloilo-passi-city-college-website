import React from 'react'
import { Form, Input, Spin, Button, Typography } from 'antd'
import { connect } from 'react-redux'

import {
  updatePassword,
  updateStudentProfile,
} from '../../../redux/auth/auth.actions'

import { fireAlert } from '../../common/confirmation-message/confirmation-message.component'

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
}) => {
  const [form] = Form.useForm()
  const [secondForm] = Form.useForm()

  const { displayName, address, contact } = currentUser
    ? currentUser[0]
    : [
        {
          displayName: '',
          address: '',
          contact: '',
        },
      ]

  const onFinish = async ({ user }) => {
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
      return fireAlert('Password should be at least 8 characters in length.')
    }

    if (password !== confirmPassword) {
      return fireAlert('Password does not match')
    }

    await updatePassword(password)

    secondForm.resetFields()
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
        <Title style={{ textAlign: 'center', marginLeft: -250 }} level={4}>
          Basic Information
        </Title>
        <Form.Item
          name={['user', 'displayName']}
          label='Fullname'
          rules={[
            {
              required: true,
            },
          ]}
          initialValue={displayName}
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
          initialValue={address}
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
          initialValue={contact}
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
          name={['passwordDetails', 'confirmPassword']}
          label='Password'
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input type='password' />
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
