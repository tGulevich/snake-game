import React from 'react'
import Control from './Control'

const snakeSize = 20;
const startCoords = {
  x: 240,
  y: 240
}

class Canvas extends React.Component {
  canvas = React.createRef()

  constructor(props) {
    super(props),
      this.state = {
        direction: 'up',
        size: {
          width: 500,
          height: 500
        },
        isBumped: false,
        snakeCoords:
          [
            startCoords
          ]
      }
  }

  focusCanvas() {
    const { canvas } = this;

    if (canvas && canvas.current) {
      canvas.current.focus();
    }
  }

  getCanvasContext() {
    const { canvas } = this;
    if (canvas && canvas.current) {
      return canvas.current.getContext('2d');
    }
    return null;
  };

  drawSnake() {
    const ctx = this.getCanvasContext();
    this.state.snakeCoords.forEach(el => {
      ctx.fillRect(el.x, el.y, snakeSize, snakeSize)
    })
    ctx.fillStyle = 'brown';
  }

  clearCanvas() {
    const ctx = this.getCanvasContext();
    ctx.clearRect(0, 0, this.state.size.width, this.state.size.height);
  }

  moveSnake(direction) {
    this.clearCanvas()

    const newElement = this.state.snakeCoords[0];
    switch (direction) {
      case 'up':
        newElement.y = newElement.y - 20;
        break;
      case 'down':
        newElement.y = newElement.y + 20;
        break;
      case 'left':
        newElement.x = newElement.x - 20;
        break;
      case 'right':
        newElement.x = newElement.x + 20;
        break;
      default:
        console.log('wrong direction');
    }
    const newSnakeCoords = this.state.snakeCoords;
    newSnakeCoords.pop();
    newSnakeCoords.unshift(newElement);
    this.checkOutIsBumped();
    this.setState({
      snakeCoords: newSnakeCoords
    })
    this.drawSnake();
    console.log('+')
  }



  checkOutIsBumped() {
    console.log(this.state.snakeCoords[0].x, this.state.snakeCoords[0].y)
    const ctx = this.getCanvasContext();
    if (this.state.snakeCoords[0].x < 0 ||
      this.state.snakeCoords[0].x > 480 ||
      this.state.snakeCoords[0].y < 0 ||
      this.state.snakeCoords[0].y > 480) {

      // STOP GAME POPUP
      console.log('OUT OF BOARD');
      ctx.fillStyle = "blue";
      ctx.fillRect(0, 0, 500, 500);
      this.setState({
        isBumped: true
      })
      console.log(this.state.isBumped)
    }
  }

  keyDownHandler = (evt) => {
    let dir;
    console.log(evt.keyCode, 'key', this.state.direction)

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
      default: return
    }
    this.setState({
      direction: dir
    })
    console.log(dir)
  }

  game() {
    this.timerId = setTimeout(() => {

      this.moveSnake(this.state.direction)
      if (!this.state.isBumped) {
        this.game();
      }

    }, 500);
  }

  componentDidMount() {
    this.focusCanvas();
    this.drawSnake();
    this.game();

    console.log(this.state.direction)
  }



  componentDidUpdate() {
  }

  componentWillUnmount() {
  }

  render() {
    return <canvas
      className="AppCanvas"
      ref={this.canvas}
      tabIndex={0}
      onKeyDown={this.keyDownHandler}
      width={this.state.size.width}
      height={this.state.size.height}
    />
  }
}

export default Canvas;