import React from 'react'
import PropTypes from 'prop-types';
import '../style.css'

export default function Popup(props) {

  function continueClickHandler() {
    if (!props.fail) {
      props.updatePause();
      props.turnOffNewGameState();
    }
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

  let popupText;
  if (props.pause && !props.fail) {
    popupText = 'Pause';
  } else if (props.fail) {
    popupText = 'Fail';
  }

  return (
    <div className="Popup">
      <h2 className="Popup__title">{popupText}</h2>
      <button
        className={'button button__popup' + (props.fail ? ' button__popup_inactive' : '')}
        onClick={continueClickHandler}>Continue</button>
      <button
        className={'button button__popup'}
        onClick={newGameClickHandler}>New Game</button>

    </div>
  )
}

Popup.propTypes = {
  pause: PropTypes.bool,
  updatePause: PropTypes.func,
  fail: PropTypes.bool,
  updateFail: PropTypes.func,
  turnOffNewGameState: PropTypes.func,
  turnOnNewGameState: PropTypes.func,
  updateScore: PropTypes.func,
  restartGame: PropTypes.func,
}