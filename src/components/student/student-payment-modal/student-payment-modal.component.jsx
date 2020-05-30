import React, { useState } from 'react'
import { Modal, Button, Input, Select, Form, Upload } from 'antd'

import { CalendarOutlined, UploadOutlined } from '@ant-design/icons'

import './student-payment-modal.styles.scss'

const { Option } = Select

const StudentPaymentModal = (props) => {
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
        icon={<CalendarOutlined />}
      >
        Upload Payment Made
      </Button>
      <Modal
        title='Upload Payment Made'
        visible={visible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form validateMessages={validateMessages} onFinish={onFinish}>
          <Form.Item
            className='form-item'
            name='ref'
            label='Reference No.'
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            className='form-item'
            name={'type'}
            label='Payment Type'
            rules={[{ required: true }]}
          >
            <Select placeholder='Select a payment type' name='payment'>
              <Option value='Palawan Pawnshop'>Palawan</Option>
              <Option value='Cebuana Lhuiller'>Cebuana Lhuiller</Option>
              <Option value='ML Kwarta Padala'>ML Kwarta Padala</Option>
              <Option value='BDO Bank Deposit'>BDO Bank Deposit</Option>
            </Select>
          </Form.Item>
          <Form.Item
            className='form-item'
            name={'type'}
            label='Upload is required'
          >
            <Upload {...props}>
              <Button>
                <UploadOutlined /> Upload
              </Button>
            </Upload>
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

export default StudentPaymentModal
