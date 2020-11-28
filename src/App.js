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

import Form from './Components/Form'

import './App.css'

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  leftSide: {
    flex: '1'
  },
  rightSide: {
    flex: '1'
  },
  loader: {
    display: 'flex',
    justifyContent: 'center'
  },
  pdf: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: theme.palette.background.paper
  },
  downloadPdf: {
    maxWidth: 200,
    marginTop: 6,
    marginBottom: 6
  }
}))

const App = () => {
  const classes = useStyles()
  
  const [pdfData, setPdfData] = useState(null)
  const [pdfName, setPdfName] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const pdfObjectSrc = `data:application/pdf;base64,${pdfData}`

  const submitForm = ({
    files, randomFlag, outputType
  }) => {
    const formData = new FormData();
    [...files].forEach(x => formData.append('multiplefiles', x))
    formData.append('random', randomFlag)
    formData.append('outFlag', outputType)
    formData.append('submit1', 'putDatabase') // temporary
    setIsLoading(true)

    axios.post('/uploadprb', formData, {
      headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Content-Type': 'multipart/form-data'
      }
    }).then(response => {
      console.log('response:', response)
      console.log('data:', response.data)
      if (!response.data) return;
      setPdfData(response.data.PdfContent)
      setPdfName(response.data.PdfName)
      setIsLoading(false)
    })
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth={false} className={classes.container}>
        
        <Box className={classes.leftSide}>
          <Form {...{submitForm}} />
        </Box>
        
        <Box className={classes.rightSide}>
          <Box className={classes.pdf}>
            {isLoading && <CircularProgress />}
            {pdfName && <Button className={classes.downloadPdf} variant="contained" color="primary" component={Link} href={pdfObjectSrc} download={pdfName + '.pdf'}>Download PDF</Button>}
            {pdfData && <iframe src={pdfObjectSrc} height="100%" width="100%" type="application/pdf" title="pdf"></iframe>}
          </Box>
        </Box>
        
      </Container>
    </React.Fragment>
  )
}

export default App
