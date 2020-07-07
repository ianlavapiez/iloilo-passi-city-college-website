import React, { useEffect } from 'react'
import { Layout, Typography } from 'antd'
import { connect } from 'react-redux'

import { getStudentPayments } from '../../../redux/payments/payments.actions'
import { getStudentClasses } from '../../../redux/class/class.actions'
import { getStudentDetails } from '../../../redux/students/students.actions'

import Sidebar from '../../../components/student/sidebar/sidebar.component'
import Navbar from '../../../components/student/navbar/navbar.component'
import StudentFooter from '../../../components/student/footer/footer.component'
import EnrollmentOverview from '../../../components/student/enrollment-overview/enrollment-overview.component'
import EnrollmentTable from '../../../components/student/enrollment-table/enrollment-table.component'

const { Content } = Layout
const { Title } = Typography

const EnrollmentPage = ({
  getStudentPayments,
  studentId,
  getStudentDetails,
  getStudentClasses,
  currentStudent,
}) => {
  useEffect(() => {
    if (studentId) {
      async function getPaymentsAndStudentDetails() {
        await getStudentPayments(studentId)
        await getStudentDetails(studentId)
      }

      getPaymentsAndStudentDetails()
    }
  }, [studentId, getStudentPayments, getStudentDetails])

  useEffect(() => {
    if (currentStudent) {
      if (currentStudent[0]) {
        const { course, program, category } = currentStudent[0]

        getStudentClasses(course, program, category)
      }
    }
  }, [currentStudent, getStudentClasses])

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
    currentStudent: state.students.currentStudent,
  }
}

const mapDispatchToProps = {
  getStudentPayments,
  getStudentClasses,
  getStudentDetails,
}

export default connect(mapStateToProps, mapDispatchToProps)(EnrollmentPage)
