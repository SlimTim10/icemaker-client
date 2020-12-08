import React, { useState } from 'react'
import axios from 'axios'
// import { last } from 'ramda'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'

import Gutter from './Components/Gutter'
import Options from './Components/Options'
import Main from './Components/Main'

import './App.css'

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    height: '100vh',
    padding: 0,
  },
  options: {
    width: '300px',
    borderRight: '1px solid black'
  },
  main: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    borderLeft: '1px solid black'
  }
}))

const App = () => {
  const classes = useStyles()

  const [drawings, setDrawings] = useState([])
  const [randomFlag, setRandomFlag] = useState(false)
  const [outputType, setOutputType] = useState('flagSolutions')
  
  const [pdfData, setPdfData] = useState(null)
  const [documentName, setDocumentName] = useState('untitled')
  const [isLoading, setIsLoading] = useState(false)
  const [compileButtonText, setCompileButtonText] = useState('Compile')
  const [pdfPlaceholder, setPdfPlaceholder] = useState('Press compile to view PDF')
  const [editorContent, setEditorContent] = useState('')

  const compile = async () => {
    setIsLoading(true)
    setCompileButtonText('Compiling...')
    
    const formData = new FormData();
    [...drawings].forEach(x => formData.append('multiplefiles', x))
    formData.append('prbText', editorContent)
    formData.append('prbName', documentName)
    formData.append('random', randomFlag)
    formData.append('outFlag', outputType)
    formData.append('submit1', 'putDatabase') // temporary

    try {
      const response = await axios.post('/uploadprb', formData, {
        headers: {
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Content-Type': 'multipart/form-data'
        }
      })
      console.log('response:', response) // tmp
      console.log('data:', response.data)  // tmp
      if (!response.data) return;
      // Error handling?
      setPdfData(response.data.PdfContent)
      setIsLoading(false)
      setCompileButtonText('Recompile')
      
      // Show in this order:
      // setErrorIcemaker(response.data.ErrorIcemaker)
      // setErrorLatex(response.data.ErrorLatex)
    } catch (e) {
      console.error(e)
      setIsLoading(false)
      setPdfPlaceholder('Error! Is the server down?')
      setCompileButtonText('Compile')
    }
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth={false} className={classes.container}>

        <Box className={classes.options}>
          <Options
            {...{
              compile,
              randomFlag,
              setRandomFlag,
              outputType,
              setOutputType,
              drawings,
              setDrawings
            }}
          />
        </Box>

        <Gutter />

        <Box className={classes.main}>
          <Main
            {...{
              pdfData,
              documentName,
              setDocumentName,
              isLoading,
              pdfPlaceholder,
              editorContent,
              setEditorContent,
              compileButtonText,
              compile
            }}
          />
        </Box>
        
      </Container>
    </React.Fragment>
  )
}

export default App
