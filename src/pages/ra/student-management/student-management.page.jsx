import React from 'react'
import { Layout } from 'antd'

import Sidebar from '../../../components/ra/sidebar/sidebar.component'
import Navbar from '../../../components/ra/navbar/navbar.component'
import RaFooter from '../../../components/ra/footer/footer.component'

const { Content } = Layout

const StudentManagementPage = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar number={'5'} />
      <Layout className='site-layout'>
        <Navbar />
        <Content style={{ margin: '0 16px' }}>
          <div
            className='site-layout-background'
            style={{ padding: 20, minHeight: '85vh' }}
          >
            Student Management Page
          </div>
        </Content>
        <RaFooter />
      </Layout>
    </Layout>
  )
}

export default StudentManagementPage
