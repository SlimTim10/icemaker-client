import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'
import CircularProgress from '@material-ui/core/CircularProgress'

import Gutter from '../Gutter'
import Header from './Header'
import Editor from './Editor'

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

const Main = ({ pdfData, pdfName, isLoading, compile }) => {
  const classes = useStyles()

  const [editorContent, setEditorContent] = useState('')

  const pdfObjectSrc = `data:application/pdf;base64,${pdfData}`

  return (
    <>
      <Box className={classes.header}>
        <Header {...{ editorContent, setEditorContent, compile }} />
      </Box>
      <Box className={classes.body}>
        <Box className={classes.editor}>
          <Editor {...{editorContent, setEditorContent}} />
        </Box>
        <Gutter />
        <Box className={classes.pdf}>
          {isLoading && <CircularProgress />}
          {pdfName && <Button className={classes.downloadPdf} variant="contained" color="primary" component={Link} href={pdfObjectSrc} download={pdfName + '.pdf'}>Download PDF</Button>}
          {pdfData && <iframe src={pdfObjectSrc} height="100%" width="100%" type="application/pdf" title="pdf"></iframe>}
        </Box>
      </Box>
    </>
  )
}

export default Main
