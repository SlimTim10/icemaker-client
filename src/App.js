import React, { useState } from 'react'
import axios from 'axios'
// import { last } from 'ramda'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'

import Form from './Components/Form'

import './App.css'

// TEST
const b64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize),
            byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
}

export default function App() {
  const [pdfData, setPdfData] = useState(null)

  const pdfObjectSrc = `data:application/pdf;base64,${pdfData}`

  // TEST
  const contentType = "application/pdf"
  const blob = b64toBlob(pdfData, contentType)
  const blobUrl = URL.createObjectURL(blob)

  const submitForm = ({
    files, randomFlag, outputType
  }) => {
    const formData = new FormData();
    [...files].forEach(x => formData.append('multiplefiles', x))
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
      setPdfData(response.data.PdfContent)
    })
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Container fixed>
        <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '100vh' }}>

          <Form {...{submitForm}} />

          <Box>
            {pdfData && <object data={pdfObjectSrc} height="100%" width="100%" type="application/pdf" aria-label="pdf"></object>}
          </Box>
          <Box>
            {pdfData && <iframe src={pdfObjectSrc} height="100%" width="100%" type="application/pdf" title="pdf"></iframe>}
          </Box>
          <Box>
            {pdfData && <embed src={blobUrl} height="100%" width="100%" type="application/pdf"></embed>}
          </Box>
          <Box>
            {<embed src="http://localhost:3000/oneProblem.pdf" height="100%" width="100%" type="application/pdf"></embed>}
          </Box>
          
        </Typography>
      </Container>
    </React.Fragment>
  )
}
