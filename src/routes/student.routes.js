import React from 'react'
import { Route } from 'react-router-dom'

import EnrollmentPage from '../pages/student/enrollment/enrollment.page'
import LoginPage from '../pages/student/login/login.page'
import PaymentPage from '../pages/student/payment/payment.page'
import SchedulePage from '../pages/student/schedule/schedule.page'

const StudentRoutes = () => {
  return (
    <Route>
      <Route exact path='/student' component={EnrollmentPage} />
      <Route exact path='/student/login' component={LoginPage} />
      <Route exact path='/student/payment' component={PaymentPage} />
      <Route exact path='/student/schedule' component={SchedulePage} />
    </Route>
  )
}

export default StudentRoutes
