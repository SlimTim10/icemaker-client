import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'

const PdfViewer = ({
  isLoading,
  pdfData,
  pdfObjectSrc,
  pdfPlaceholder
}) => {
  return (
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
  )
}

export default PdfViewer
