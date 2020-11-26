import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box'
import List from '@material-ui/core/List'
import Button from '@material-ui/core/Button'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'

const useStyles = makeStyles((theme) => ({
  fileList: {
    overflow: 'auto',
    maxHeight: 300,
    backgroundColor: theme.palette.background.paper
  },
}))

const FileInput = ({ files, setFiles }) => {
  const classes = useStyles()
  
  const handleChangeFile = event => {
    if (![...event.target.files].some(file => files.find(x => x.name === file.name))) {
      setFiles(prev => [...prev, ...event.target.files])
    }
  }

  const handleFileDelete = file => event => {
    setFiles(prev => [...prev].filter(x => x.name !== file.name))
  }

  const createFileElement = file => {
    return (
      <ListItem key={file.name}>
        <ListItemText
          primary={file.name}
          />
        <ListItemSecondaryAction onClick={handleFileDelete(file)}>
          <IconButton edge="end" aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    )
  }
  
  return (
    <div>
      <div>
        <input
          accept="*"
          id="upload-file"
          type="file"
          multiple
          onChange={handleChangeFile}
          />
        <label htmlFor="upload-file">
          <Button variant="contained" color="primary" component="span">
            Attach
          </Button>
        </label>
        <Box component="span" m={1}>{files.length === 0 ? 'No files attached' : ''}</Box>
      </div>

      {files.length > 0 && <List className={classes.fileList}>{files.map(createFileElement)}</List>}

    </div>
  )
}

export default FileInput
