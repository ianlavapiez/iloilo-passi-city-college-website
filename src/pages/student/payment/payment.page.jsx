import React, { useEffect, useState } from 'react'
import { Layout, Typography } from 'antd'
import { connect } from 'react-redux'

import { getStudentPayments } from '../../../redux/payments/payments.actions'

import Sidebar from '../../../components/student/sidebar/sidebar.component'
import Navbar from '../../../components/student/navbar/navbar.component'
import StudentFooter from '../../../components/student/footer/footer.component'
import StudentPaymentModal from '../../../components/student/student-payment-modal/student-payment-modal.component'
import StudentPaymentTable from '../../../components/student/student-payment-table/student-payment-table.component'

const { Content } = Layout
const { Title } = Typography

const PaymentPage = ({ getStudentPayments, studentId, payments }) => {
  const [totalPayment, setTotalPayment] = useState(0)

  const accumulatePayment = (payments) => {
    if (payments.length > 0) {
      let sum = payments.reduce((accumulator, item) => {
        return accumulator + (item.fee - item.accumulatedPayment)
      }, 0)

      setTotalPayment(sum)
    }
  }

  useEffect(() => {
    if (studentId) {
      async function getPayments() {
        await getStudentPayments(studentId)
      }

      getPayments()
    }
  }, [studentId, getStudentPayments])

  useEffect(() => {
    accumulatePayment(payments)
  }, [payments])

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar number={'2'} />
      <Layout className='site-layout'>
        <Navbar />
        <Content style={{ margin: '0 16px' }}>
          <div
            className='site-layout-background'
            style={{ padding: 20, minHeight: '85vh' }}
          >
            <div style={{ marginTop: 0 }}>
              <Title level={2}>Payment Details</Title>
              <div style={{ marginBottom: 15 }}>
                <StudentPaymentModal totalPayment={totalPayment} />
              </div>
              <StudentPaymentTable />
            </div>
          </div>
        </Content>
        <StudentFooter />
      </Layout>
    </Layout>
  )
}

const mapStateToProps = (state) => {
  return {
    studentId: state.firebase.auth.uid,
    payments: state.payments.studentPayments,
  }
}

const mapDispatchToProps = {
  getStudentPayments,
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentPage)
