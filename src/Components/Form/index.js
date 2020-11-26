import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'

import FileInput from './FileInput'
import RandomInput from './RandomInput'
import OutputTypeInput from './OutputTypeInput'

const useStyles = makeStyles((theme) => ({
  options: {
    display: 'flex',
    justifyContent: 'space-around'
  },
  submit: {
    display: 'flex',
    justifyContent: 'center'
  }
}))

const Form = ({ submitForm }) => {
  const classes = useStyles()
  
  const [files, setFiles] = useState([])
  const [randomFlag, setRandomFlag] = useState(false)
  const [outputType, setOutputType] = useState('flagSolutions')

  const handleSubmit = event => {
    event.preventDefault()
    submitForm({
      files,
      randomFlag,
      outputType
    })
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <FileInput {...{files, setFiles}} />

      <Box className={classes.options} p={3}>
        <RandomInput {...{randomFlag, setRandomFlag}} />
        <OutputTypeInput {...{outputType, setOutputType}} />
      </Box>

      <Box className={classes.submit}>
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </Box>

    </form>
  )
}

export default Form
