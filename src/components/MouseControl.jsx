import React from 'react';
import PropTypes from 'prop-types';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

class MouseControl extends React.Component {

  render() {
    function ArrowClickHandler(dir) {
      this.props.updateDirection(dir)
    }

    return (
      <div className='MouseControl'>
        <button
          onClick={ArrowClickHandler.bind(this, 'left')}
          className='MouseControl__btn MouseControl__btn_lg MouseControl__btn_left'>
          <ArrowLeftIcon fontSize='large' />
        </button>
        <button
          onClick={ArrowClickHandler.bind(this, 'up')}
          className='MouseControl__btn MouseControl__btn_sm MouseControl__btn_up'>
          <ArrowDropUpIcon fontSize='large' />
        </button>
        <button
          onClick={ArrowClickHandler.bind(this, 'down')}
          className='MouseControl__btn MouseControl__btn_sm MouseControl__btn_down'>
          <ArrowDropDownIcon fontSize='large' />
        </button>
        <button
          onClick={ArrowClickHandler.bind(this, 'right')}
          className='MouseControl__btn MouseControl__btn_lg MouseControl__btn_right'>
          <ArrowRightIcon fontSize='large' />
        </button>
      </div>
    );
  }
}

MouseControl.propTypes = {
  updateDirection: PropTypes.func,
};

export default MouseControl;