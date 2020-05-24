import React, { useEffect, Fragment } from 'react'
import { Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import './sass/main.scss'

import { checkUserSession } from './redux/user/user.actions'

import { selectCurrentUser } from './redux/user/user.selectors'

import Routes from './routes'

import Navigation from './components/common/navigation/navigation.component'

const App = ({ checkUserSession, currentUser }) => {
  useEffect(() => {
    checkUserSession()
  }, [checkUserSession])

  return (
    <Fragment>
      <Navigation />
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

export default connect(mapStateToProps, mapDispatchToProps)(App)
