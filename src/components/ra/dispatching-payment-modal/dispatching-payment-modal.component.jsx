import React, { useState } from 'react'
import { Modal, Button, Input, Form } from 'antd'
import { CreditCardOutlined } from '@ant-design/icons'

import './dispatching-payment-modal.styles.scss'

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
        title='Dispatch Payment Info'
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
            name='message'
            label='Message'
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            className='form-item'
            name='amount'
            label='Amount'
            rules={[{ required: true }]}
          >
            <Input type='number' />
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
