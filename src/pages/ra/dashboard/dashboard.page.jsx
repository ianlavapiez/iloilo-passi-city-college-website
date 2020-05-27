import React from 'react'
import { Layout, Typography } from 'antd'

import Sidebar from '../../../components/ra/sidebar/sidebar.component'
import Navbar from '../../../components/ra/navbar/navbar.component'
import RaFooter from '../../../components/ra/footer/footer.component'
import DashboardStatistics from '../../../components/ra/dashboard-statistics/dashboard-statistics.component'
import DashboardTable from '../../../components/ra/dashboard-table/dashboard-table.component'

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
        <RaFooter />
      </Layout>
    </Layout>
  )
}

export default DashboardPage
