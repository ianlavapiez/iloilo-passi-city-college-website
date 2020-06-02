import React from 'react'
import { Layout, Typography } from 'antd'

import Sidebar from '../../../components/student/sidebar/sidebar.component'
import Navbar from '../../../components/student/navbar/navbar.component'
import StudentFooter from '../../../components/student/footer/footer.component'
import ProfileForm from '../../../components/student/profile-form/profile-form.component'

const { Content } = Layout
const { Title } = Typography

const ProfilePage = () => {
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
            <Title style={{ marginBottom: 40 }} level={2}>
              User Profile
            </Title>
            <ProfileForm />
          </div>
        </Content>
        <StudentFooter />
      </Layout>
    </Layout>
  )
}

export default ProfilePage
