import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'

const useStyles = makeStyles((theme) => ({
  gutter: {
    width: '14px',
    flexShrink: 0
  }
}))

const Gutter = () => {
  const classes = useStyles()
  
  return (
    <Box className={classes.gutter} />
  )
}

export default Gutter
