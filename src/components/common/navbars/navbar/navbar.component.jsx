import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Hidden, IconButton, Toolbar } from '@material-ui/core'
// @material-ui/icons
import { Menu } from '@material-ui/icons'
// core components
import AdminNavbarLinks from '../admin-navbar-links/admin-navbar-links.component'
import RTLNavbarLinks from '../rtl-navbar-links/rtl-navbar-links.component'
import Button from '../../buttons/button.component'

import navbarStyles from './navbar.styles'

const useStyles = makeStyles(navbarStyles)

export default function Header(props) {
  const classes = useStyles()
  function makeBrand() {
    var name
    props.routes.map((prop) => {
      if (window.location.href.indexOf(prop.layout + prop.path) !== -1) {
        name = props.rtlActive ? prop.rtlName : prop.name
      }
      return null
    })
    return name
  }
  const { color } = props
  const appBarClasses = classNames({
    [' ' + classes[color]]: color,
  })
  return (
    <AppBar className={classes.appBar + appBarClasses}>
      <Toolbar className={classes.container}>
        <div className={classes.flex}>
          {/* Here we create navbar brand, based on route name */}
          <Button color='transparent' href='#' className={classes.title}>
            {makeBrand()}
          </Button>
        </div>
        <Hidden smDown implementation='css'>
          {props.rtlActive ? <RTLNavbarLinks /> : <AdminNavbarLinks />}
        </Hidden>
        <Hidden mdUp implementation='css'>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={props.handleDrawerToggle}
          >
            <Menu />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  )
}

Header.propTypes = {
  color: PropTypes.oneOf(['primary', 'info', 'success', 'warning', 'danger']),
  rtlActive: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  routes: PropTypes.arrayOf(PropTypes.object),
}
