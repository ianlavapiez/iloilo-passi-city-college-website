import React, { useState } from 'react'
import { Modal, Button, Select, Form, DatePicker } from 'antd'
import { CalendarOutlined } from '@ant-design/icons'

import './attendance-modal.styles.scss'

const { Option } = Select

const AttendanceModal = (props) => {
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
        Add Attendance Sheet
      </Button>
      <Modal
        title='Add New Attendance Sheet'
        visible={visible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form validateMessages={validateMessages} onFinish={onFinish}>
          <Form.Item
            className='form-item'
            label='Schedule'
            name='date'
            rules={[{ required: true }]}
          >
            <DatePicker style={{ width: '100%' }} />
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

export default AttendanceModal
