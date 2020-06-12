import React, { useEffect } from 'react'
import { Layout, Typography } from 'antd'
import { connect } from 'react-redux'

import { getUserDetails } from '../../../redux/auth/auth.actions'

import Sidebar from '../../../components/student/sidebar/sidebar.component'
import Navbar from '../../../components/student/navbar/navbar.component'
import StudentFooter from '../../../components/student/footer/footer.component'
import ProfileForm from '../../../components/student/profile-form/profile-form.component'

const { Content } = Layout
const { Title } = Typography

const ProfilePage = ({ getUserDetails, studentId }) => {
  useEffect(() => {
    if (studentId) {
      getUserDetails(studentId)
    }
  }, [getUserDetails, studentId])

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

const mapStateToProps = (state) => {
  return {
    studentId: state.firebase.auth.uid,
  }
}

const mapDispatchToProps = {
  getUserDetails,
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)
