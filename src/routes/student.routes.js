import React from 'react'
import { Route } from 'react-router-dom'

import EnrollmentPage from '../pages/student/enrollment/enrollment.page'
import LoginPage from '../pages/student/login/login.page'
import PaymentPage from '../pages/student/payment/payment.page'
import SchedulePage from '../pages/student/schedule/schedule.page'
import TutorialPage from '../pages/student/tutorial/tutorial.page'
import ProfilePage from '../pages/student/profile/profile.page'

const StudentRoutes = () => {
  return (
    <Route>
      <Route exact path='/student' component={EnrollmentPage} />
      <Route exact path='/student/login' component={LoginPage} />
      <Route exact path='/student/payments' component={PaymentPage} />
      <Route exact path='/student/schedule' component={SchedulePage} />
      <Route exact path='/student/tutorials' component={TutorialPage} />
      <Route exact path='/student/profile' component={ProfilePage} />
    </Route>
  )
}

export default StudentRoutes
