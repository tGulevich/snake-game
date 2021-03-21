import React from 'react'
import PropTypes from 'prop-types';
import '../style.css'
import Canvas from './Canvas'
import Score from './Score'
import MouseControl from './MouseControl'
import Popup from './Popup'

const startCoords = {
  x: 250,
  y: 250
};

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      direction: 'up',
      snakeCoords:
        [
          startCoords
        ],
      foodCoords: {
        x: 0,
        y: 0
      },
      newGame: true,
    };
    this.updateSnakeCoords = this.updateSnakeCoords.bind(this);
    this.updateFoodCoords = this.updateFoodCoords.bind(this);
    this.updateNewGame = this.updateNewGame.bind(this);


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
  updateSnakeCoords = (coords) => {
    this.setState({ snakeCoords: coords })
  }
  updateFoodCoords = (coords) => {
    this.setState({ foodCoords: coords })
  }
  updateNewGame = () => {
    // this.setState({ newGame: !this.state.newGame })
    this.setState({ newGame: false })

  }

  render() {
    const isPause = this.props.pause;
    const isFail = this.props.fail;

    // console.log(this.state.newGame)
    return (
      <div className="wrapper" >
        <Score score={this.state.score} />

        <div className="gameBoard">
          {isPause || isFail ?
            <Popup
              pause={this.props.pause}
              updatePause={this.props.updatePause}
              newGame={this.state.newGame}
              updateNewGame={this.updateNewGame}
            />
            : <Canvas
              score={this.state.score}
              updateScore={this.updateScore}
              direction={this.state.direction}
              updateDirection={this.updateDirection}
              level={this.props.level}
              pause={this.props.pause}
              updatePause={this.props.updatePause}
              fail={this.props.fail}
              updateFail={this.props.updateFail}
              snakeCoords={this.state.snakeCoords}
              updateSnakeCoords={this.updateSnakeCoords}
              foodCoords={this.state.foodCoords}
              updateFoodCoords={this.updateFoodCoords}
              newGame={this.state.newGame}
            // updateNewGame={this.updateNewGame}
            />
          }
        </div>
        <MouseControl
          pause={this.props.pause}
          updatePause={this.props.updatePause}
          updateDirection={this.updateDirection}
          updateNewGame={this.updateNewGame} />
      </div>
    )
  }
}

Game.propTypes = {
  level: PropTypes.string,
  fail: PropTypes.bool,
  updateFail: PropTypes.func,
  pause: PropTypes.bool,
  updatePause: PropTypes.func
};

export default Game;


