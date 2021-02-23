import React from 'react'

const snakeSize = 20;
const startCoords = {
  x: 240,
  y: 240
}

class Canvas extends React.Component {

  constructor(props) {
    super(props),
      this.state = {
        size: {
          width: 500,
          height: 500
        },
        isBumped: false,
        snakeCoords:
          [
            startCoords
            // {
            //   x: 240,
            //   y: 440
            // },
            // {
            //   x: 240,
            //   y: 20
            // },
            // {
            //   x: 240,
            //   y: 0
            // },
            // {
            //   x: 0,
            //   y: 240
            // },
            // {
            //   x: 480,
            //   y: 240
            // }
          ]
      },

      this.setContext = this.setContext.bind(this);
  }

  setContext(c) {
    this.ctx = c.getContext("2d");
  }

  drawSnake() {
    this.state.snakeCoords.forEach(el => {
      this.ctx.fillRect(el.x, el.y, snakeSize, snakeSize)
    })
    return
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.state.size.width, this.state.size.height);
  }

  // updateSnake() {
  //   this.ctx.clearRect(240, 480, snakeSize, snakeSize)
  // }

  moveUp() {
    const newElement = {
      x: this.state.snakeCoords[0].x,
      y: this.state.snakeCoords[0].y - 20
    }
    const newSnakeCoords = this.state.snakeCoords;
    newSnakeCoords.pop();
    newSnakeCoords.unshift(newElement);
    this.setState({
      snakeCoords: newSnakeCoords
    })
    // this.setState(prev => {
    //   const snakeCoords = prev.snakeCoords.map(el => {
    //     el.y = el.y - 20;
    //   })
    //   return snakeCoords
    // })
  }

  moveDown() {
    const newElement = {
      x: this.state.snakeCoords[0].x,
      y: this.state.snakeCoords[0].y + 20
    }
    const newSnakeCoords = this.state.snakeCoords;
    newSnakeCoords.pop();
    newSnakeCoords.unshift(newElement);
    this.setState({
      snakeCoords: newSnakeCoords
    })
  }

  moveRight() {
    const newElement = {
      x: this.state.snakeCoords[0].x + 20,
      y: this.state.snakeCoords[0].y
    }
    const newSnakeCoords = this.state.snakeCoords;
    newSnakeCoords.pop();
    newSnakeCoords.unshift(newElement);
    this.setState({
      snakeCoords: newSnakeCoords
    })
  }

  moveLeft() {
    const newElement = {
      x: this.state.snakeCoords[0].x - 20,
      y: this.state.snakeCoords[0].y
    }
    const newSnakeCoords = this.state.snakeCoords;
    newSnakeCoords.pop();
    newSnakeCoords.unshift(newElement);
    this.checkOutIsBumped();
    this.setState({
      snakeCoords: newSnakeCoords
    })
  }

  checkOutIsBumped() {
    console.log(this.state.snakeCoords[0].x, this.state.snakeCoords[0].y)
    if (this.state.snakeCoords[0].x < 0 ||
      this.state.snakeCoords[0].x > 480 ||
      this.state.snakeCoords[0].y < 0 ||
      this.state.snakeCoords[0].y > 480) {

      // STOP GAME POPUP
      console.log('OUT OF BOARD');
      this.ctx.fillStyle = "blue";
      this.ctx.fillRect(0, 0, 500, 500);
      this.setState({
        isBumped: true
      })
      console.log(this.state.isBumped)
    }
  }

  componentDidMount() {
    this.ctx.fillStyle = 'brown'
    this.drawSnake();
    setTimeout(() => {
      this.clearCanvas();
      this.moveLeft()
    }, 500)

  }

  componentDidUpdate() {
    this.drawSnake();
    setTimeout(() => {
      if (!this.state.isBumped) {
        this.clearCanvas();
        this.moveLeft()
      }
    }, 500)
  }

  componentWillUnmount() {
    // clearInterval(this.timerID);
  }

  render() {
    return <canvas
      className="AppCanvas"
      ref={this.setContext}
      width={this.state.size.width}
      height={this.state.size.height}
    />
  }
}

export default Canvas;