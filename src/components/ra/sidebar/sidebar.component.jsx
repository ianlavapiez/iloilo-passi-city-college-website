import React from 'react'
import { Paper, MenuItem, MenuList, Typography } from '@material-ui/core'
import {
  DashboardRounded as DashboardRoundedIcon,
  AccountBalanceWalletRounded as AccountBalanceWalletRoundedIcon,
  CheckCircleRounded as CheckCircleRoundedIcon,
  LabelImportantRounded as LabelImportantRoundedIcon,
  PeopleRounded as PeopleRoundedIcon,
} from '@material-ui/icons'

import { useStyles } from './sidebar.styles'

const Sidebar = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <MenuList className={classes.menuList}>
          <MenuItem className={classes.menuItem}>
            <DashboardRoundedIcon />
            <Typography variant='inherit'>Dashboard</Typography>
          </MenuItem>
          <MenuItem className={classes.menuItem}>
            <AccountBalanceWalletRoundedIcon />
            Accounting
          </MenuItem>
          <MenuItem className={classes.menuItem}>
            <CheckCircleRoundedIcon />
            Attendance
          </MenuItem>
          <MenuItem className={classes.menuItem}>
            <LabelImportantRoundedIcon />
            Dispatching
          </MenuItem>
          <MenuItem className={classes.menuItem}>
            <PeopleRoundedIcon />
            Student Management
          </MenuItem>
        </MenuList>
      </Paper>
    </div>
  )
}

export default Sidebar
