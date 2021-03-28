import React from 'react'
import ReactDOM from 'react-dom'
import GameState from './components/GameState'
import './style.css'

function App() {
  return (
    <React.Fragment>
      <GameState />
    </React.Fragment>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));

