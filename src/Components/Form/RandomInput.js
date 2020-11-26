import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'

const RandomInput = ({ randomFlag, setRandomFlag }) => {
  const handleChange = event => {
    setRandomFlag(event.target.checked)
  }
  
  return (
    <FormControlLabel
      control={
          <Checkbox
              checked={randomFlag}
              onChange={handleChange}
              name="random-flag"
              color="primary"
              />
          }
          label="Random flag"
          />
  )
}

export default RandomInput
