import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

const useStyles = makeStyles((theme) => ({
  body: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
}))

const PdfViewer = ({
  isLoading,
  pdfData,
  pdfObjectSrc,
  pdfPlaceholder
}) => {
  const classes = useStyles()
  
  return (
    <Box className={classes.body}>
      {
        isLoading ? <CircularProgress />
          : pdfData ? (
            <iframe
              src={pdfObjectSrc}
              height="100%"
              width="100%"
              type="application/pdf"
              title="pdf">
            </iframe>
          ) : <Typography variant="h6">{pdfPlaceholder}</Typography>
      }
    </Box>
  )
}

export default PdfViewer
