import React, { useEffect } from 'react'
import { Switch, Route, Redirect, Router } from 'react-router-dom'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { checkUserSession } from './redux/user/user.actions'

import { selectCurrentUser } from './redux/user/user.selectors'

import Routes from './routes'

const App = ({ checkUserSession, currentUser }) => {
  useEffect(() => {
    checkUserSession()
  }, [checkUserSession])

  return (
    <Switch>
      <Routes />
    </Switch>
  )
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
})

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession()),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
