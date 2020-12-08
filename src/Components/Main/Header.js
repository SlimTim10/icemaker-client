import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'

const useStyles = makeStyles((theme) => ({
  left: {
    position: 'absolute'
  },
  right: {
    position: 'absolute',
    right: '2px'
  },
  downloadPdf: {
    '&:hover': {
      textDecoration: 'none'
    }
  }
}))

const Header = ({
  editorContent,
  setEditorContent,
  documentName,
  setDocumentName,
  pdfData,
  compileButtonText,
  compile
}) => {
  const classes = useStyles()
  
  const [inputVal, setInputVal] = useState('')

  const pdfObjectSrc = `data:application/pdf;base64,${pdfData}`

  const handleChangeFile = async event => {
    const file = event.target.files.item(0)
    const fileName = file.name.slice(0, file.name.lastIndexOf('.'))
    const text = await file.text()
    
    setEditorContent(text)
    setDocumentName(fileName)
    
    // Reset the value of the input element so the change event will get triggered again if the previous file is selected again
    setInputVal('')
  }

  const handleDownload = event => {
    const tmpLink = document.createElement('a')
    const file = new Blob([editorContent], {type: 'text/plain'})
    tmpLink.href = URL.createObjectURL(file)
    tmpLink.download = `${documentName}.prb`
    document.body.appendChild(tmpLink)
    tmpLink.click()
    document.body.removeChild(tmpLink)
  }

  const handleChangePrbName = event => {
    setDocumentName(event.target.value)
  }

  const DownloadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg> 
  )

  const UploadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z"/></svg>
  )

  const UploadButton = () => (
    <>
      <input
        accept=".prb"
        id="upload-prb"
        type="file"
        multiple
        onChange={handleChangeFile}
        value={inputVal}
      />
      <label htmlFor="upload-prb">
        <IconButton aria-label="upload" component="span">
          <UploadIcon />
        </IconButton>
      </label>
    </>
  )

  const DownloadButton = () => (
    <IconButton onClick={handleDownload} aria-label="download" component="span">
      <DownloadIcon />
    </IconButton>
  )

  return (
    <>
      <Box className={classes.left}>
        <UploadButton/>
        <DownloadButton />
        <TextField
          size="small"
          value={documentName}
          onChange={handleChangePrbName}
          variant="outlined"
        />
      </Box>
      <Box className={classes.right}>
        {pdfData && 
         <Button
           className={classes.downloadPdf}
           variant="contained"
           color="default"
           component={Link}
           href={pdfObjectSrc}
           download={`${documentName}.pdf`}
           startIcon={<DownloadIcon />}
         >
           Download PDF
         </Button>
        }
      </Box>
      <Box display="flex" justifyContent="center">
        <Button
          onClick={compile}
          variant="contained"
          color="primary"
          startIcon={<KeyboardArrowUpIcon />}
          endIcon={<KeyboardArrowDownIcon />}
        >
          {compileButtonText}
        </Button>
      </Box>
    </>
  )
}

export default Header
