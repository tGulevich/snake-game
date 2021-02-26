import React from 'react'
import PropTypes from 'prop-types';
import '../style.css'

class Score extends React.Component {
  render() {
    return (
      <div className='Score'>
        Score: <span id='ScoreValue'>{this.props.score}</span>
      </div>
    )
  }
}

Score.propTypes = {
  score: PropTypes.number,
};

export default Score;