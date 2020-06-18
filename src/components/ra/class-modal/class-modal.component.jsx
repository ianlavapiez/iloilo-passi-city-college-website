import React, { useState, useEffect } from 'react'
import {
  Modal,
  Button,
  Select,
  Form,
  DatePicker,
  Input,
  TimePicker,
} from 'antd'
import { CalendarOutlined } from '@ant-design/icons'
import moment from 'moment'
import { connect } from 'react-redux'

import './class-modal.styles.scss'

import {
  checkIfClassExists,
  addClassRecord,
  updateClassRecord,
} from '../../../redux/class/class.actions'

const { Option } = Select
const { RangePicker } = TimePicker

const ClassModal = ({
  raId,
  addClassRecord,
  updateClassRecord,
  checkIfClassExists,
  loading,
  setModalVisible,
  modalVisible,
  data,
  edit,
  setEdit,
}) => {
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')

  useEffect(() => {
    if (data) {
      setDate(data.date)
    }
  }, [data, setDate])

  const showModal = () => {
    setModalVisible(true)
  }

  const onFinish = async (values) => {
    delete values.time

    let newValues = {
      ...values,
      date,
      raId,
      startTime: time[0],
      endTime: time[1],
      status: 'Pending',
    }

    let result = await checkIfClassExists(newValues)

    if (result) {
      await addClassRecord(newValues)
    }
  }

  const onUpdate = async (values) => {
    delete values.time

    let newValues = {
      ...values,
      date,
      raId,
      id: data.id,
      startTime: time[0],
      endTime: time[1],
      status: 'Pending',
    }

    let result = await checkIfClassExists(newValues)

    if (result) {
      await updateClassRecord(newValues)
    }
  }

  const handleCancel = (e) => {
    setEdit(false)
    setModalVisible(false)
  }

  const onDateChange = (date, dateString) => {
    setDate(dateString)
  }

  const onTimeChange = (time, timeString) => {
    console.log(time)
    setTime(timeString)
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
        Add Class Schedule
      </Button>
      <Modal
        title={!edit ? 'Add New Class Schedule' : 'Update Class Schedule'}
        visible={modalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          validateMessages={validateMessages}
          onFinish={!edit ? onFinish : onUpdate}
        >
          <Form.Item
            label='Date'
            className='form-item'
            name='date'
            rules={[{ required: true }]}
            initialValue={edit && moment(data.date)}
          >
            <DatePicker onChange={onDateChange} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            label='Time'
            className='form-item'
            name='time'
            rules={[{ required: true }]}
          >
            <RangePicker
              use12Hours
              format={'h:mm A'}
              onChange={onTimeChange}
              style={{ width: '100%' }}
            />
          </Form.Item>
          <Form.Item
            className='form-item'
            name={'course'}
            label='Course'
            rules={[{ required: true }]}
            initialValue={!edit ? '' : data.course}
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
            name={'program'}
            label='Program'
            rules={[{ required: true }]}
            initialValue={!edit ? '' : data.program}
          >
            <Select placeholder='Select a program'>
              <Option value='Refresher'>Refresher</Option>
              <Option value='Enhancement'>Enhancement</Option>
              <Option value='Intensive'>Intensive</Option>
            </Select>
          </Form.Item>
          <Form.Item
            className='form-item'
            name={'subject'}
            label='Subject'
            rules={[
              {
                required: true,
              },
            ]}
            initialValue={!edit ? '' : data.subject}
          >
            <Input />
          </Form.Item>
          <Form.Item
            className='form-item'
            name={'professor'}
            label='Professor'
            rules={[
              {
                required: true,
              },
            ]}
            initialValue={!edit ? '' : data.professor}
          >
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 20 }}>
            <Button
              disabled={loading}
              loading={loading}
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

const mapStateToProps = (state) => {
  return {
    loading: state.async.loading,
    raId: state.firebase.auth.uid,
  }
}

const mapDispatchToProps = {
  checkIfClassExists,
  addClassRecord,
  updateClassRecord,
}

export default connect(mapStateToProps, mapDispatchToProps)(ClassModal)
