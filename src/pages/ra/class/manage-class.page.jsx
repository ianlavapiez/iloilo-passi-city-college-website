import React from 'react'
import { Layout, Breadcrumb, Typography } from 'antd'

import Sidebar from '../../../components/ra/sidebar/sidebar.component'
import Navbar from '../../../components/ra/navbar/navbar.component'
import RaFooter from '../../../components/ra/footer/footer.component'
import ManageAttendanceTable from '../../../components/ra/manage-attendance-table/manage-attendance-table.component'

const { Content } = Layout
const { Title } = Typography

const ManageAttendancePage = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar number={'3'} />
      <Layout className='site-layout'>
        <Navbar />
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '40px 0px -20px 30px' }}>
            <Breadcrumb.Item>
              <Title level={3}>List of Students</Title>
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
            <ManageAttendanceTable />
          </Content>
        </Layout>
        <RaFooter />
      </Layout>
    </Layout>
  )
}

export default ManageAttendancePage
