import React from 'react'
import { Layout, Typography } from 'antd'

import Sidebar from '../../../components/student/sidebar/sidebar.component'
import Navbar from '../../../components/student/navbar/navbar.component'
import StudentCalendar from '../../../components/student/student-calendar/student-calendar.component'

const { Content } = Layout
const { Title } = Typography

const SchedulePage = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar number={'3'} />
      <Layout className='site-layout'>
        <Navbar />
        <Content style={{ margin: '0 16px' }}>
          <div
            className='site-layout-background'
            style={{ padding: 10, height: '60vh' }}
          >
            <Title style={{ marginTop: 20, marginBottom: 30 }}>
              Your Calendar
            </Title>
            <StudentCalendar />
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}

export default SchedulePage
