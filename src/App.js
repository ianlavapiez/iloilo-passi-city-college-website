import React, { Fragment, Suspense } from 'react'
import { Switch, withRouter } from 'react-router-dom'

import './sass/main.scss'

import Routes from './routes'

import Navigation from './components/common/navigation/navigation.component'
import ErrorBoundary from './components/common/error-boundary/error-boundary.component'
import Spinner from './components/common/spinner/spinner.component'

const App = ({ history }) => {
  const { pathname } = history.location
  const publicLinks = ['/', '/courses', '/events', '/facilities']

  return (
    <Fragment>
      {publicLinks.includes(pathname) ? <Navigation /> : null}
      <Switch>
        <ErrorBoundary>
          <Suspense fallback={<Spinner />}>
            <Routes />
          </Suspense>
        </ErrorBoundary>
      </Switch>
    </Fragment>
  )
}

export default withRouter(App)
