import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

import RandomInput from './RandomInput'
import OutputTypeInput from './OutputTypeInput'
import Drawings from './Drawings'

const useStyles = makeStyles((theme) => ({
  header: {
    borderBottom: '1px solid black'
  },
}))

const Options = ({
  compile,
  randomFlag,
  setRandomFlag,
  outputType,
  setOutputType,
  drawings,
  setDrawings
}) => {
  const classes = useStyles()
  
  return (
    <>
      <Typography
        className={classes.header}
        variant="h5"
      >
        Options
      </Typography>
      <Box display="flex" flexDirection="column" px={1}>
        <RandomInput {...{randomFlag, setRandomFlag}} />
        <Box mt={2}>
          <OutputTypeInput {...{outputType, setOutputType}} />
        </Box>
        <Box mt={4}>
          <Drawings {...{drawings, setDrawings}} />
        </Box>
      </Box>
    </>
  )
}

export default Options
