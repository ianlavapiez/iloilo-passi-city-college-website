import React, { Fragment } from 'react'
import { Switch, withRouter } from 'react-router-dom'

import './sass/main.scss'

import Routes from './routes'

import Navigation from './components/common/navigation/navigation.component'

const App = ({ history }) => {
  const { pathname } = history.location
  const publicLinks = [
    '/',
    '/programs',
    '/online-review',
    '/registration',
    '/about',
    '/contact',
  ]

  return (
    <Fragment>
      {publicLinks.includes(pathname) ? <Navigation /> : null}
      <Switch>
        <Routes />
      </Switch>
    </Fragment>
  )
}

export default withRouter(App)
