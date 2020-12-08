import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  editor: {
    height: '100%',
    width: '100%'
  }
}))

const Editor = ({ editorContent, setEditorContent }) => {
  const classes = useStyles()

  const handleChange = event => {
    setEditorContent(event.target.value)
  }
  
  return (
    <textarea
      className={classes.editor}
      value={editorContent}
      onChange={handleChange}
    />
  )
}

export default Editor
