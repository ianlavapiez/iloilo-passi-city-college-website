import React, { useState } from 'react'
import { Layout } from 'antd'

import PaymentManagementTable from '../payment-management-table/payment-management-table.component'
import PaymentManagementModal from '../payment-management-modal/payment-management-modal.component'
import SubPaymentModal from '../sub-payment-modal/sub-payment-modal.component'

const { Content } = Layout

const PaymentManagement = () => {
  const [edit, setEdit] = useState(false)
  const [data, setData] = useState({})
  const [modalVisible, setModalVisible] = useState(false)
  const [subModalVisible, setSubModalVisible] = useState(false)

  return (
    <Content className='site-layout-background' style={{ marginTop: 10 }}>
      <Layout
        style={{ marginBottom: '12px', display: 'flex', flexDirection: 'row' }}
      >
        <PaymentManagementModal
          edit={edit}
          data={data}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          setEdit={setEdit}
        />
        <SubPaymentModal
          data={data}
          setData={setData}
          subModalVisible={subModalVisible}
          setSubModalVisible={setSubModalVisible}
        />
      </Layout>
      <PaymentManagementTable
        setEdit={setEdit}
        setData={setData}
        setModalVisible={setModalVisible}
        setSubModalVisible={setSubModalVisible}
      />
    </Content>
  )
}

export default PaymentManagement
