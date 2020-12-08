import { makeStyles } from '@material-ui/core/styles'

import AceEditor from "react-ace"
import "ace-builds/src-noconflict/mode-latex"
import "ace-builds/src-noconflict/theme-clouds"

const Editor = ({ editorContent, setEditorContent }) => {
  const handleChange = content => {
    setEditorContent(content)
  }
  
  return (
    <AceEditor
      mode="latex"
      theme="clouds"
      name="editor"
      onChange={handleChange}
      value={editorContent}
      width="100%"
      height="100%"
      fontSize={14}
      showPrintMargin={false}
      showGutter={true}
      highlightActiveLine={true}
      editorProps={{ $blockScrolling: true }}
    />
  )
}

export default Editor
