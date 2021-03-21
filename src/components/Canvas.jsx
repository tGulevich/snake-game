import React from 'react'
import PropTypes from 'prop-types';

const cellSize = 25;
const boardSize = 500;

const EASY_SPEED = 500;
const MEDIUM_SPEED = 300;
const HARD_SPEED = 100;

const SNAKE_COLOR = 'brown';

class Canvas extends React.Component {
  canvas = React.createRef()

  constructor(props) {
    super(props),
      this.state = {
        // size: {
        //   width: boardSize,
        //   height: boardSize
        // },
        // isFail: false,
        foodCoords: this.props.foodCoords
        // foodCoords: {
        //   x: 0,
        //   y: 0
        // },
        // isPause: this.props.pause
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
    // let newFoodCoords = {}
    // newFoodCoords.x = this.getRandomCoords();
    // newFoodCoords.y = this.getRandomCoords();
    // console.log(newFoodCoords)

    foodCoords.x = this.getRandomCoords();
    foodCoords.y = this.getRandomCoords();

    this.setState({
      foodCoords
    })

    this.props.updateFoodCoords(this.state.foodCoords)

    if (this.checkSnakeCoordsMatch(this.state.foodCoords)) {
      this.setFoodCoords()
    }
  }

  drawSnake() {
    const ctx = this.getCanvasContext();

    if (ctx) {
      ctx.fillStyle = SNAKE_COLOR;
      this.props.snakeCoords.forEach(el => {
        ctx.fillRect(el.x, el.y, cellSize, cellSize)
      })

    }

  }

  drawFood() {
    // this.setFoodCoords();
    const foodCoords = this.state.foodCoords;
    const ctx = this.getCanvasContext();

    if (ctx) {
      let img = new Image();
      img.src = 'apple.png' // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      img.onload = function () {
        ctx.drawImage(img, foodCoords.x, foodCoords.y, cellSize, cellSize)
      }
    }

  }

  clearCanvas(x, y) {
    const ctx = this.getCanvasContext();
    if (ctx) {
      ctx.clearRect(x, y, cellSize, cellSize);
    }
    return

  }

  moveSnake(direction) {
    const ctx = this.getCanvasContext();
    if (ctx) {
      let newElement = {}

      switch (direction) {
        case 'up':
          newElement.x = this.props.snakeCoords[0].x;
          newElement.y = this.props.snakeCoords[0].y - cellSize;

          break;
        case 'down':
          newElement.x = this.props.snakeCoords[0].x;
          newElement.y = this.props.snakeCoords[0].y + cellSize;
          break;
        case 'left':
          newElement.x = this.props.snakeCoords[0].x - cellSize;
          newElement.y = this.props.snakeCoords[0].y;
          break;
        case 'right':
          newElement.x = this.props.snakeCoords[0].x + cellSize;
          newElement.y = this.props.snakeCoords[0].y;
          break;
      }

      if (this.checkSnakeCoordsMatch(newElement)) {
        this.stopGame();
        return
      }

      const newSnakeCoords = this.props.snakeCoords;
      newSnakeCoords.unshift(newElement);
      // console.log(this.props.foodCoords);
      // console.log(newElement)

      // Feed Snake
      if (newElement.x === this.state.foodCoords.x && newElement.y === this.state.foodCoords.y) {
        console.log('FEED')
        this.setFoodCoords();
        this.drawFood();
        const score = this.props.score;
        this.props.updateScore(score + 1);
      } else {
        const lastElement = this.props.snakeCoords[this.props.snakeCoords.length - 1];
        this.clearCanvas(lastElement.x, lastElement.y);
        newSnakeCoords.pop();
      }

      // this.setState({
      //   snakeCoords: newSnakeCoords // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      // })
      this.props.updateSnakeCoords(newSnakeCoords);
      this.checkOutIsBumped();
      this.drawSnake();
    }
  }

  checkOutIsBumped() {
    if (this.props.snakeCoords[0].x < 0 ||
      this.props.snakeCoords[0].x > boardSize - cellSize ||
      this.props.snakeCoords[0].y < 0 ||
      this.props.snakeCoords[0].y > boardSize - cellSize) {
      this.stopGame();
    }
  }

  checkSnakeCoordsMatch(coords) {
    return this.props.snakeCoords.some(el => {
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
    if (dir) {
      this.props.updateDirection(dir)
    }
  }

  checkCurrentSpeed = () => {
    let speed;
    switch (this.props.level) {
      case 'easy':
        speed = EASY_SPEED;
        break;
      case 'medium':
        speed = MEDIUM_SPEED;
        break;
      case 'hard':
        speed = HARD_SPEED;
        break;
      default: return
    }
    return speed;
  }

  stopGame() {
    this.props.updateFail();
    // this.setState({
    //   isFail: true
    // })
    // STOP GAME POPUP
    // const ctx = this.getCanvasContext();
    // ctx.fillStyle = "blue";
    // ctx.fillRect(0, 0, boardSize, boardSize);
  }

  game() {
    const ctx = this.getCanvasContext();
    if (ctx) {
      const currentSpeed = this.checkCurrentSpeed();

      this.timerId = setTimeout(() => {
        // const isPause = ;
        // console.log(this.props.pause)
        this.getRandomCoords()
        this.moveSnake(this.props.direction)


        if (!this.props.fail && !this.props.pause) {
          this.game();
        }
      }, currentSpeed);
    }
    return

  }

  componentDidMount() {
    this.focusCanvas();
    this.drawSnake();
    this.game();
    // console.log(this.props.newGame)
    if (this.props.newGame) {
      this.setFoodCoords();
    }
    // this.setFoodCoords();
    this.drawFood()
  }



  render() {
    // console.log(this.props.pause)
    // this.updatePauseState()

    return <canvas
      className="AppCanvas"
      ref={this.canvas}
      tabIndex={0}
      onKeyDown={this.keyDownHandler}
      width={boardSize} // !!!!!
      height={boardSize} // !!!!!
    />
  }
}

Canvas.propTypes = {
  score: PropTypes.number,
  updateScore: PropTypes.func,
  direction: PropTypes.string,
  updateDirection: PropTypes.func,
  level: PropTypes.string,
  pause: PropTypes.bool,
  fail: PropTypes.bool,
  updateFail: PropTypes.func,
  snakeCoords: PropTypes.array,
  updateSnakeCoords: PropTypes.func,
  foodCoords: PropTypes.object,
  updateFoodCoords: PropTypes.func,
  newGame: PropTypes.bool,
  updateNewGame: PropTypes.func,
};

export default Canvas;