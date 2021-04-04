import React from 'react';
import Header from './Header'
import Footer from './Footer'
import Game from './Game'
import Statistic from './Statistic'
import '../style.css'

const startCoords = {
  x: 250,
  y: 250
};

class GameState extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      snakeCoords:
        [
          startCoords
        ],
      foodCoords: {
        x: 0,
        y: 0
      },
      blockCoords: [{ x: 0, y: 0 }, { x: 0, y: 0 }],
      score: 0,
      start: true,
      fail: false,
      pause: false,
      level: localStorage.getItem('level') || 'medium',
      blocks: JSON.parse(localStorage.getItem('blocks')) !== null ? JSON.parse(localStorage.getItem('blocks')) : true,
      scene: localStorage.getItem('scene') || 'grass',
      direction: 'up',
      newGame: true,
      soundVolume: JSON.parse(localStorage.getItem('soundVolume')) !== null ? JSON.parse(localStorage.getItem('soundVolume')) : 50,
      musicVolume: JSON.parse(localStorage.getItem('musicVolume')) !== null ? JSON.parse(localStorage.getItem('musicVolume')) : 50,
      statisticArr: JSON.parse(localStorage.getItem('statistic')) || [],
      statisticScreenStatus: false,
    };
    this.updateSnakeCoords = this.updateSnakeCoords.bind(this);
    this.resetSnakeCoords = this.resetSnakeCoords.bind(this);
    this.updateFoodCoords = this.updateFoodCoords.bind(this);
    this.updateScore = this.updateScore.bind(this);
    this.updateLevel = this.updateLevel.bind(this);
    this.updateBlocksStatus = this.updateBlocksStatus.bind(this);
    this.updateScene = this.updateScene.bind(this);
    this.updatePause = this.updatePause.bind(this);
    this.updateFail = this.updateFail.bind(this);
    this.updateDirection = this.updateDirection.bind(this);
    this.turnOffNewGameState = this.turnOffNewGameState.bind(this);
    this.turnOnNewGameState = this.turnOnNewGameState.bind(this);
    this.updateSoundVolume = this.updateSoundVolume.bind(this);
    this.updateMusicVolume = this.updateMusicVolume.bind(this);
    this.generateStatistic = this.generateStatistic.bind(this);
    this.updateStatisticScreenStatus = this.updateStatisticScreenStatus.bind(this);
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

  updateScore = (value) => {
    this.setState({ score: value })
  }

  updateSoundVolume = (value) => {
    this.setState({ soundVolume: value })
  }

  updateMusicVolume = (value) => {
    this.setState({ musicVolume: value })
  }

  updateLevel = (evt) => {
    localStorage.setItem('level', evt.target.value);
    this.setState({ level: evt.target.value })
  }

  updateBlocksStatus = () => {
    localStorage.setItem('blocks', JSON.stringify(!this.state.blocks));
    this.setState({ blocks: !this.state.blocks })
  }

  updateScene = (evt) => {
    localStorage.setItem('scene', evt.target.value);
    this.setState({ scene: evt.target.value })
  }

  updatePause = () => {
    this.setState({ pause: !this.state.pause })
  }

  updateFail = () => {
    this.setState({ fail: !this.state.fail })
  }

  turnOffNewGameState = () => {
    this.setState({ newGame: false })
  }
  turnOnNewGameState = () => {
    this.setState({ newGame: true })
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

  updateStatisticScreenStatus() {
    this.setState({ statisticScreenStatus: !this.state.statisticScreenStatus });
  }

  resetDirection = () => {
    this.setState({ direction: 'up' })
  }

  keyDownHandler = (evt) => {
    let dir;
    switch (evt.keyCode) {
      case 38:
        dir = 'up'
        break;
      case 40:
        dir = 'down'
        break;
      case 37:
        dir = 'left'
        break;
      case 39:
        dir = 'right'
        break;
      case 27:
        this.updatePause();
        this.turnOffNewGameState();
        break;
      default: return
    }
    if (dir) {
      this.updateDirection(dir)
    }
  }

  generateStatistic() {
    let date = new Date().toString();
    date = date.replace(date.match(/GMT.+/)[0], '');
    const level = this.state.level;
    const score = this.state.score;
    let blocksStr;
    if (this.state.blocks) {
      blocksStr = 'Yes';
    } else {
      blocksStr = 'No';
    }

    let newStatistic = { date, level, blocksStr, score };
    const statisticArr = this.state.statisticArr;
    statisticArr.push(newStatistic);
    if (statisticArr.length > 1 && newStatistic.score > statisticArr[statisticArr.length - 2].score) {
      statisticArr.sort((a, b) => {
        return b.score - a.score;
      })
    }
    if (statisticArr.length > 10) {
      statisticArr.length = 10;
    }
    this.setState({ statisticArr: statisticArr });
    localStorage.setItem('statistic', JSON.stringify(statisticArr));
  }

  componentDidMount() {
    window.addEventListener('keydown', this.keyDownHandler);
  }

  render() {
    const isStart = this.state.start;
    const isStatistic = this.state.statisticScreenStatus
    return (
      <React.Fragment>
        <Header
          level={this.state.level}
          updateLevel={this.updateLevel}
          blocks={this.state.blocks}
          updateBlocksStatus={this.updateBlocksStatus}
          scene={this.state.scene}
          updateScene={this.updateScene}
          musicVolume={this.state.musicVolume}
          soundVolume={this.state.soundVolume}
          updateMusicVolume={this.updateMusicVolume}
          updateSoundVolume={this.updateSoundVolume}
          updateStatisticScreenStatus={this.updateStatisticScreenStatus}
          updatePause={this.updatePause}
        />
        {isStatistic ?
          <Statistic
            statisticArr={this.state.statisticArr}
            updateStatisticScreenStatus={this.updateStatisticScreenStatus}
          /> :
          isStart ?
            <div className="StartScreen">
              <h2 className="StartScreen__title">WELCOME</h2>
              <button onClick={() => this.setState({ start: false })}>Start Game</button>
            </div> :
            <Game
              snakeCoords={this.state.snakeCoords}
              updateSnakeCoords={this.updateSnakeCoords}
              resetSnakeCoords={this.resetSnakeCoords}
              foodCoords={this.state.foodCoords}
              updateFoodCoords={this.updateFoodCoords}
              blockCoords={this.state.blockCoords}
              score={this.state.score}
              updateScore={this.updateScore}
              level={this.state.level}
              fail={this.state.fail}
              updateFail={this.updateFail}
              pause={this.state.pause}
              updatePause={this.updatePause}
              blocks={this.state.blocks}
              direction={this.state.direction}
              updateDirection={this.updateDirection}
              resetDirection={this.resetDirection}
              newGame={this.state.newGame}
              turnOffNewGameState={this.turnOffNewGameState}
              turnOnNewGameState={this.turnOnNewGameState}
              scene={this.state.scene}
              soundVolume={this.state.soundVolume}
              musicVolume={this.state.musicVolume}
              generateStatistic={this.generateStatistic}
              statisticArr={this.state.statisticArr}
              statisticScreenStatus={this.state.statisticScreenStatus}
              updateStatisticScreenStatus={this.updateStatisticScreenStatus}
            />
        }
        <Footer />
      </React.Fragment>
    );
  }
}

export default GameState;