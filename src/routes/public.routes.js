import React from 'react'
import { Route } from 'react-router-dom'

import AboutPage from '../pages/public/about/about.page'
import ContactPage from '../pages/public/contact/contact.page'
import HomePage from '../pages/public/home/home.page'
import OnlineReviewPage from '../pages/public/online-review/online-review.page'
import PrivacyPolicyPage from '../pages/public/privacy-policy/privacy-policy.page'
import ProgramsPage from '../pages/public/programs/programs.page'
import RegistrationPage from '../pages/public/registration/registration.page'
import StoriesPage from '../pages/public/stories/stories.page'

const PublicRoutes = () => {
  return (
    <Route>
      <Route exact path='/' component={HomePage} />
      <Route exact path='/about' component={AboutPage} />
      <Route exact path='/contact' component={ContactPage} />
      <Route exact path='/online-review' component={OnlineReviewPage} />
      <Route exact path='/privacy-policy' component={PrivacyPolicyPage} />
      <Route exact path='/programs' component={ProgramsPage} />
      <Route exact path='/registration' component={RegistrationPage} />
      <Route exact path='/stories' component={StoriesPage} />
    </Route>
  )
}

export default PublicRoutes
