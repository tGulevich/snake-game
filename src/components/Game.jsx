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
      blockCoords: [{ x: 0, y: 0 }, { x: 0, y: 0 }],
    };
    this.updateSnakeCoords = this.updateSnakeCoords.bind(this);
    this.resetSnakeCoords = this.resetSnakeCoords.bind(this);
    this.updateFoodCoords = this.updateFoodCoords.bind(this);
    this.updateScore = this.updateScore.bind(this);
  }

  updateScore = (value) => {
    this.setState({ score: value })
  }

  updateSnakeCoords = (coords) => {
    this.setState({ snakeCoords: coords })
  }
  resetSnakeCoords = () => {
    this.setState({
      snakeCoords: [
        startCoords
      ]
    })
  }
  updateFoodCoords = (coords) => {
    this.setState({ foodCoords: coords })
  }

  restartGame = () => {
    this.resetSnakeCoords();
    this.updateScore(0);
    this.props.turnOnNewGameState();
    this.props.resetDirection();
  }

  render() {
    const isPause = this.props.pause;
    const isFail = this.props.fail;

    return (
      <div className="wrapper" >
        <Score score={this.state.score} />

        <div className="gameBoard">
          {isPause || isFail ?
            <Popup
              pause={this.props.pause}
              updatePause={this.props.updatePause}
              fail={this.props.fail}
              updateFail={this.props.updateFail}
              turnOffNewGameState={this.props.turnOffNewGameState}
              turnOnNewGameState={this.props.turnOnNewGameState}
              updateScore={this.updateScore}
              restartGame={this.restartGame}
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
              blocks={this.props.blocks}
              snakeCoords={this.state.snakeCoords}
              updateSnakeCoords={this.updateSnakeCoords}
              foodCoords={this.state.foodCoords}
              updateFoodCoords={this.updateFoodCoords}
              blockCoords={this.state.blockCoords}
              newGame={this.props.newGame}
              scene={this.props.scene}
            />
          }
        </div>
        <MouseControl
          pause={this.props.pause}
          updatePause={this.props.updatePause}
          updateDirection={this.props.updateDirection}
          turnOffNewGameState={this.props.turnOffNewGameState}
          turnOnNewGameState={this.props.turnOnNewGameState}
          updateScore={this.updateScore} />
      </div>
    )
  }
}

Game.propTypes = {
  level: PropTypes.string,
  fail: PropTypes.bool,
  updateFail: PropTypes.func,
  pause: PropTypes.bool,
  blocks: PropTypes.bool,
  updatePause: PropTypes.func,
  direction: PropTypes.string,
  updateDirection: PropTypes.func,
  resetDirection: PropTypes.func,
  newGame: PropTypes.bool,
  turnOffNewGameState: PropTypes.func,
  turnOnNewGameState: PropTypes.func,
  scene: PropTypes.string
};

export default Game;


