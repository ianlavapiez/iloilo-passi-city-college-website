import React, { useState, useEffect } from 'react'
import { Modal, Button, Select, Form, Input } from 'antd'
import { CreditCardOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'

import { getStudents } from '../../../redux/students/students.actions'
import {
  checkIfPaymentExists,
  addPayments,
  updatePaymentDetails,
} from '../../../redux/payments/payments.actions'

import './payment-management-modal.styles.scss'

const { Option } = Select

const PaymentManagementModal = ({
  students,
  getStudents,
  addPayments,
  updatePaymentDetails,
  raId,
  checkIfPaymentExists,
  loading,
  setModalVisible,
  setEdit,
  modalVisible,
  edit,
  data,
}) => {
  console.log(data)
  const [studentId, setStudentId] = useState('')
  const [studentName, setStudentName] = useState('')

  useEffect(() => {
    getStudents()

    if (edit) {
      setStudentId(data.studentId)
      setStudentName(data.studentName)
    }
  }, [getStudents, edit, data])

  const showModal = () => {
    setModalVisible(true)
  }

  const onFinish = async ({ accounting }) => {
    accounting.studentId = studentId
    accounting.studentName = studentName
    accounting.raId = raId
    accounting.fee = accounting.fee * 1

    let result = await checkIfPaymentExists(accounting)

    if (result) {
      await addPayments(accounting)
    }
  }

  const onUpdate = async ({ accounting }) => {
    accounting.studentId = studentId
    accounting.studentName = studentName
    accounting.raId = raId
    accounting.fee = accounting.fee * 1
    accounting.id = data.id

    let result = await checkIfPaymentExists(accounting)

    if (result) {
      await updatePaymentDetails(accounting)
    }
  }

  const handleCancel = (e) => {
    setModalVisible(false)
    setEdit(false)
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
        Add Payment
      </Button>
      <Modal
        title={!edit ? 'Add Payment' : 'Edit Payment'}
        visible={modalVisible}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose={true}
      >
        <Form
          validateMessages={validateMessages}
          onFinish={!edit ? onFinish : onUpdate}
        >
          <Form.Item
            className='form-item'
            name={['accounting', 'studentId']}
            label='Fullname'
            rules={[{ required: true }]}
            initialValue={!edit ? '' : data.studentName}
          >
            <Select
              placeholder='Select a student'
              name='student'
              onChange={(value) => {
                setStudentId(value.substr(0, value.indexOf(' ')))
                setStudentName(value.substr(value.indexOf(' ') + 1))
              }}
            >
              {students &&
                students.map((student) => (
                  <Option
                    key={student.id}
                    value={`${student.id} ${student.displayName}`}
                  >
                    {student.displayName}
                  </Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item
            className='form-item'
            name={['accounting', 'schoolYear']}
            label='School Year'
            rules={[{ required: true }]}
            initialValue={!edit ? '' : data.schoolYear}
          >
            <Select placeholder='Select a school year' name='year'>
              <Option value='2020-2021'>2020-2021</Option>
              <Option value='2021-2022'>2021-2022</Option>
              <Option value='2022-2023'>2022-2023</Option>
            </Select>
          </Form.Item>
          <Form.Item
            className='form-item'
            name={['accounting', 'program']}
            label='Program'
            rules={[{ required: true }]}
            initialValue={!edit ? '' : data.program}
          >
            <Select placeholder='Select program' name='program'>
              <Option value='Refresher'>Refresher</Option>
              <Option value='Enhancement'>Enhancement</Option>
              <Option value='Intensive'>Intensive</Option>
            </Select>
          </Form.Item>
          <Form.Item
            className='form-item'
            label='Tuition Fee'
            name={['accounting', 'fee']}
            rules={[{ required: true }]}
            initialValue={!edit ? '' : data.fee.toString()}
          >
            <Input type='number' />
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
    students: state.students.students
      ? state.students.students.filter((student) => student.verified === true)
      : [],
  }
}

const mapDispatchToProps = {
  getStudents,
  checkIfPaymentExists,
  addPayments,
  updatePaymentDetails,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentManagementModal)
