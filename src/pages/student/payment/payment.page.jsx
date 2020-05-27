import React from 'react'
import { Layout, Typography } from 'antd'

import Sidebar from '../../../components/student/sidebar/sidebar.component'
import Navbar from '../../../components/student/navbar/navbar.component'
import StudentFooter from '../../../components/student/footer/footer.component'
import StudentPaymentOverview from '../../../components/student/student-payment-overview/student-payment-overview.component'
import StudentPaymentModal from '../../../components/student/student-payment-modal/student-payment-modal.component'
import StudentPaymentTable from '../../../components/student/student-payment-table/student-payment-table.component'

const { Content } = Layout
const { Title } = Typography

const PaymentPage = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar number={'2'} />
      <Layout className='site-layout'>
        <Navbar />
        <Content style={{ margin: '0 16px' }}>
          <div
            className='site-layout-background'
            style={{ padding: 20, minHeight: '85vh' }}
          >
            <Title level={2}>Payment Overview</Title>
            <StudentPaymentOverview />
            <div style={{ marginTop: 50 }}>
              <Title level={2}>Payment Logs</Title>
              <div style={{ marginBottom: 15 }}>
                <StudentPaymentModal />
              </div>
              <StudentPaymentTable />
            </div>
          </div>
        </Content>
        <StudentFooter />
      </Layout>
    </Layout>
  )
}

export default PaymentPage
