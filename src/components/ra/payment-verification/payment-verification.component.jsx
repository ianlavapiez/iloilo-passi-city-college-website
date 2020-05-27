import React from 'react'
import { Layout } from 'antd'

import PaymentVerificationTable from '../payment-verification-table/payment-verification-table.component'

const { Content } = Layout

const PaymentVerification = () => {
  return (
    <Content className='site-layout-background'>
      <Layout style={{ marginBottom: '12px' }}>
        <PaymentVerificationTable />
      </Layout>
    </Content>
  )
}

export default PaymentVerification
