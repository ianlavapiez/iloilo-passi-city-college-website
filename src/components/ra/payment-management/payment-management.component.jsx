import React, { useState } from 'react'
import { Layout } from 'antd'

import PaymentManagementTable from '../payment-management-table/payment-management-table.component'
import PaymentManagementModal from '../payment-management-modal/payment-management-modal.component'

const { Content } = Layout

const PaymentManagement = () => {
  const [edit, setEdit] = useState(false)
  const [data, setData] = useState('')
  const [modalVisible, setModalVisible] = useState(false)

  return (
    <Content className='site-layout-background' style={{ marginTop: 10 }}>
      <Layout style={{ marginBottom: '12px' }}>
        <PaymentManagementModal
          edit={edit}
          data={data}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          setEdit={setEdit}
        />
      </Layout>
      <PaymentManagementTable
        setEdit={setEdit}
        setData={setData}
        setModalVisible={setModalVisible}
      />
    </Content>
  )
}

export default PaymentManagement
