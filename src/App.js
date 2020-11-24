import React, { useState } from 'react'
import axios from 'axios'
// import { last } from 'ramda'
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import Box from '@material-ui/core/Box'

import './App.css'

const useStyles = makeStyles((theme) => ({
  fileList: {
    overflow: 'auto',
    maxHeight: 300,
    backgroundColor: theme.palette.background.paper
  },
  options: {
    display: 'flex',
    justifyContent: 'space-around'
  },
  submit: {
    display: 'flex',
    justifyContent: 'center'
  }
}))

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

export default function App() {
  const classes = useStyles()
  
  const [files, setFiles] = useState([])
  const [randomFlag, setRandomFlag] = useState(false)
  const [outputType, setOutputType] = useState('flagSolutions')

  const handleSubmit = event => {
    event.preventDefault();

    const formData = new FormData();
    [...files].forEach(x => formData.append('multiplefiles', x))
    formData.append('random', randomFlag)
    formData.append('outFlag', outputType)
    formData.append('submit1', 'putDatabase') // temporary

    axios.post('/uploadprb', formData, {
      headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Content-Type': 'multipart/form-data'
      },
      crossDomain: true // needed?
    }).then(response => {
      console.log('response:', response)
      console.log('data:', response.data)
    })
  }

  const handleChangeFile = event => {
    if (![...event.target.files].some(file => files.find(x => x.name === file.name))) {
      setFiles(prev => [...prev, ...event.target.files])
    }
  }

  const handleChangeRandomFlag = event => {
    setRandomFlag(event.target.checked)
  }

  const handleChangeOutputType = event => {
    setOutputType(event.target.value)
  }

  const outputMenu = outputTypeChoices.map((option) => (
    <MenuItem key={option.value} value={option.value}>
      {option.label}
    </MenuItem>
  ))

  const handleFileDelete = file => event => {
    setFiles(prev => [...prev].filter(x => x.name !== file.name))
  }

  const createFileElement = file => {
    return (
      <ListItem key={file.name}>
        <ListItemText
          primary={file.name}
          />
        <ListItemSecondaryAction onClick={handleFileDelete(file)}>
          <IconButton edge="end" aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    )
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Container fixed>
        <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '100vh' }}>

          <form onSubmit={handleSubmit}>
            <div>
              <input
                accept="*"
                id="upload-file"
                type="file"
                multiple
                onChange={handleChangeFile}
                />
              <label htmlFor="upload-file">
                <Button variant="contained" color="primary" component="span">
                  Attach
                </Button>
              </label>
              <Box component="span" m={1}>{files.length === 0 ? 'No files attached' : ''}</Box>
            </div>

            {files.length > 0 && <List className={classes.fileList}>{files.map(createFileElement)}</List>}

            <Box className={classes.options} p={3}>
              <FormControlLabel
                control={
                    <Checkbox
                        checked={randomFlag}
                        onChange={handleChangeRandomFlag}
                        name="random-flag"
                        color="primary"
                        />
                    }
                    label="Random flag"
                    />

              <TextField
                id="select-output-type"
                select
                label="Output"
                value={outputType}
                onChange={handleChangeOutputType}
                helperText="Please select output type"
                >
                {outputMenu}
              </TextField>
            </Box>

            <Box className={classes.submit}>
              <Button variant="contained" color="primary" type="submit">
                Submit
              </Button>
            </Box>

    </form>
          
        </Typography>
      </Container>
    </React.Fragment>
  )
}
