import React from 'react'
import { Layout, Breadcrumb, Typography } from 'antd'

import Sidebar from '../../../components/ra/sidebar/sidebar.component'
import Navbar from '../../../components/ra/navbar/navbar.component'
import RaFooter from '../../../components/ra/footer/footer.component'
import AttendanceTable from '../../../components/ra/attendance-table/attendance-table.component'
import AttendanceModal from '../../../components/ra/attendance-modal/attendance-modal.component'

const { Content } = Layout
const { Title } = Typography

const AttendancePage = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar number={'3'} />
      <Layout className='site-layout'>
        <Navbar />
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '40px 0px -20px 30px' }}>
            <Breadcrumb.Item>
              <Title level={3}>List of Recorded Attendance</Title>
            </Breadcrumb.Item>
          </Breadcrumb>
          <Content
            className='site-layout-background'
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <Layout style={{ marginBottom: '12px' }}>
              <AttendanceModal />
            </Layout>
            <AttendanceTable />
          </Content>
        </Layout>
        <RaFooter />
      </Layout>
    </Layout>
  )
}

export default AttendancePage
