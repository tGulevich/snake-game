import React from 'react'
import PropTypes from 'prop-types';
import '../style.css'

export default function Popup(props) {

  function continueClickHandler() {
    props.updatePause();
    props.updateNewGame();
  }
  // console.log(props.pause)
  return (
    <div className="Popup">
      <h2 className="Popup__title">POPUP</h2>
      <button onClick={continueClickHandler}>Continue</button>
      <button onClick={continueClickHandler}>New Game</button>

    </div>
  )
}

Popup.propTypes = {
  pause: PropTypes.bool,
  updatePause: PropTypes.func,
  // newGame: PropTypes.bool,
  updateNewGame: PropTypes.func,
}