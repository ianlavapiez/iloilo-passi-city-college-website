import React from 'react'
import { Layout, Typography } from 'antd'

import Sidebar from '../../../components/admin/sidebar/sidebar.component'
import Navbar from '../../../components/admin/navbar/navbar.component'
import AdminFooter from '../../../components/admin/footer/footer.component'
import DashboardStatistics from '../../../components/admin/dashboard-statistics/dashboard-statistics.component'
import DashboardTable from '../../../components/admin/dashboard-table/dashboard-table.component'

const { Content } = Layout
const { Title } = Typography

const DashboardPage = () => {
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
            <DashboardStatistics />
            <div style={{ marginTop: 50 }}>
              <Title level={2}>List of Incoming Classes</Title>
              <DashboardTable />
            </div>
          </div>
        </Content>
        <AdminFooter />
      </Layout>
    </Layout>
  )
}

export default DashboardPage
