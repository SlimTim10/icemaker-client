import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'

const useStyles = makeStyles((theme) => ({
  left: {
    position: 'absolute'
  }
}))

const Header = ({
  editorContent,
  setEditorContent,
  compile
}) => {
  const classes = useStyles()
  
  const [inputVal, setInputVal] = useState('')
  const [prbName, setPrbName] = useState('untitled.prb')

  const handleChangeFile = async event => {
    const file = event.target.files.item(0)
    const text = await file.text()
    
    if (editorContent !== '') {
      // TODO: confirmation modal
    }
    
    setEditorContent(text)
    // Reset the value of the input element so the change event will get triggered again if the previous file is selected again
    setInputVal('')
  }

  const handleDownload = event => {
    const tmpLink = document.createElement('a')
    const file = new Blob([editorContent], {type: 'text/plain'})
    tmpLink.href = URL.createObjectURL(file)
    tmpLink.download = prbName
    document.body.appendChild(tmpLink)
    tmpLink.click()
    document.body.removeChild(tmpLink)
  }

  const handleChangePrbName = event => {
    setPrbName(event.target.value)
  }

  const DownloadButton = () => (
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
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z"/></svg>
        </IconButton>
      </label>
    </>
  )

  const UploadButton = () => (
    <IconButton onClick={handleDownload} aria-label="download" component="span">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg> 
    </IconButton>
  )

  return (
    <>
      <Box className={classes.left}>
        <DownloadButton />
        <UploadButton/>
        <TextField
          size="small"
          value={prbName}
          onChange={handleChangePrbName}
          variant="outlined"
        />
      </Box>
      <Box display="flex" justifyContent="center">
        <Button
          onClick={event => compile()}
          variant="contained"
          color="primary"
          startIcon={<ArrowDropUpIcon />}
          endIcon={<ArrowDropDownIcon />}
        >
          Compile
        </Button>
      </Box>
    </>
  )
}

export default Header
