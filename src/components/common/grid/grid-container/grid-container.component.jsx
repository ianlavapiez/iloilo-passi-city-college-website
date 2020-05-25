import React from 'react'
// nodejs library to set properties for components
import PropTypes from 'prop-types'
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'

import gridContainerStyles from './grid-container.styles'

const useStyles = makeStyles(gridContainerStyles)

export default function GridContainer(props) {
  const classes = useStyles()
  const { children, ...rest } = props
  return (
    <Grid container {...rest} className={classes.grid}>
      {children}
    </Grid>
  )
}

GridContainer.propTypes = {
  children: PropTypes.node,
}
