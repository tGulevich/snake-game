import React from 'react'
import '../style.css'
import Canvas from './Canvas'
import Score from './Score'

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0
    };

  }
  updateScore = (value) => {
    this.setState({ score: value })
  }

  render() {
    return (
      <div className="wrapper" >
        <Score score={this.state.score} />
        <div className="gameBoard">
          <Canvas
            score={this.state.score}
            updateScore={this.updateScore} />
        </div>
      </div>
    )
  }
}

export default Game;