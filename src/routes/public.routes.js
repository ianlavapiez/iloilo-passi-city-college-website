import React from 'react';
import { Route } from 'react-router-dom';

import EventsPage from '../pages/public/events/events.page';
import FacilitiesPage from '../pages/public/facilities/facilities.page';
import HomePage from '../pages/public/home/home.page';
import ProgramsPage from '../pages/public/programs/programs.page';
import LoginPage from '../pages/admin/login/login.page';

const PublicRoutes = () => {
  return (
    <Route>
      <Route exact path='/' component={HomePage} />
      <Route exact path='/facilities' component={FacilitiesPage} />
      <Route exact path='/events' component={EventsPage} />
      <Route exact path='/courses' component={ProgramsPage} />
      <Route exact path='/admin/login' component={LoginPage} />
    </Route>
  );
};

export default PublicRoutes;
