import React from 'react'
import { Layout } from 'antd'

import StudentListTable from '../student-list-table/student-list-table.component'

const { Content } = Layout

const StudentList = () => {
  return (
    <Content className='site-layout-background'>
      <Layout style={{ marginBottom: '12px' }}>
        <StudentListTable />
      </Layout>
    </Content>
  )
}

export default StudentList
