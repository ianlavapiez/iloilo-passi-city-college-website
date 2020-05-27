import React from 'react'
import { Layout, Breadcrumb } from 'antd'

import Sidebar from '../../../components/ra/sidebar/sidebar.component'
import Navbar from '../../../components/ra/navbar/navbar.component'
import RaFooter from '../../../components/ra/footer/footer.component'
import StudentTable from '../../../components/ra/student-table/student-table.component'
import StudentModal from '../../../components/ra/student-modal/student-modal.component'

const { Content } = Layout

const StudentManagementPage = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar number={'5'} />
      <Layout className='site-layout'>
        <Navbar />
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '50px 0px 0px 30px' }}>
            <Breadcrumb.Item>List of Students</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            className='site-layout-background'
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <StudentModal />
            <StudentTable />
          </Content>
        </Layout>
        {/* <Content style={{ margin: '0 16px' }}>
          <div
            className='site-layout-background'
            style={{ padding: 20, minHeight: '85vh' }}
          >
            Student Management Page
          </div>
        </Content> */}
        <RaFooter />
      </Layout>
    </Layout>
  )
}

export default StudentManagementPage
