import React from 'react'
import { Layout, Breadcrumb, Typography, Button } from 'antd'
import { withRouter } from 'react-router-dom'

import Sidebar from '../../../components/ra/sidebar/sidebar.component'
import Navbar from '../../../components/ra/navbar/navbar.component'
import RaFooter from '../../../components/ra/footer/footer.component'
import PaymentManagementInfoTable from '../../../components/ra/payment-management-info-table/payment-management-info-table.component'

const { Content } = Layout
const { Title } = Typography

const AccountingDetailsPage = ({ history }) => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar number={'2'} />
      <Layout className='site-layout'>
        <Navbar />
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb
            style={{ margin: '40px 0px -20px 30px', display: 'inline-block' }}
          >
            <Breadcrumb.Item>
              <Title level={3}>Payment Trail Details</Title>
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
            <PaymentManagementInfoTable />
            <Button
              onClick={() => history.push('/ra/accounting')}
              style={{
                borderRadius: 5,
                backgroundColor: '#f97204',
                border: 'none',
                marginTop: 10,
              }}
              type='primary'
            >
              Go Back
            </Button>
          </Content>
        </Layout>
        <RaFooter />
      </Layout>
    </Layout>
  )
}

export default withRouter(AccountingDetailsPage)
