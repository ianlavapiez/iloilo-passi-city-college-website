import React, { useEffect } from 'react'
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

const PaymentPage = ({ getStudentPayments, studentId }) => {
  useEffect(() => {
    if (studentId) {
      getStudentPayments(studentId)
    }
  }, [getStudentPayments, studentId])

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
                <StudentPaymentModal />
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
  }
}

const mapDispatchToProps = {
  getStudentPayments,
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentPage)
