import React from 'react';
import Header from './Header'
import Game from './Game'

class GameState extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      level: 'easy'
    };
    this.updateLevel = this.updateLevel.bind(this)
  }

  updateLevel = (evt) => {
    this.setState({ level: evt.target.value })
  }
  render() {
    return (
      <React.Fragment>
        <Header
          level={this.state.level}
          updateLevel={this.updateLevel}
        />
        <Game
          level={this.state.level}
        />
      </React.Fragment >
    );
  }
}

export default GameState;