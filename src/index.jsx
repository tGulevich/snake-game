import './style.css'
import React from 'react'
import ReactDOM from 'react-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Game from './components/Game'

function App() {
  return (
    <React.Fragment>
      <Header />
      <Game />
      <Footer />
    </React.Fragment>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));

