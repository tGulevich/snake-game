import React from 'react'
import PropTypes from 'prop-types';

const cellSize = 25;
const boardSize = 500;
const startCoords = {
  x: 225,
  y: 225
}
class Canvas extends React.Component {
  canvas = React.createRef()

  constructor(props) {
    super(props),
      this.state = {
        direction: 'up',
        size: {
          width: boardSize,
          height: boardSize
        },
        isFail: false,
        snakeCoords:
          [
            startCoords
          ],
        foodCoords: {
          x: 0,
          y: 0
        }
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

  getRandomCoords() {
    return Math.floor((0 + Math.random() * ((boardSize / cellSize - 1) + 1 - 0))) * cellSize;
  }

  setFoodCoords() {
    const { foodCoords } = this.state;
    foodCoords.x = this.getRandomCoords();
    foodCoords.y = this.getRandomCoords();
    this.setState({
      foodCoords
    })

    if (this.checkSnakeCoordsMatch(this.state.foodCoords)) {
      this.setFoodCoords()
    }
  }

  drawSnake() {
    const ctx = this.getCanvasContext();
    this.state.snakeCoords.forEach(el => {
      ctx.fillRect(el.x, el.y, cellSize, cellSize)
    })
    ctx.fillStyle = 'brown';
  }

  drawFood() {
    this.setFoodCoords();
    const { foodCoords } = this.state
    const ctx = this.getCanvasContext();
    let img = new Image();
    img.src = 'apple.png'
    img.onload = function () {
      ctx.drawImage(img, foodCoords.x, foodCoords.y, cellSize, cellSize)
    }
  }

  clearCanvas(x, y) {
    const ctx = this.getCanvasContext();
    ctx.clearRect(x, y, cellSize, cellSize);
  }

  moveSnake(direction) {
    let newElement = {}

    switch (direction) {
      case 'up':
        newElement.x = this.state.snakeCoords[0].x;
        newElement.y = this.state.snakeCoords[0].y - cellSize;

        break;
      case 'down':
        newElement.x = this.state.snakeCoords[0].x;
        newElement.y = this.state.snakeCoords[0].y + cellSize;
        break;
      case 'left':
        newElement.x = this.state.snakeCoords[0].x - cellSize;
        newElement.y = this.state.snakeCoords[0].y;
        break;
      case 'right':
        newElement.x = this.state.snakeCoords[0].x + cellSize;
        newElement.y = this.state.snakeCoords[0].y;
        break;
    }

    if (this.checkSnakeCoordsMatch(newElement)) {
      this.stopGame();
      return
    }

    const newSnakeCoords = this.state.snakeCoords;
    newSnakeCoords.unshift(newElement);

    // Feed Snake
    if (newElement.x === this.state.foodCoords.x && newElement.y === this.state.foodCoords.y) {
      this.drawFood();
      const score = this.props.score;
      this.props.updateScore(score + 1);
    } else {
      const lastElement = this.state.snakeCoords[this.state.snakeCoords.length - 1];
      this.clearCanvas(lastElement.x, lastElement.y);
      newSnakeCoords.pop();
    }

    this.setState({
      snakeCoords: newSnakeCoords
    })
    this.checkOutIsBumped();
    this.drawSnake();
  }

  checkOutIsBumped() {
    if (this.state.snakeCoords[0].x < 0 ||
      this.state.snakeCoords[0].x > boardSize - cellSize ||
      this.state.snakeCoords[0].y < 0 ||
      this.state.snakeCoords[0].y > boardSize - cellSize) {
      this.stopGame();
    }
  }

  checkSnakeCoordsMatch(coords) {
    return this.state.snakeCoords.some(el => {
      return JSON.stringify(coords) === JSON.stringify(el)
    });
  }

  keyDownHandler = (evt) => {
    let dir;
    switch (evt.keyCode) {
      case 38:
        if (this.state.direction !== 'up' && this.state.direction !== 'down') {
          dir = 'up'
        }
        break;
      case 40:
        if (this.state.direction !== 'up' && this.state.direction !== 'down') {
          dir = 'down'
        }
        break;
      case 37:
        if (this.state.direction !== 'left' && this.state.direction !== 'right') {
          dir = 'left'
        }
        break;
      case 39:
        if (this.state.direction !== 'left' && this.state.direction !== 'right') {
          dir = 'right'
        }
        break;
      default: return
    }
    if (dir) {
      this.setState({
        direction: dir
      })
    }
  }

  stopGame() {
    this.setState({
      isFail: true
    })
    // STOP GAME POPUP
    const ctx = this.getCanvasContext();
    ctx.fillStyle = "blue";
    ctx.fillRect(0, 0, boardSize, boardSize);
  }

  game() {
    this.timerId = setTimeout(() => {
      this.getRandomCoords()
      this.moveSnake(this.state.direction)
      if (!this.state.isFail) {
        this.game();
      }
    }, 300);
  }

  componentDidMount() {
    this.focusCanvas();
    this.drawSnake();
    this.game();
    this.drawFood()
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

Canvas.propTypes = {
  score: PropTypes.number,
  updateScore: PropTypes.func
};

export default Canvas;