import './style.css'
import React from 'react'
import ReactDOM from 'react-dom'
import Canvas from './Canvas'

function App() {
  return (
    <div className="gameBoard">
      <Canvas />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));

