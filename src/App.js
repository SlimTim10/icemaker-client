import React, { useEffect, useState } from 'react'
import axios from 'axios'
// import { last } from 'ramda'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import './App.css'

export default function App() {
  const [ascFile, setAscFile] = useState('')
  const [prbFile, setPrbFile] = useState('')
  
  useEffect(() => {
    console.log('Request...')
    axios.get('http://192.168.1.45:3005/uploadasc', {
      method: 'post',
      body: {},
      crossDomain: true
    }).then(res => console.log('response:', res))
  }, [])

  const extractFilename = path => {
    if (path.substr(0, 12) === "C:\\fakepath\\")
      return path.substr(12) // modern browser
    let x
    x = path.lastIndexOf('/')
    if (x >= 0) // Unix-based path
      return path.substr(x+1)
    x = path.lastIndexOf('\\')
    if (x >= 0) // Windows-based path
      return path.substr(x+1)
    return path // just the file name
  }

  const handleChangeAscFile = e => {
    const filePath = e.target.value
    setAscFile(extractFilename(filePath))
  }

  const handleChangePrbFile = e => {
    const filePath = e.target.value
    setPrbFile(extractFilename(filePath))
  }
  
  return (
    <React.Fragment>
      <CssBaseline />
      <Container fixed>
        <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '100vh' }}>

          <div>
            <input
              accept="*"
              id="asc-file"
              type="file"
              onChange={handleChangeAscFile}
              />
            <label htmlFor="asc-file">
              <Button variant="contained" color="primary" component="span">
                Upload ASC
              </Button>
            </label>
            <span>{ascFile}</span>
          </div>

          <div>
            <input
              accept="*"
              id="prb-file"
              type="file"
              onChange={handleChangePrbFile}
              />
            <label htmlFor="prb-file">
              <Button variant="contained" color="primary" component="span">
                Upload PRB
              </Button>
            </label>
            <span>{prbFile}</span>
          </div>
          
        </Typography>
      </Container>
    </React.Fragment>
  )
}
