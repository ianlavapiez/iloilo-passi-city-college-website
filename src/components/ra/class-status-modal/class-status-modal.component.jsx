import React from 'react'
import { Modal, Button, Select, Form } from 'antd'
import { connect } from 'react-redux'

import './class-status-modal.styles.scss'

import { changeClassStatus } from '../../../redux/class/class.actions'

import { fireAlertWithConfirmation } from '../../common/confirmation-message/confirmation-message.component'

const { Option } = Select

const ClassStatusModal = ({
  changeClassStatus,
  loading,
  setStatusModalVisible,
  statusModalVisible,
  data,
}) => {
  const onFinish = async (values) => {
    let newValues = {
      ...values,
      id: data.id,
    }

    fireAlertWithConfirmation(
      `Are you sure you want to update the class' status?`,
      'Successfully updated!',
      async (confirmed) => {
        if (confirmed) {
          await changeClassStatus(newValues)
        } else {
          return false
        }
      }
    )
  }

  const handleCancel = (e) => {
    setStatusModalVisible(false)
  }

  const validateMessages = {
    // eslint-disable-next-line
    required: '${label} is required!',
  }

  return (
    <div>
      <Modal
        title='Update Class Status'
        visible={statusModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form validateMessages={validateMessages} onFinish={onFinish}>
          <Form.Item
            className='form-item'
            name={'status'}
            label='Status'
            rules={[{ required: true }]}
            initialValue={data.status}
          >
            <Select placeholder='Select status'>
              <Option value='Cancelled'>Cancelled</Option>
              <Option value='On-going'>On-going</Option>
              <Option value='Pending'>Pending</Option>
              <Option value='Done'>Done</Option>
            </Select>
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
  }
}

const mapDispatchToProps = {
  changeClassStatus,
}

export default connect(mapStateToProps, mapDispatchToProps)(ClassStatusModal)
