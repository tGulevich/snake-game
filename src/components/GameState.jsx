import React from 'react';
import Header from './Header'
import Footer from './Footer'
import Game from './Game'
import '../style.css'

class GameState extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      start: true,
      fail: false,
      pause: false,
      level: 'medium',
      blocks: true,
      scene: 'grass',
      direction: 'up',
      newGame: true,
      soundVolume: 50,
      musicVolume: 50,
    };
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
  }

  updateSoundVolume = (value) => {
    this.setState({ soundVolume: value })
  }

  updateMusicVolume = (value) => {
    this.setState({ musicVolume: value })
  }

  updateLevel = (evt) => {
    this.setState({ level: evt.target.value })
  }

  updateBlocksStatus = () => {
    this.setState({ blocks: !this.state.blocks })
  }

  updateScene = (evt) => {
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

  componentDidMount() {
    window.addEventListener('keydown', this.keyDownHandler);
  }

  render() {
    const isStart = this.state.start;
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
        />
        {isStart ?
          <div className="StartScreen">
            <h2 className="StartScreen__title">WELCOME</h2>
            <button onClick={() => this.setState({ start: false })}>Start Game</button>
          </div> :
          <Game
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
          />
        }
        <Footer />
      </React.Fragment>
    );
  }
}

export default GameState;