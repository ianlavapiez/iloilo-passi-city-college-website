import React, { useState } from 'react'
import {
  Modal,
  Button,
  Input,
  Select,
  Form,
  Upload,
  DatePicker,
  message,
} from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import './student-payment-info-modal.styles.scss'

import {
  updateUploadedPayment,
  updateAccumulatedPayment,
} from '../../../redux/payments/payments.actions'
import { fireAlert } from '../../common/confirmation-message/confirmation-message.component'

const { Option } = Select

const StudentPaymentInfoModal = ({
  loading,
  updateUploadedPayment,
  updateAccumulatedPayment,
  payments,
  paymentUid,
  data,
  modalVisible,
  setModalVisible,
}) => {
  const [photoLoading, setPhotoLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState(null)
  const [date, setDate] = useState('')
  const [paymentId, setPaymentId] = useState('')
  const [raId, setRaId] = useState('')
  let [fee, setFee] = useState(0)
  let [accumulatedPayment, setAccumulatedPayment] = useState(0)

  const getBase64 = (img, callback) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result))
    reader.readAsDataURL(img)
  }

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!')
    }
    return isJpgOrPng && isLt2M
  }

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setPhotoLoading(true)
      return
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl) => {
        setImageUrl(imageUrl)
        setPhotoLoading(false)
      })
    }
  }

  const uploadButton = (
    <div>
      {photoLoading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className='ant-upload-text'>Upload</div>
    </div>
  )

  const onFinish = async ({ payment }) => {
    let balance = 0

    if (imageUrl === null) {
      return fireAlert('Please upload your receipt.', 'warning')
    }

    payment.amount = payment.amount * 1
    fee = fee * 1
    accumulatedPayment = (accumulatedPayment - data.amount) * 1
    balance = fee - accumulatedPayment

    if (payment.amount > balance) {
      return fireAlert(
        'The amount should not exceed to the current balance.',
        'warning'
      )
    }

    accumulatedPayment = accumulatedPayment + payment.amount

    let newValues = {
      id: data.id,
      ...payment,
      date,
      paymentId,
      raId,
    }
    let newUpdatedPayment

    if (data.paymentId !== paymentId) {
      newUpdatedPayment = {
        id: data.paymentId,
        accumulatedPayment: accumulatedPayment - data.amount,
      }

      await updateAccumulatedPayment(newUpdatedPayment)
    }

    newUpdatedPayment = {
      id: paymentId,
      accumulatedPayment,
    }

    await updateAccumulatedPayment(newUpdatedPayment)
    await updateUploadedPayment(imageUrl, newValues)
  }

  const handleCancel = () => {
    setModalVisible(false)
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
        title='Edit Upload Payment Made'
        visible={modalVisible}
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
          >
            <Select
              placeholder='Select a payment ID'
              name='paymentId'
              onChange={(value) => {
                setPaymentId(value[0])
                setAccumulatedPayment(value[1])
                setFee(value[2])
                setRaId(value[3])
              }}
            >
              {payments &&
                payments.map((payment) => {
                  if (payment.id !== paymentUid) {
                    return null
                  }
                  return (
                    <Option
                      key={payment.id}
                      value={[
                        `${payment.id}`,
                        `${payment.accumulatedPayment}`,
                        `${payment.fee}`,
                        `${payment.raId}`,
                      ]}
                    >
                      {payment.id}
                    </Option>
                  )
                })}
            </Select>
          </Form.Item>
          <Form.Item
            className='form-item'
            name={['payment', 'referenceNo']}
            label='Reference No.'
            rules={[{ required: true }]}
            initialValue={data ? data.referenceNo : ''}
          >
            <Input />
          </Form.Item>
          <Form.Item
            style={{ width: '100%' }}
            className='form-item'
            name={['payment', 'date']}
            label='Date'
            rules={[{ required: true }]}
            // initialValue={data ? data.date : ''}
          >
            <DatePicker onChange={onDateChange} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            className='form-item'
            name={['payment', 'type']}
            label='Payment Type'
            rules={[{ required: true }]}
            initialValue={data ? data.type : ''}
          >
            <Select placeholder='Select a payment type' name='type'>
              <Option value='Palawan Pawnshop'>Palawan</Option>
              <Option value='Cebuana Lhuiller'>Cebuana Lhuiller</Option>
              <Option value='ML Kwarta Padala'>ML Kwarta Padala</Option>
              <Option value='BDO Bank Deposit'>BDO Bank Deposit</Option>
            </Select>
          </Form.Item>
          <Form.Item
            className='form-item'
            name={['payment', 'amount']}
            label='Amount'
            rules={[{ required: true }]}
            initialValue={data ? data.amount : ''}
          >
            <Input type='number' />
          </Form.Item>
          <Form.Item className='form-item' label='Upload is required'>
            <Upload
              listType='picture-card'
              className='avatar-uploader'
              showUploadList={false}
              action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
              beforeUpload={beforeUpload}
              onChange={handleChange}
              disabled={imageUrl ? true : false}
            >
              {imageUrl ? (
                <img src={imageUrl} alt='avatar' style={{ width: '100%' }} />
              ) : (
                uploadButton
              )}
            </Upload>
          </Form.Item>
          <Form.Item style={{ marginTop: -30 }}>
            <Button
              onClick={() => setImageUrl(null)}
              style={{
                borderRadius: 5,
                backgroundColor: '#f97204',
                border: 'none',
              }}
              type='primary'
              disabled={imageUrl === null ? true : false}
            >
              Remove Upload
            </Button>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 20 }}>
            <Button
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

const mapStateToProps = (state, ownParams) => {
  return {
    loading: state.async.loading,
    payments: state.payments.studentPayments,
    paymentUid: ownParams.match.params.id,
  }
}

const mapDispatchToProps = {
  updateUploadedPayment,
  updateAccumulatedPayment,
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(StudentPaymentInfoModal)
)
