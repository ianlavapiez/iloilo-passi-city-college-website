import React, { useState } from 'react'
import { Modal, Button, Input, Form, Select, DatePicker } from 'antd'
import { CalendarOutlined } from '@ant-design/icons'

import './dispatching-schedule-modal.styles.scss'

const { Option } = Select

const DispatchingScheduleModal = (props) => {
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
        Dispatch Schedule Info
      </Button>
      <Modal
        title='Dispatch Schedule Info'
        visible={visible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form validateMessages={validateMessages} onFinish={onFinish}>
          <Form.Item
            className='form-item'
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
            className='form-item'
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
            className='form-item'
            name='date'
            label='Class Date'
            rules={[{ required: true }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            className='form-item'
            name='message'
            label='Message'
            rules={[{ required: true }]}
          >
            <Input />
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

export default DispatchingScheduleModal
