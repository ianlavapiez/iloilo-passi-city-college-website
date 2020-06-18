import React, { useEffect } from 'react'
import { Layout, Typography } from 'antd'
import { connect } from 'react-redux'

import { getStudents } from '../../../redux/students/students.actions'
import { getPayments } from '../../../redux/payments/payments.actions'
import { getRAClasses } from '../../../redux/class/class.actions'

import Sidebar from '../../../components/ra/sidebar/sidebar.component'
import Navbar from '../../../components/ra/navbar/navbar.component'
import RaFooter from '../../../components/ra/footer/footer.component'
import DashboardStatistics from '../../../components/ra/dashboard-statistics/dashboard-statistics.component'
import DashboardTable from '../../../components/ra/dashboard-table/dashboard-table.component'

const { Content } = Layout
const { Title } = Typography

const DashboardPage = ({ raId, getPayments, getStudents, getRAClasses }) => {
  useEffect(() => {
    getStudents()

    if (raId) {
      getPayments(raId)
      getRAClasses(raId)
    }
  }, [getStudents, getPayments, getRAClasses, raId])

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar number={'1'} />
      <Layout className='site-layout'>
        <Navbar />
        <Content style={{ margin: '0 16px' }}>
          <div
            className='site-layout-background'
            style={{ padding: 20, minHeight: '85vh' }}
          >
            <Title level={2}>Overview</Title>
            <DashboardStatistics />
            <div style={{ marginTop: 50 }}>
              <Title level={2}>List of Incoming Classes</Title>
              <DashboardTable />
            </div>
          </div>
        </Content>
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
  getStudents,
  getPayments,
  getRAClasses,
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage)
