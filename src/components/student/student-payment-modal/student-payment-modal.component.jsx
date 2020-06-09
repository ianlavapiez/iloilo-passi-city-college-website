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
import {
  CalendarOutlined,
  LoadingOutlined,
  PlusOutlined,
} from '@ant-design/icons'
import { connect } from 'react-redux'

import './student-payment-modal.styles.scss'

import { uploadPayment } from '../../../redux/payments/payments.actions'
import { fireAlert } from '../../common/confirmation-message/confirmation-message.component'

const { Option } = Select

const StudentPaymentModal = ({ uploadPayment }) => {
  const [visible, setVisible] = useState(false)
  const [photoLoading, setPhotoLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState(null)
  const [date, setDate] = useState('')

  const showModal = () => {
    setVisible(true)
  }

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
    if (imageUrl === null) {
      return fireAlert('Please upload your receipt.', 'warning')
    }

    let newValues = {
      ...payment,
      date: date,
    }

    await uploadPayment(imageUrl, newValues)
  }

  const handleCancel = () => {
    setVisible(false)
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
            name={['payment', 'referenceNo']}
            label='Reference No.'
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            style={{ width: '100%' }}
            className='form-item'
            name={['payment', 'date']}
            label='Date'
            rules={[{ required: true }]}
          >
            <DatePicker onChange={onDateChange} />
          </Form.Item>
          <Form.Item
            className='form-item'
            name={['payment', 'type']}
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
            name={['payment', 'amount']}
            label='Amount'
            rules={[{ required: true }]}
          >
            <Input type='number' />
          </Form.Item>
          <Form.Item
            className='form-item'
            name={['payment', 'upload']}
            label='Upload is required'
          >
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

const mapDispatchToProps = {
  uploadPayment,
}

export default connect(null, mapDispatchToProps)(StudentPaymentModal)
