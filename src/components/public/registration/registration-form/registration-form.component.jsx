import React, { useState } from 'react'
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
  const [selectedProgram, setSelectedProgram] = useState('')

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

    let result = await registerUser({
      address,
      contact,
      course,
      email,
      displayName: fullname,
      password,
      program,
    })

    if (result) {
      form.resetFields()
    }
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
          name={['user', 'school']}
          label='School'
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select placeholder='Select school'>
            <Option value='Others'>Others</Option>
            <Option value='Aklan Catholic College'>
              Aklan Catholic College
            </Option>
            <Option value='Central Philippine Adventist College'>
              Central Philippine Adventist College
            </Option>
            <Option value='Colegio San Agustin - Bacolod'>
              Colegio San Agustin - Bacolod
            </Option>
            <Option value='Filamer Christian University'>
              Filamer Christian University
            </Option>
            <Option value='Iloilo Doctors’ College'>
              Iloilo Doctors’ College
            </Option>
            <Option value='Northern Negros State College of Science and Technology'>
              Northern Negros State College of Science and Technology
            </Option>
            <Option value='Palawan State University'>
              Palawan State University
            </Option>
            <Option value='Riverside College'>Riverside College</Option>
            <Option value='Saint Anthony’s College - Antique'>
              Saint Anthony’s College - Antique
            </Option>
            <Option value='St. Paul University Iloilo'>
              St. Paul University Iloilo
            </Option>
            <Option value='University of Iloilo'>University of Iloilo</Option>
            <Option value='University of Negros Occidental - Recoletos'>
              University of Negros Occidental - Recoletos
            </Option>
            <Option value='University of San Agustin'>
              University of San Agustin
            </Option>
            <Option value='University of St. La Salle'>
              University of St. La Salle
            </Option>
            <Option value='West Negros University'>
              West Negros University
            </Option>
          </Select>
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
          <Select
            placeholder='Select program'
            onChange={(value) => setSelectedProgram(value)}
          >
            <Option value='Enhancement'>Enhancement</Option>
            <Option value='Intensive'>Intensive</Option>
          </Select>
        </Form.Item>
        {selectedProgram === 'Intensive' ? (
          <Form.Item
            name={['user', 'category']}
            label='Category'
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select placeholder='Select category'>
              <Option value='Refresher'>Refresher</Option>
              <Option value='Intensive'>Intensive</Option>
              <Option value='Final Coaching'>Final Coaching</Option>
            </Select>
          </Form.Item>
        ) : null}
        {selectedProgram === 'Enhancement' ? (
          <Form.Item
            name={['user', 'category']}
            label='Semester'
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select placeholder='Select semester'>
              <Option value='1st Semester'>1st Semester</Option>
              <Option value='2nd Semester'>2nd Semester</Option>
            </Select>
          </Form.Item>
        ) : null}
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
            I accept and have read the{' '}
            <Link target='_blank' to='/privacy-policy'>
              Brainhub Privacy Policy
            </Link>
            .
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
