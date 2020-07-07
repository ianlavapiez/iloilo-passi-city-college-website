import React, { useState } from 'react'
import {
  Modal,
  Button,
  Input,
  Select,
  Form,
  DatePicker,
  Typography,
} from 'antd'
import { connect } from 'react-redux'

import './sub-payment-modal.styles.scss'

import {
  addPaymentsFromRA,
  updateAccumulatedPayment,
} from '../../../redux/payments/payments.actions'

import { fireAlert } from '../../common/confirmation-message/confirmation-message.component'
import { useEffect } from 'react'

const { Option } = Select
const { Text } = Typography

const SubPaymentModal = ({
  loading,
  setSubModalVisible,
  subModalVisible,
  data,
  setData,
  raId,
  updateAccumulatedPayment,
  addPaymentsFromRA,
}) => {
  const [date, setDate] = useState('')
  const [disabled, setDisabled] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const { fee, accumulatedPayment } = data

    if (fee === accumulatedPayment) {
      setDisabled(true)
      setError('This account has already paid in full.')
    }

    return () => {
      setError('')
      setDisabled(false)
    }
  }, [data])

  const onFinish = async ({ payment }) => {
    let balance = 0

    payment.amount = payment.amount * 1

    let fee = data.fee * 1
    let accumulatedPayment = data.accumulatedPayment * 1

    balance = fee - accumulatedPayment

    if (payment.amount > balance) {
      return fireAlert(
        'The amount should not exceed to the current balance.',
        'warning'
      )
    }

    accumulatedPayment = accumulatedPayment + payment.amount

    let newValues = {
      ...payment,
      date,
      paymentId: data.id,
      raId,
    }

    let newUpdatedPayment = {
      id: data.id,
      accumulatedPayment,
    }

    await updateAccumulatedPayment(newUpdatedPayment)
    await addPaymentsFromRA(newValues)
  }

  const handleCancel = () => {
    setData({})
    setSubModalVisible(false)
  }

  const onDateChange = (date, dateString) => {
    setDate(dateString)
  }

  const validateMessages = {
    // eslint-disable-next-line
    required: '${label} is required!',
  }

  return (
    <div>
      <Modal
        title='Add Sub-Payment'
        visible={subModalVisible}
        onCancel={handleCancel}
        destroyOnClose
        footer={null}
      >
        <Form validateMessages={validateMessages} onFinish={onFinish}>
          <Form.Item
            className='form-item'
            name={['payment', 'paymentId']}
            label='Payment ID'
            rules={[{ required: true }]}
            initialValue={data ? data.id : ''}
          >
            <Input readOnly />
          </Form.Item>
          <Form.Item
            style={{ width: '100%' }}
            className='form-item'
            name={['payment', 'date']}
            label='Date'
            rules={[{ required: true }]}
          >
            <DatePicker onChange={onDateChange} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            className='form-item'
            name={['payment', 'type']}
            label='Payment Type'
            rules={[{ required: true }]}
          >
            <Select placeholder='Select a payment type' name='type'>
              <Option value='Office'>Office</Option>
            </Select>
          </Form.Item>
          <Form.Item
            className='form-item'
            name={['payment', 'amount']}
            label='Amount'
            rules={[{ required: true }]}
          >
            <Input type='number' />
          </Form.Item>
          <Form.Item className='form-item'>
            {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 20 }}>
            <Button
              disabled={disabled}
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
    payments: state.payments.studentPayments,
    raId: state.firebase.auth.uid,
  }
}

const mapDispatchToProps = {
  addPaymentsFromRA,
  updateAccumulatedPayment,
}

export default connect(mapStateToProps, mapDispatchToProps)(SubPaymentModal)
