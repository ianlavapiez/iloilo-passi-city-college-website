import React from 'react'
import { Layout } from 'antd'

import PaymentManagementTable from '../payment-management-table/payment-management-table.component'
import PaymentManagementModal from '../payment-management-modal/payment-management-modal.component'

const { Content } = Layout

const PaymentManagement = () => {
  return (
    <Content className='site-layout-background' style={{ marginTop: 10 }}>
      <Layout style={{ marginBottom: '12px' }}>
        <PaymentManagementModal />
      </Layout>
      <PaymentManagementTable />
    </Content>
  )
}

export default PaymentManagement
