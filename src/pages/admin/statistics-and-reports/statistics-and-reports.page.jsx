import React from 'react'
import { StickyContainer, Sticky } from 'react-sticky'
import { Layout, Breadcrumb, Typography, Tabs, Progress } from 'antd'

import Sidebar from '../../../components/admin/sidebar/sidebar.component'
import Navbar from '../../../components/admin/navbar/navbar.component'
import AdminFooter from '../../../components/admin/footer/footer.component'
import PaymentVerification from '../../../components/ra/payment-verification/payment-verification.component'

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

const StatisticsAndReportsPage = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar number={'2'} />
      <Layout className='site-layout'>
        <Navbar />
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '40px 0px -20px 30px' }}>
            <Breadcrumb.Item>
              <Title level={3}>Statistics and Reports</Title>
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
                <TabPane tab='Students' key='1' style={{ height: '65vh' }}>
                  <Title level={2}>Student Statistics and Reports</Title>
                  <Progress type='circle' percent={75} />
                  <Progress type='circle' percent={70} status='exception' />
                  <Progress type='circle' percent={100} />
                </TabPane>
                <TabPane tab='Payments' key='2' style={{ height: '65vh' }}>
                  <PaymentVerification />
                </TabPane>
              </Tabs>
            </StickyContainer>
          </Content>
        </Layout>
        <AdminFooter />
      </Layout>
    </Layout>
  )
}

export default StatisticsAndReportsPage
