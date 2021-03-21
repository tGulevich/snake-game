import React from 'react';
import Header from './Header'
import Game from './Game'

class GameState extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fail: false,
      pause: false,
      level: 'medium',
      blocks: true,
      scene: 'grass'
    };
    this.updateLevel = this.updateLevel.bind(this);
    this.updateBlocksStatus = this.updateBlocksStatus.bind(this);
    this.updateScene = this.updateScene.bind(this);
    this.updatePause = this.updatePause.bind(this);
    this.updateFail = this.updateFail.bind(this);
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
          fail={this.state.fail}
          updateFail={this.updateFail}
          pause={this.state.pause}
          updatePause={this.updatePause}
        />
      </React.Fragment >
    );
  }
}

export default GameState;