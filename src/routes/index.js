import React from 'react';
import { Route } from 'react-router-dom';
import AdminRoutes from './admin.routes';

import PublicRoutes from './public.routes';

const routes = () => (
  <Route>
    <PublicRoutes />
    <AdminRoutes />
  </Route>
);

export default routes;
