import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'

import Gutter from '../Gutter'
import Header from './Header'
import Editor from './Editor'
import PdfViewer from './PdfViewer'
import ErrorLog from './ErrorLog'

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
  viewer: {
    flex: '1 1 0',
    borderLeft: '1px solid black',
    backgroundColor: theme.palette.background.paper
  }
}))

const Main = ({
  pdfData,
  documentName,
  setDocumentName,
  isLoading,
  pdfPlaceholder,
  editorContent,
  setEditorContent,
  showErrorLog,
  setShowErrorLog,
  errorIcemaker,
  errorLatex,
  compileButtonText,
  compile
}) => {
  const classes = useStyles()

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
            showErrorLog,
            setShowErrorLog,
            errorIcemaker,
            errorLatex,
            compileButtonText,
            compile
          }} />
      </Box>
      <Box className={classes.body}>
        <Box className={classes.editor}>
          <Editor {...{ editorContent, setEditorContent }} />
        </Box>
        <Gutter />
        <Box className={classes.viewer}>
          { showErrorLog
            ? <ErrorLog
                {...{
                  errorIcemaker,
                  errorLatex
                }} />
            : <PdfViewer
                {...{
                  isLoading,
                  pdfData,
                  pdfObjectSrc,
                  pdfPlaceholder
                }} />
          }
        </Box>
      </Box>
    </>
  )
}

export default Main
