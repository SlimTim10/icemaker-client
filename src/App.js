import React, { useState } from 'react'
import axios from 'axios'
// import { last } from 'ramda'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import Link from '@material-ui/core/Link'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import CircularProgress from '@material-ui/core/CircularProgress'

import Options from './Components/Options'

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
  gutter: {
    width: '14px',
    flexShrink: 0
  },
  main: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    borderLeft: '1px solid black'
  },
  mainNav: {
    height: '42px',
    borderBottom: '1px solid black'
  },
  mainContent: {
    display: 'flex',
    height: '100%'
  },
  editor: {
    flexGrow: 1,
    borderRight: '1px solid black'
  },
  pdf: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.background.paper,
    borderLeft: '1px solid black'
  },
  // downloadPdf: {
  //   maxWidth: 200,
  //   marginTop: 6,
  //   marginBottom: 6
  // }
}))

const App = () => {
  const classes = useStyles()

  const [drawings, setDrawings] = useState([])
  const [randomFlag, setRandomFlag] = useState(false)
  const [outputType, setOutputType] = useState('flagSolutions')
  
  const [pdfData, setPdfData] = useState(null)
  const [pdfName, setPdfName] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const pdfObjectSrc = `data:application/pdf;base64,${pdfData}`

  const compile = () => {
    setIsLoading(true)
    
    const formData = new FormData();
    [...drawings].forEach(x => formData.append('multiplefiles', x))
    formData.append('random', randomFlag)
    formData.append('outFlag', outputType)
    formData.append('submit1', 'putDatabase') // temporary

    axios.post('/uploadprb', formData, {
      headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Content-Type': 'multipart/form-data'
      }
    }).then(response => {
      console.log('response:', response)
      console.log('data:', response.data)
      if (!response.data) return;
      // Error handling?
      setPdfData(response.data.PdfContent)
      setPdfName(response.data.PdfName)
      setIsLoading(false)
      // Show in this order:
      // setErrorIcemaker(response.data.ErrorIcemaker)
      // setErrorLatex(response.data.ErrorLatex)
    })
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

        <Box className={classes.gutter} />

        <Box className={classes.main}>
          <Box className={classes.mainNav}>
            untitled.prb etc
            {/* <Box className={classes.compile}>Compile</Box> */}
          </Box>
          <Box className={classes.mainContent}>
            <textarea className={classes.editor} />
            <Box className={classes.gutter} />
            <Box className={classes.pdf}>
              {isLoading && <CircularProgress />}
              {pdfName && <Button className={classes.downloadPdf} variant="contained" color="primary" component={Link} href={pdfObjectSrc} download={pdfName + '.pdf'}>Download PDF</Button>}
              {pdfData && <iframe src={pdfObjectSrc} height="100%" width="100%" type="application/pdf" title="pdf"></iframe>}
            </Box>
          </Box>
        </Box>

        {/* <Box className={classes.leftSide}> */}
        {/*   <Form {...{submitForm}} /> */}
        {/* </Box> */}
        
        {/* <Box className={classes.rightSide}> */}
        {/*   <Box className={classes.pdf}> */}
        {/*     {isLoading && <CircularProgress />} */}
        {/*     {pdfName && <Button className={classes.downloadPdf} variant="contained" color="primary" component={Link} href={pdfObjectSrc} download={pdfName + '.pdf'}>Download PDF</Button>} */}
        {/*     {pdfData && <iframe src={pdfObjectSrc} height="100%" width="100%" type="application/pdf" title="pdf"></iframe>} */}
        {/*   </Box> */}
        {/* </Box> */}
        
      </Container>
    </React.Fragment>
  )
}

export default App
