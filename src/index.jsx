import './style.css'
import React from 'react'
import ReactDOM from 'react-dom'
import Footer from './components/Footer'
import GameState from './components/GameState'

function App() {
  return (
    <React.Fragment>
      <GameState />
      <Footer />
    </React.Fragment>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));

