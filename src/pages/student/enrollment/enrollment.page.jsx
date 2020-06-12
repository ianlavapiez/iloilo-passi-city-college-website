import React, { useEffect } from 'react'
import { Layout, Typography } from 'antd'
import { connect } from 'react-redux'

import { getStudentPayments } from '../../../redux/payments/payments.actions'

import Sidebar from '../../../components/student/sidebar/sidebar.component'
import Navbar from '../../../components/student/navbar/navbar.component'
import StudentFooter from '../../../components/student/footer/footer.component'
import EnrollmentOverview from '../../../components/student/enrollment-overview/enrollment-overview.component'
import EnrollmentTable from '../../../components/student/enrollment-table/enrollment-table.component'

const { Content } = Layout
const { Title } = Typography

const EnrollmentPage = ({ getStudentPayments, studentId }) => {
  useEffect(() => {
    if (studentId) {
      async function getPayments() {
        await getStudentPayments(studentId)
      }

      getPayments()
    }
  }, [studentId, getStudentPayments])

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar number={'1'} />
      <Layout className='site-layout'>
        <Navbar />
        <Content style={{ margin: '0 16px' }}>
          <div
            className='site-layout-background'
            style={{ padding: 20, minHeight: '85vh' }}
          >
            <Title level={2}>Overview</Title>
            <EnrollmentOverview />
            <div style={{ marginTop: 50 }}>
              <Title level={2}>List of Incoming Classes</Title>
              <EnrollmentTable />
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

export default connect(mapStateToProps, mapDispatchToProps)(EnrollmentPage)
