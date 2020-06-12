import React, { useEffect } from 'react'
import { Tabs } from 'antd'
import { StickyContainer, Sticky } from 'react-sticky'
import { Layout, Breadcrumb, Typography } from 'antd'
import { connect } from 'react-redux'

import {
  getPayments,
  getUnverifiedPaymentTrail,
} from '../../../redux/payments/payments.actions'

import Sidebar from '../../../components/ra/sidebar/sidebar.component'
import Navbar from '../../../components/ra/navbar/navbar.component'
import RaFooter from '../../../components/ra/footer/footer.component'
import PaymentManagement from '../../../components/ra/payment-management/payment-management.component'
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

const AccountingPage = ({ raId, getPayments, getUnverifiedPaymentTrail }) => {
  useEffect(() => {
    if (raId) {
      getPayments(raId)
      getUnverifiedPaymentTrail(raId)
    }
  }, [raId, getPayments, getUnverifiedPaymentTrail])

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar number={'2'} />
      <Layout className='site-layout'>
        <Navbar />
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '40px 0px -20px 30px' }}>
            <Breadcrumb.Item>
              <Title level={3}>Accounting Management</Title>
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
                  tab='Payment Management'
                  key='1'
                  style={{ height: '65vh' }}
                >
                  <PaymentManagement />
                </TabPane>
                <TabPane
                  tab='Payment Verification'
                  key='2'
                  style={{ height: '65vh' }}
                >
                  <PaymentVerification />
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

const mapStateToProps = (state) => {
  return {
    raId: state.firebase.auth.uid,
  }
}

const mapDispatchToProps = {
  getPayments,
  getUnverifiedPaymentTrail,
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountingPage)
