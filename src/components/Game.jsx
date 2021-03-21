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

      snakeCoords:
        [
          startCoords
        ],
      foodCoords: {
        x: 0,
        y: 0
      },

    };
    this.updateSnakeCoords = this.updateSnakeCoords.bind(this);
    this.updateFoodCoords = this.updateFoodCoords.bind(this);


  }

  updateScore = (value) => {
    this.setState({ score: value })
  }

  updateSnakeCoords = (coords) => {
    this.setState({ snakeCoords: coords })
  }
  updateFoodCoords = (coords) => {
    this.setState({ foodCoords: coords })
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
              // newGame={this.props.newGame}
              turnOffNewGameState={this.props.turnOffNewGameState}
            />
            : <Canvas
              score={this.state.score}
              updateScore={this.updateScore}
              direction={this.props.direction}
              updateDirection={this.props.updateDirection}
              level={this.props.level}
              pause={this.props.pause}
              updatePause={this.props.updatePause}
              fail={this.props.fail}
              updateFail={this.props.updateFail}
              snakeCoords={this.state.snakeCoords}
              updateSnakeCoords={this.updateSnakeCoords}
              foodCoords={this.state.foodCoords}
              updateFoodCoords={this.updateFoodCoords}
              newGame={this.props.newGame}
            // updateNewGame={this.updateNewGame}
            />
          }
        </div>
        <MouseControl
          pause={this.props.pause}
          updatePause={this.props.updatePause}
          updateDirection={this.props.updateDirection}
          turnOffNewGameState={this.props.turnOffNewGameState} />
      </div>
    )
  }
}

Game.propTypes = {
  level: PropTypes.string,
  fail: PropTypes.bool,
  updateFail: PropTypes.func,
  pause: PropTypes.bool,
  updatePause: PropTypes.func,
  direction: PropTypes.string,
  updateDirection: PropTypes.func,
  newGame: PropTypes.bool,
  turnOffNewGameState: PropTypes.func,
};

export default Game;


