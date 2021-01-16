import React from 'react';
import { Route } from 'react-router-dom';
import CoursePage from '../pages/admin/course/course.page';
import EventsPage from '../pages/admin/events/events.page';
import FacilitiesPage from '../pages/admin/facilities/facilities.page';

const AdminRoutes = () => {
  return (
    <Route>
      <Route exact path='/admin/courses' component={CoursePage} />
      <Route exact path='/admin/events' component={EventsPage} />
      <Route exact path='/admin/facilities' component={FacilitiesPage} />
    </Route>
  );
};

export default AdminRoutes;
