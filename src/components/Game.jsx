import React from 'react'
import PropTypes from 'prop-types';
import '../style.css'
import Canvas from './Canvas'
import Score from './Score'
import MouseControl from './MouseControl'

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      direction: 'up',
    };
  }

  updateScore = (value) => {
    this.setState({ score: value })
  }
  updateDirection = (dir) => {
    let newDirection;
    if (dir === 'up' && this.state.direction !== 'up' && this.state.direction !== 'down') {
      newDirection = 'up'
    } else if (dir === 'down' && this.state.direction !== 'up' && this.state.direction !== 'down') {
      newDirection = 'down'
    } else if (dir === 'left' && this.state.direction !== 'left' && this.state.direction !== 'right') {
      newDirection = 'left'
    } else if (dir === 'right' && this.state.direction !== 'left' && this.state.direction !== 'right') {
      newDirection = 'right'
    } else {
      return
    }

    if (newDirection) {
      this.setState({ direction: newDirection })
    }
  }

  render() {
    return (
      <div className="wrapper" >
        <Score score={this.state.score} />
        <div className="gameBoard">
          <Canvas
            score={this.state.score}
            updateScore={this.updateScore}
            direction={this.state.direction}
            updateDirection={this.updateDirection}
            level={this.props.level} />
        </div>
        <MouseControl
          updateDirection={this.updateDirection} />
      </div>
    )
  }
}

Game.propTypes = {
  level: PropTypes.string,
};


export default Game;


