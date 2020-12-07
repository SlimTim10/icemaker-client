import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'

const outputTypeChoices = [
  {
    value: 'flagSolutions',
    label: 'with solution'
  },
  {
    value: 'flagAnswers',
    label: 'with answer'
  },
  {
    value: 'flagSolAns',
    label: 'with solution and answer'
  },
  {
    value: 'flagQuestions',
    label: 'questions only'
  },
]

const OutputTypeInput = ({ outputType, setOutputType }) => {
  const handleChange = event => {
    setOutputType(event.target.value)
  }

  const outputMenu = outputTypeChoices.map(option => (
    <MenuItem key={option.value} value={option.value}>
      {option.label}
    </MenuItem>
  ))
  
  return (
    <TextField
      id="select-output-type"
      select
      label="Output"
      value={outputType}
      onChange={handleChange}
      helperText=""
      >
      {outputMenu}
    </TextField>
  )
}

export default OutputTypeInput
