import React from 'react'
import { Route } from 'react-router-dom'

import AccountingPage from '../pages/ra/accounting/accounting.page'
import AccountingDetailsPage from '../pages/ra/accounting/accounting-details.page'
import ClassPage from '../pages/ra/class/class.page'
import ManageClassPage from '../pages/ra/class/manage-class.page'
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
      <Route
        exact
        path='/ra/accounting/:id'
        component={AccountingDetailsPage}
      />
      <Route exact path='/ra/class' component={ClassPage} />
      <Route exact path='/ra/manage-class/' component={ManageClassPage} />
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
