import React from './node_modules/react'
import PropTypes from './node_modules/prop-types'
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
// core components
import typographyStyles from '../typography.styles'

const useStyles = makeStyles(typographyStyles)

export default function Quote(props) {
  const classes = useStyles()
  const { text, author } = props
  return (
    <blockquote className={classes.defaultFontStyle + ' ' + classes.quote}>
      <p className={classes.quoteText}>{text}</p>
      <small className={classes.quoteAuthor}>{author}</small>
    </blockquote>
  )
}

Quote.propTypes = {
  text: PropTypes.node,
  author: PropTypes.node,
}
