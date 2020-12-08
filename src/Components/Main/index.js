import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'

import Gutter from '../Gutter'
import Header from './Header'
import Editor from './Editor'
import PdfViewer from './PdfViewer'

const useStyles = makeStyles((theme) => ({
  header: {
    height: '42px',
    borderBottom: '1px solid black'
  },
  body: {
    display: 'flex',
    height: '100%'
  },
  editor: {
    flex: '1 1 0'
  },
  pdf: {
    flex: '1 1 0',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.background.paper,
    borderLeft: '1px solid black'
  },
}))

const Main = ({
  pdfData,
  pdfName,
  isLoading,
  pdfPlaceholder,
  editorContent,
  setEditorContent,
  compileButtonText,
  compile
}) => {
  const classes = useStyles()

  const [documentName, setDocumentName] = useState('untitled')

  const pdfObjectSrc = `data:application/pdf;base64,${pdfData}`

  return (
    <>
      <Box className={classes.header}>
        <Header
          {...{
            editorContent,
            setEditorContent,
            documentName,
            setDocumentName,
            pdfData,
            compileButtonText,
            compile
          }} />
      </Box>
      <Box className={classes.body}>
        <Box className={classes.editor}>
          <Editor {...{ editorContent, setEditorContent }} />
        </Box>
        <Gutter />
        <Box className={classes.pdf}>
          <PdfViewer {...{ isLoading, pdfData, pdfObjectSrc, pdfPlaceholder }} />
        </Box>
      </Box>
    </>
  )
}

export default Main
