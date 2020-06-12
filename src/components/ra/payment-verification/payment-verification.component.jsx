import React, { useState } from 'react'
import { Layout } from 'antd'

import PaymentVerificationModal from '../payment-verification-modal/payment-verification-modal.component'
import PaymentVerificationTable from '../payment-verification-table/payment-verification-table.component'

const { Content } = Layout

const PaymentVerification = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const [data, setData] = useState([])

  return (
    <Content className='site-layout-background'>
      <Layout style={{ marginBottom: '12px' }}>
        <PaymentVerificationModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          data={data}
        />
        <PaymentVerificationTable
          setModalVisible={setModalVisible}
          setData={setData}
        />
      </Layout>
    </Content>
  )
}

export default PaymentVerification
