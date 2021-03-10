import React from 'react';
import Header from './Header'
import Game from './Game'
import Popup from './Popup'

class GameState extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pause: false,
      level: 'easy',
      blocks: true,
      scene: 'grass'
    };
    this.updateLevel = this.updateLevel.bind(this);
    this.updateBlocksStatus = this.updateBlocksStatus.bind(this);
    this.updateScene = this.updateScene.bind(this);
    this.updatePause = this.updatePause.bind(this);
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

  render() {
    const isPause = this.state.pause;

    return (
      <React.Fragment>
        <Header
          level={this.state.level}
          updateLevel={this.updateLevel}
          blocks={this.state.blocks}
          updateBlocksStatus={this.updateBlocksStatus}
          scene={this.state.scene}
          updateScene={this.updateScene}
        />
        {isPause ? <Popup /> : null}

        <Game
          level={this.state.level}
          pause={this.state.pause}
          updatePause={this.updatePause}
        />
      </React.Fragment >
    );
  }
}

export default GameState;