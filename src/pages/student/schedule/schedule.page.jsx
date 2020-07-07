import React, { useEffect } from 'react'
import { Layout, Typography } from 'antd'
import { connect } from 'react-redux'

import { getStudentClasses } from '../../../redux/class/class.actions'
import { getStudentDetails } from '../../../redux/students/students.actions'

import Sidebar from '../../../components/student/sidebar/sidebar.component'
import Navbar from '../../../components/student/navbar/navbar.component'
import ScheduleTodayTable from '../../../components/student/schedule-today-table/schedule-today-table.component'
import ScheduleNextTable from '../../../components/student/schedule-next-table/schedule-next-table.component'

const { Content } = Layout
const { Title } = Typography

const SchedulePage = ({
  studentId,
  getStudentDetails,
  getStudentClasses,
  currentStudent,
}) => {
  useEffect(() => {
    if (studentId) {
      async function getDetails() {
        await getStudentDetails(studentId)
      }

      getDetails()
    }
  }, [studentId, getStudentDetails])

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
      <Sidebar number={'3'} />
      <Layout className='site-layout'>
        <Navbar />
        <Content style={{ margin: '0 16px' }}>
          <div className='site-layout-background' style={{ padding: 10 }}>
            <Title style={{ marginTop: 20, marginBottom: 30 }}>
              Schedule for Today
            </Title>
            <ScheduleTodayTable />
          </div>
        </Content>
        <Content style={{ margin: '0 16px' }}>
          <div
            className='site-layout-background'
            style={{ padding: 10, height: '60vh' }}
          >
            <Title style={{ marginTop: 20, marginBottom: 30 }}>
              Next Schedules
            </Title>
            <ScheduleNextTable />
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}

const mapStateToProps = (state) => {
  return {
    studentId: state.firebase.auth.uid,
    currentStudent: state.students.currentStudent,
  }
}

const mapDispatchToProps = {
  getStudentClasses,
  getStudentDetails,
}

export default connect(mapStateToProps, mapDispatchToProps)(SchedulePage)
