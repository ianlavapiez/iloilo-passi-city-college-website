import React from 'react'
import { Route } from 'react-router-dom'

import AccountingPage from '../pages/ra/accounting/accounting.page'
import AttendancePage from '../pages/ra/attendance/attendance.page'
import ManageAttendancePage from '../pages/ra/attendance/manage-attendance.page'
import DashboardPage from '../pages/ra/dashboard/dashboard.page'
import DispatchingPage from '../pages/ra/dispatching/dispatching.page'
import LoginPage from '../pages/ra/login/login.page'
import StudentManagementPage from '../pages/ra/student-management/student-management.page'

const RARoutes = () => {
  return (
    <Route>
      <Route exact path='/ra/login' component={LoginPage} />
      <Route exact path='/ra' component={DashboardPage} />
      <Route exact path='/ra/accounting' component={AccountingPage} />
      <Route exact path='/ra/attendance' component={AttendancePage} />
      <Route
        exact
        path='/ra/manage-attendance/'
        component={ManageAttendancePage}
      />
      <Route exact path='/ra/dispatching' component={DispatchingPage} />
      <Route exact path='/ra/login' component={LoginPage} />
      <Route
        exact
        path='/ra/student-management'
        component={StudentManagementPage}
      />
      <Route exact path='/ra/dispatching' component={DispatchingPage} />
    </Route>
  )
}

export default RARoutes
