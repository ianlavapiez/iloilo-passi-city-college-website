import React from 'react'
import PropTypes from 'prop-types'
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core'
// core components
import tableStyles from './table.styles'

const useStyles = makeStyles(tableStyles)

export default function CustomTable(props) {
  const classes = useStyles()
  const { tableHead, tableData, tableHeaderColor } = props
  return (
    <div className={classes.tableResponsive}>
      <Table className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor + 'TableHeader']}>
            <TableRow className={classes.tableHeadRow}>
              {tableHead.map((prop, key) => {
                return (
                  <TableCell
                    className={classes.tableCell + ' ' + classes.tableHeadCell}
                    key={key}
                  >
                    {prop}
                  </TableCell>
                )
              })}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          {tableData.map((prop, key) => {
            return (
              <TableRow key={key} className={classes.tableBodyRow}>
                {prop.map((prop, key) => {
                  return (
                    <TableCell className={classes.tableCell} key={key}>
                      {prop}
                    </TableCell>
                  )
                })}
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}

CustomTable.defaultProps = {
  tableHeaderColor: 'gray',
}

CustomTable.propTypes = {
  tableHeaderColor: PropTypes.oneOf([
    'warning',
    'primary',
    'danger',
    'success',
    'info',
    'rose',
    'gray',
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
}
