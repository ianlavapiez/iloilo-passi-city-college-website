import React from 'react'
import { Layout } from 'antd'

import Sidebar from '../../../components/admin/sidebar/sidebar.component'
import Navbar from '../../../components/admin/navbar/navbar.component'
import AdminFooter from '../../../components/admin/footer/footer.component'

const { Content } = Layout

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
            Admin Dashboard Page
          </div>
        </Content>
        <AdminFooter />
      </Layout>
    </Layout>
  )
}

export default DashboardPage
