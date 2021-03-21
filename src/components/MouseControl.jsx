import React from 'react';
import PropTypes from 'prop-types';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';

class MouseControl extends React.Component {

  render() {
    function arrowClickHandler(dir) {
      this.props.updateDirection(dir)
    }

    function pauseClickHandler() {
      this.props.updatePause();
      this.props.turnOffNewGameState();
    }

    return (
      <div className='MouseControl'>
        <div className='PauseControl'>
          <button
            onClick={pauseClickHandler.bind(this)}
            className='MouseControl__btn MouseControl__btn_md MouseControl__btn_pause'>
            <PauseCircleOutlineIcon fontSize='large' />
          </button>
          <p>Pause (ESC)</p>
        </div>
        <div className='MoveControl'>
          <button
            onClick={arrowClickHandler.bind(this, 'left')}
            className='MouseControl__btn MouseControl__btn_lg MouseControl__btn_left'>
            <ArrowLeftIcon fontSize='large' />
          </button>
          <button
            onClick={arrowClickHandler.bind(this, 'up')}
            className='MouseControl__btn MouseControl__btn_sm MouseControl__btn_up'>
            <ArrowDropUpIcon fontSize='large' />
          </button>
          <button
            onClick={arrowClickHandler.bind(this, 'down')}
            className='MouseControl__btn MouseControl__btn_sm MouseControl__btn_down'>
            <ArrowDropDownIcon fontSize='large' />
          </button>
          <button
            onClick={arrowClickHandler.bind(this, 'right')}
            className='MouseControl__btn MouseControl__btn_lg MouseControl__btn_right'>
            <ArrowRightIcon fontSize='large' />
          </button>
        </div>
      </div>
    );
  }
}

MouseControl.propTypes = {
  updateDirection: PropTypes.func,
  pause: PropTypes.bool,
  updatePause: PropTypes.func,
  turnOffNewGameState: PropTypes.func,
};

export default MouseControl;