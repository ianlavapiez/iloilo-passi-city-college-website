import React, { useState, useEffect } from 'react'
import { Layout, Typography, Button, Breadcrumb } from 'antd'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { getStudentPayments } from '../../../redux/payments/payments.actions'

import Sidebar from '../../../components/student/sidebar/sidebar.component'
import Navbar from '../../../components/student/navbar/navbar.component'
import StudentFooter from '../../../components/student/footer/footer.component'
import StudentPaymentInfoTable from '../../../components/student/student-payment-info-table/student-payment-info-table.component'
import StudentPaymentInfoModal from '../../../components/student/student-payment-info-modal/student-payment-info-modal.component'

const { Content } = Layout
const { Title } = Typography

const PaymentDetailsPage = ({ history, getStudentPayments, studentId }) => {
  const [data, setData] = useState([])
  const [modalVisible, setModalVisible] = useState(false)

  useEffect(() => {
    if (studentId) {
      async function getPayments() {
        await getStudentPayments(studentId)
      }

      getPayments()
    }
  }, [studentId, getStudentPayments])

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
            <StudentPaymentInfoModal
              data={data}
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
            />
            <StudentPaymentInfoTable
              setData={setData}
              setModalVisible={setModalVisible}
            />
            <Button
              onClick={() => history.push('/student/payments')}
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
        <StudentFooter />
      </Layout>
    </Layout>
  )
}

const mapStateToProps = (state) => {
  return {
    studentId: state.firebase.auth.uid,
  }
}

const mapDispatchToProps = {
  getStudentPayments,
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PaymentDetailsPage)
)
