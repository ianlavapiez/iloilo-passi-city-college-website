import React from 'react'
import { Route } from 'react-router-dom'

import DashboardPage from '../pages/admin/dashboard/dashboard.page'
import LoginPage from '../pages/admin/login/login.page'
import StatisticsAndReportsPage from '../pages/admin/statistics-and-reports/statistics-and-reports.page'

const AdminRoutes = () => {
  return (
    <Route>
      <Route exact path='/admin' component={DashboardPage} />
      <Route exact path='/admin/login' component={LoginPage} />
      <Route
        exact
        path='/admin/statistics-and-reports'
        component={StatisticsAndReportsPage}
      />
    </Route>
  )
}

export default AdminRoutes
