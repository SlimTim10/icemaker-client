import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'

const useStyles = makeStyles((theme) => ({
  body: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  upper: {
    borderBottom: '1px solid black',
    flex: '1 1 0',
    overflowY: 'auto'
  },
  lower: {
    flex: '1 1 0',
    overflowY: 'auto'
  }
}))

const ErrorLog = ({ errorIcemaker, errorLatex }) => {
  const classes = useStyles()
  
  return (
    <Box className={classes.body}>
      <Box className={classes.upper}>
        {errorIcemaker}
      </Box>
      <Box className={classes.lower}>
        {errorLatex}
      </Box>
    </Box>
  )
}

export default ErrorLog
