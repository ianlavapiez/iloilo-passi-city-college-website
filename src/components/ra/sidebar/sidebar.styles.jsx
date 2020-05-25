import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '85vh',
  },
  paper: {
    marginRight: theme.spacing(2),
    borderTopRightRadius: '0px',
    borderTopLeftRadius: '0px',
    width: '230px',
  },
  menuList: {
    padding: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  menuItem: {
    marginLeft: '2px',
  },
}))
