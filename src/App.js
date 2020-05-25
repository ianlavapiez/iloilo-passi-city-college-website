import React, { useEffect, Fragment } from 'react'
import { Switch, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import './sass/main.scss'

import { checkUserSession } from './redux/user/user.actions'

import { selectCurrentUser } from './redux/user/user.selectors'

import Routes from './routes'

import Navigation from './components/common/navigation/navigation.component'

const App = ({ checkUserSession, currentUser, history }) => {
  useEffect(() => {
    checkUserSession()
  }, [checkUserSession])

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

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
})

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession()),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
