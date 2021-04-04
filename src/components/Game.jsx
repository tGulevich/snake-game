import React from 'react'
import PropTypes from 'prop-types';
import Canvas from './Canvas'
import Score from './Score'
import MouseControl from './MouseControl'
import Popup from './Popup'
import Music from '../assets/sounds/music.mp3'
import '../style.css'

const musicAudio = new Audio(Music);

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  restartGame = () => {
    this.props.resetSnakeCoords();
    this.props.updateScore(0);
    this.props.turnOnNewGameState();
    this.props.resetDirection();
  }

  componentDidMount() {
    window.addEventListener('keydown', this.keyDownHandler);
    musicAudio.autoplay = true;
    musicAudio.loop = true;
    musicAudio.play();
  }

  componentDidUpdate() {
    musicAudio.volume = this.props.musicVolume / 100;
  }

  render() {
    const background = `url('${this.props.scene}.jpg')`;
    const isPause = this.props.pause;
    const isFail = this.props.fail;

    return (
      <div className="wrapper" >
        <Score score={this.props.score} />
        <div className="gameBoard" style={{ backgroundImage: background }}>
          {isPause || isFail ?
            <Popup
              pause={this.props.pause}
              updatePause={this.props.updatePause}
              fail={this.props.fail}
              updateFail={this.props.updateFail}
              turnOffNewGameState={this.props.turnOffNewGameState}
              turnOnNewGameState={this.props.turnOnNewGameState}
              updateScore={this.props.updateScore}
              restartGame={this.restartGame}
            />
            : <Canvas
              score={this.props.score}
              updateScore={this.props.updateScore}
              direction={this.props.direction}
              updateDirection={this.props.updateDirection}
              level={this.props.level}
              pause={this.props.pause}
              updatePause={this.props.updatePause}
              fail={this.props.fail}
              updateFail={this.props.updateFail}
              blocks={this.props.blocks}
              snakeCoords={this.props.snakeCoords}
              updateSnakeCoords={this.props.updateSnakeCoords}
              foodCoords={this.props.foodCoords}
              updateFoodCoords={this.props.updateFoodCoords}
              blockCoords={this.props.blockCoords}
              newGame={this.props.newGame}
              scene={this.props.scene}
              soundVolume={this.props.soundVolume}
              generateStatistic={this.props.generateStatistic}
            />
          }
        </div>
        <MouseControl
          pause={this.props.pause}
          updatePause={this.props.updatePause}
          updateDirection={this.props.updateDirection}
          turnOffNewGameState={this.props.turnOffNewGameState}
          turnOnNewGameState={this.props.turnOnNewGameState}
          updateScore={this.props.updateScore} />
      </div>
    )
  }
}

Game.propTypes = {
  snakeCoords: PropTypes.array,
  updateSnakeCoords: PropTypes.func,
  resetSnakeCoords: PropTypes.func,
  foodCoords: PropTypes.object,
  updateFoodCoords: PropTypes.func,
  blockCoords: PropTypes.array,
  score: PropTypes.number,
  updateScore: PropTypes.func,
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
  scene: PropTypes.string,
  soundVolume: PropTypes.number,
  musicVolume: PropTypes.number,
  generateStatistic: PropTypes.func,
  statisticArr: PropTypes.array,
  statisticScreenStatus: PropTypes.bool,
  updateStatisticScreenStatus: PropTypes.func,
};

export default Game;


