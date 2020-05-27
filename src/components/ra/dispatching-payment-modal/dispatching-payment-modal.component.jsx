import React, { useState } from 'react'
import { Modal, Button, Input, Select, Form } from 'antd'
import { CreditCardOutlined } from '@ant-design/icons'

import './dispatching-payment-modal.styles.scss'

const { Option } = Select

const DispatchingPaymentModal = (props) => {
  const [visible, setVisible] = useState(false)

  const showModal = () => {
    setVisible(true)
  }

  const onFinish = (values) => {
    console.log('Received values of form: ', values)
    // setVisible(false)
  }

  const handleCancel = (e) => {
    setVisible(false)
  }

  const validateMessages = {
    // eslint-disable-next-line
    required: '${label} is required!',
  }

  return (
    <div>
      <Button
        style={{ borderRadius: 5, backgroundColor: '#f97204', border: 'none' }}
        type='primary'
        onClick={showModal}
        icon={<CreditCardOutlined />}
      >
        Dispatch Payment Info
      </Button>
      <Modal
        title='Edit Student Details'
        visible={visible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form validateMessages={validateMessages} onFinish={onFinish}>
          <Form.Item
            className='form-item'
            name='fullname'
            label='Fullname'
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            className='form-item'
            name={'course'}
            label='Course'
            rules={[{ required: true }]}
          >
            <Select placeholder='Select a course' name='course'>
              <Option value='Academe'>Dentistry</Option>
              <Option value='Community'>Radio Technology</Option>
              <Option value='Government'>Nursing</Option>
            </Select>
          </Form.Item>
          <Form.Item
            className='form-item'
            name={'program'}
            label='Program'
            rules={[{ required: true }]}
          >
            <Select placeholder='Select a program' name='program'>
              <Option value='Intensive'>Program 1</Option>
              <Option value='Community'>Program 2</Option>
              <Option value='Government'>Program 3</Option>
            </Select>
          </Form.Item>
          <Form.Item
            className='form-item'
            name={'status'}
            label='Status'
            rules={[{ required: true }]}
          >
            <Select placeholder='Select a status' name='status'>
              <Option value='Academe'>Enrolled</Option>
              <Option value='Community'>Pending</Option>
            </Select>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 20 }}>
            <Button
              style={{
                borderRadius: 5,
                backgroundColor: '#f97204',
                border: 'none',
              }}
              type='primary'
              htmlType='submit'
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default DispatchingPaymentModal
