import React from 'react'
import { Layout } from 'antd'

import Sidebar from '../../../components/student/sidebar/sidebar.component'
import Navbar from '../../../components/student/navbar/navbar.component'
import StudentFooter from '../../../components/student/footer/footer.component'

const { Content } = Layout

const ProfilePage = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar number={'4'} />
      <Layout className='site-layout'>
        <Navbar />
        <Content style={{ margin: '0 16px' }}>
          <div
            className='site-layout-background'
            style={{ padding: 20, minHeight: '85vh' }}
          >
            Profile Page
          </div>
        </Content>
        <StudentFooter />
      </Layout>
    </Layout>
  )
}

export default ProfilePage
