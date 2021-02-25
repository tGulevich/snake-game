import React from 'react'

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
        isBumped: false,
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
    console.log(this.state.foodCoords)
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
      default:
        console.log('wrong direction');
    }

    const newSnakeCoords = this.state.snakeCoords;
    newSnakeCoords.unshift(newElement);

    if (newElement.x === this.state.foodCoords.x && newElement.y === this.state.foodCoords.y) {
      this.drawFood();
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

  checkSnakeCoordsMatch(coords) {
    return this.state.snakeCoords.some(el => {
      return JSON.stringify(coords) === JSON.stringify(el)
    });
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
      default: return
    }
    this.setState({
      direction: dir
    })
  }

  game() {
    this.timerId = setTimeout(() => {
      this.getRandomCoords()
      this.moveSnake(this.state.direction)
      if (!this.state.isBumped) {
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

export default Canvas;