import { useEffect } from 'react'
import axios from 'axios'
import logo from './logo.svg'
import './App.css'

function App() {
  useEffect(() => {
    console.log('Request...')
    axios.get('http://192.168.1.45:3005/uploadasc', {
      method: 'post',
      body: {},
      crossDomain: true
    }).then(res => console.log('response:', res))
  }, [])
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  )
}

export default App
