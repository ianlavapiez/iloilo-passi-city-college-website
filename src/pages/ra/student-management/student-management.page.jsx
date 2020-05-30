import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Layout, Breadcrumb, Typography, Tabs } from 'antd'
import { StickyContainer, Sticky } from 'react-sticky'
import { createStructuredSelector } from 'reselect'

import { fetchStudentStart } from '../../../redux/student/student.actions'
import { selectIsSuccessful } from '../../../redux/student/student.selectors'

import Sidebar from '../../../components/ra/sidebar/sidebar.component'
import Navbar from '../../../components/ra/navbar/navbar.component'
import RaFooter from '../../../components/ra/footer/footer.component'
import StudentVerification from '../../../components/ra/student-verification/student-verification.component'
import StudentList from '../../../components/ra/student-list/student-list.component'

const { TabPane } = Tabs
const { Content } = Layout
const { Title } = Typography

const renderTabBar = (props, DefaultTabBar) => (
  <Sticky bottomOffset={80}>
    {({ style }) => (
      <DefaultTabBar
        {...props}
        className='site-custom-tab-bar'
        style={{ ...style }}
      />
    )}
  </Sticky>
)

const StudentManagementPage = ({ fetchStudentStart, success }) => {
  useEffect(() => {
    fetchStudentStart()
  }, [fetchStudentStart])

  useEffect(() => {}, [success])

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar number={'4'} />
      <Layout className='site-layout'>
        <Navbar />
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '40px 0px -20px 30px' }}>
            <Breadcrumb.Item>
              <Title level={3}>Student Management</Title>
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
            <StickyContainer>
              <Tabs defaultActiveKey='1' renderTabBar={renderTabBar}>
                <TabPane
                  tab='List of Verified Students'
                  key='1'
                  style={{ height: '65vh' }}
                >
                  <StudentList />
                </TabPane>
                <TabPane
                  tab='Student Verification'
                  key='2'
                  style={{ height: '65vh' }}
                >
                  <StudentVerification />
                </TabPane>
              </Tabs>
            </StickyContainer>
          </Content>
        </Layout>
        <RaFooter />
      </Layout>
    </Layout>
  )
}

const mapStateToProps = createStructuredSelector({
  success: selectIsSuccessful,
})

const mapDispatchToProps = (dispatch) => ({
  fetchStudentStart: () => dispatch(fetchStudentStart()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentManagementPage)
