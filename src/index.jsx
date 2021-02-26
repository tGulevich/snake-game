import './style.css'
import React from 'react'
import ReactDOM from 'react-dom'
import Canvas from './components/Canvas'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {
  return (
    <React.Fragment>
      <Header />
      <div className="gameBoard">
        <Canvas />
      </div>
      <Footer />
    </React.Fragment>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));

