import React, { useEffect } from 'react'
import { Layout, Typography } from 'antd'
import { connect } from 'react-redux'

import { getClassesForAdmin } from '../../../redux/class/class.actions'
import { getAdminPayments } from '../../../redux/payments/payments.actions'
import { getStudents } from '../../../redux/students/students.actions'

import Sidebar from '../../../components/admin/sidebar/sidebar.component'
import Navbar from '../../../components/admin/navbar/navbar.component'
import AdminFooter from '../../../components/admin/footer/footer.component'
import DashboardStatistics from '../../../components/admin/dashboard-statistics/dashboard-statistics.component'
import DashboardTable from '../../../components/admin/dashboard-table/dashboard-table.component'

const { Content } = Layout
const { Title } = Typography

const DashboardPage = ({
  getClassesForAdmin,
  getAdminPayments,
  getStudents,
}) => {
  useEffect(() => {
    getClassesForAdmin()
    getAdminPayments()
    getStudents()
  }, [getClassesForAdmin, getAdminPayments, getStudents])

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
              <Title level={2}>List of Classes</Title>
              <DashboardTable />
            </div>
          </div>
        </Content>
        <AdminFooter />
      </Layout>
    </Layout>
  )
}

const mapDispatchToProps = {
  getClassesForAdmin,
  getAdminPayments,
  getStudents,
}

export default connect(null, mapDispatchToProps)(DashboardPage)
