import React from 'react'
import { Layout, Breadcrumb, Typography, Row, Col } from 'antd'

import Sidebar from '../../../components/ra/sidebar/sidebar.component'
import Navbar from '../../../components/ra/navbar/navbar.component'
import RaFooter from '../../../components/ra/footer/footer.component'
import DispatchingTable from '../../../components/ra/dispatching-table/dispatching-table.component'
import DispatchingPaymentModal from '../../../components/ra/dispatching-payment-modal/dispatching-payment-modal.component'
import DispatchingScheduleModal from '../../../components/ra/dispatching-schedule-modal/dispatching-schedule-modal.component'

const { Content } = Layout
const { Title } = Typography

const DispatchingPage = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar number={'4'} />
      <Layout className='site-layout'>
        <Navbar />
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '40px 0px -20px 30px' }}>
            <Breadcrumb.Item>
              <Title level={3}>List of Dispatches</Title>
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
            <Layout style={{ marginBottom: '12px' }}>
              <Row>
                <Col span={3}>
                  <DispatchingPaymentModal />
                </Col>
                <Col span={3}>
                  <DispatchingScheduleModal />
                </Col>
              </Row>
            </Layout>
            <DispatchingTable />
          </Content>
        </Layout>
        <RaFooter />
      </Layout>
    </Layout>
  )
}

export default DispatchingPage
