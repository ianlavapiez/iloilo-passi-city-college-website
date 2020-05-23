import React from 'react'
import { Route } from 'react-router-dom'

import AdminRoutes from './admin.routes'
import PublicRoutes from './public.routes'
import RARoutes from './ra.routes'
import StudentRoutes from './student.routes'

const routes = () => (
  <Route>
    <PublicRoutes />
    <AdminRoutes />
    <RARoutes />
    <StudentRoutes />
  </Route>
)

export default routes
