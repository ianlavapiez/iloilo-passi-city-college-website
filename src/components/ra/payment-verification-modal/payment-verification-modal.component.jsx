import React from 'react'
import { Modal, Button, Form, Input } from 'antd'

import './payment-verification-modal.styles.scss'

const PaymentVerificationModal = ({ setModalVisible, modalVisible, data }) => {
  const handleCancel = (e) => {
    setModalVisible(false)
  }

  return (
    <div>
      <Modal
        title='Payment Details'
        visible={modalVisible}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose={true}
      >
        <Form>
          <Form.Item
            className='form-item'
            name={['payment', 'paymentId']}
            label='Payment ID'
            initialValue={data ? data.paymentId : ''}
          >
            <Input readOnly />
          </Form.Item>
          <Form.Item
            className='form-item'
            name={['payment', 'referenceNo']}
            label='Reference No'
            initialValue={data ? data.referenceNo : ''}
          >
            <Input readOnly />
          </Form.Item>
          <Form.Item
            className='form-item'
            name={['payment', 'date']}
            label='Date'
            initialValue={data ? data.date : ''}
          >
            <Input readOnly />
          </Form.Item>
          <Form.Item
            className='form-item'
            name={['payment', 'type']}
            label='Payment Type'
            initialValue={data ? data.type : ''}
          >
            <Input readOnly />
          </Form.Item>
          <Form.Item
            className='form-item'
            name={['payment', 'amount']}
            label='Amount'
            initialValue={data ? data.amount : ''}
          >
            <Input readOnly />
          </Form.Item>
          <Form.Item className='form-item' label='Image Link'>
            <a href={data.imageUrl} target='_blank' rel='noopener noreferrer'>
              Click here.
            </a>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 20 }}>
            <Button
              onClick={() => handleCancel()}
              style={{
                borderRadius: 5,
                backgroundColor: '#f97204',
                border: 'none',
              }}
              type='primary'
            >
              Ok
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default PaymentVerificationModal
