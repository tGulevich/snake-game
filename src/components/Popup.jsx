import React from 'react'
import PropTypes from 'prop-types';
import '../style.css'

export default function Popup(props) {

  function continueClickHandler() {
    props.updatePause();
    props.turnOffNewGameState();
  }

  function newGameClickHandler() {
    if (props.pause) {
      props.updatePause();
    }
    if (props.fail) {
      props.updateFail();
    }
    props.restartGame();
  }

  return (
    <div className="Popup">
      <h2 className="Popup__title">POPUP</h2>
      <button onClick={continueClickHandler}>Continue</button>
      <button onClick={newGameClickHandler}>New Game</button>

    </div>
  )
}

Popup.propTypes = {
  pause: PropTypes.bool,
  updatePause: PropTypes.func,
  fail: PropTypes.bool,
  updateFail: PropTypes.func,
  // newGame: PropTypes.bool,
  turnOffNewGameState: PropTypes.func,
  turnOnNewGameState: PropTypes.func,
  updateScore: PropTypes.func,
  restartGame: PropTypes.func,
}