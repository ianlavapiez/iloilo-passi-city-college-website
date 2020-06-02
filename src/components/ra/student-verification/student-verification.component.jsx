import React from 'react'
import { Layout } from 'antd'

import StudentVerificationTable from '../student-verification-table/student-verification-table.component'

const { Content } = Layout

const StudentVerification = () => {
  return (
    <Content className='site-layout-background'>
      <Layout style={{ marginBottom: '12px' }}>
        <StudentVerificationTable />
      </Layout>
    </Content>
  )
}

export default StudentVerification
