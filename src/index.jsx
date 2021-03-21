import './style.css'
import React from 'react'
import ReactDOM from 'react-dom'
import GameState from './components/GameState'

function App() {
  return (
    <React.Fragment>
      <GameState />

    </React.Fragment>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));

