import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import Typography from '@material-ui/core/Typography'
import FolderIcon from '@material-ui/icons/Folder'

const useStyles = makeStyles((theme) => ({
  fileList: {
    overflow: 'auto',
    height: '70vh',
    marginLeft: '1em'
  },
  fileItem: {
    wordBreak: 'break-all'
  }
}))

const Drawings = ({ drawings, setDrawings }) => {
  const classes = useStyles()

  const [inputVal, setInputVal] = useState('')
  
  const handleChangeFile = event => {
    if (![...event.target.files].some(file => drawings.find(x => x.name === file.name))) {
      setDrawings(prev => [...prev, ...event.target.files])
    }
    // Reset the value of the input element so the change event will get triggered again if the previous file is selected again
    setInputVal('')
  }

  const handleDeleteFile = file => event => {
    setDrawings(prev => [...prev].filter(x => x.name !== file.name))
  }

  const createFileElement = file => {
    return (
      <ListItem key={file.name} className={classes.fileItem}>
        <ListItemText
          primary={file.name}
          />
        <ListItemSecondaryAction onClick={handleDeleteFile(file)}>
          <IconButton edge="end" aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    )
  }

  const fileList = drawings.length > 0 && (
    <List className={classes.fileList}>{drawings.map(createFileElement)}</List>
  )
  
  return (
    <>
      <Box display="flex" alignItems="center">
        <FolderIcon style={{ marginRight: '5px' }} />
        <Typography variant="body1">drawings</Typography>
        <input
          accept=".asc"
          id="upload-drawings"
          type="file"
          multiple
          onChange={handleChangeFile}
          value={inputVal}
          />
        <label htmlFor="upload-drawings">
          <IconButton aria-label="upload" component="span">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z"/></svg>
          </IconButton>
        </label>
      </Box>
      {fileList}
      

    </>
  )
}

export default Drawings
