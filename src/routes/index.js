import React from 'react'
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'

import AdminRoutes from './admin.routes'
import PublicRoutes from './public.routes'
import RARoutes from './ra.routes'
import StudentRoutes from './student.routes'

const history = createBrowserHistory()

const routes = () => (
  <Router history={history}>
    <PublicRoutes />
    <AdminRoutes />
    <RARoutes />
    <StudentRoutes />
  </Router>
)

export default routes
