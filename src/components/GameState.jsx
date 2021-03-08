import React from 'react';
import Header from './Header'
import Game from './Game'

class GameState extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      level: 'easy',
      blocks: true,
      scene: 'grass'
    };
    this.updateLevel = this.updateLevel.bind(this);
    this.updateBlocksStatus = this.updateBlocksStatus.bind(this);
    this.updateScene = this.updateScene.bind(this);

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

  render() {
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
        <Game
          level={this.state.level}
        />
      </React.Fragment >
    );
  }
}

export default GameState;