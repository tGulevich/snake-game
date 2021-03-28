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
        foodCoords: this.props.foodCoords,
        blockCoords: this.props.blockCoords,
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
    this.props.updateFoodCoords(this.state.foodCoords)

    if (this.checkSnakeCoordsMatch(this.state.foodCoords) ||
      this.checkBlocksCoordsMatch(this.state.foodCoords)) {
      this.setFoodCoords()
    }
  }

  setBlockCoords() {
    const newBlockCoords = this.props.blockCoords.map(el => {
      el.x = this.getRandomCoords();
      el.y = this.getRandomCoords();
      return el;
    })

    this.setState({
      blockCoords: newBlockCoords
    })

    if (this.checkSnakeCoordsMatch(this.state.blockCoords) ||
      JSON.stringify(this.state.foodCoords) === JSON.stringify(newBlockCoords[0]) ||
      JSON.stringify(this.state.foodCoords) === JSON.stringify(newBlockCoords[1]) ||
      JSON.stringify(newBlockCoords[0]) === JSON.stringify(newBlockCoords[1])) {
      this.setBlockCoords()
    }
  }

  drawSnake() {
    const ctx = this.getCanvasContext();
    if (ctx) {
      let snakeColor;
      switch (this.props.scene) {
        case 'grass':
          snakeColor = '#8f4300';
          break;
        case 'space':
          snakeColor = '#7c2bba';
          break;
        case 'ocean':
          snakeColor = '#1f3399';
          break;
      }

      ctx.fillStyle = snakeColor;
      this.props.snakeCoords.forEach(el => {
        ctx.fillRect(el.x, el.y, cellSize, cellSize)
      })
    }
  }

  drawFood() {
    const foodCoords = this.state.foodCoords;
    const ctx = this.getCanvasContext();

    if (ctx) {
      let img = new Image();
      img.src = `${this.props.scene}_food.png`;
      img.onload = function () {
        ctx.drawImage(img, foodCoords.x, foodCoords.y, cellSize, cellSize)
      }
    }
  }

  drawBlock() {
    const ctx = this.getCanvasContext();
    if (ctx) {
      this.state.blockCoords.forEach((el, i) => {
        let img = new Image();
        img.src = `${this.props.scene}_block_${i}.png`;
        img.onload = function () {
          ctx.drawImage(img, el.x, el.y, cellSize, cellSize)
        }
      })
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
        this.props.updateFail();
        return
      }

      const newSnakeCoords = this.props.snakeCoords;
      newSnakeCoords.unshift(newElement);

      // Feed Snake
      if (newElement.x === this.state.foodCoords.x && newElement.y === this.state.foodCoords.y) {
        this.setFoodCoords();
        this.drawFood();
        const score = this.props.score;
        this.props.updateScore(score + 1);
      } else {
        const lastElement = this.props.snakeCoords[this.props.snakeCoords.length - 1];
        this.clearCanvas(lastElement.x, lastElement.y);
        newSnakeCoords.pop();
      }

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
      this.props.updateFail();
    }
    if (this.props.blocks) {
      this.props.blockCoords.forEach(el => {
        if (JSON.stringify(this.props.snakeCoords[0]) === JSON.stringify(el)) {
          this.props.updateFail();
        }
      });
    }
  }

  checkSnakeCoordsMatch(coords) {
    return this.props.snakeCoords.some(el => {
      return JSON.stringify(coords) === JSON.stringify(el)
    });
  }

  checkBlocksCoordsMatch(coords) {
    return this.props.blockCoords.some(el => {
      return JSON.stringify(coords) === JSON.stringify(el)
    });
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

  game() {
    const ctx = this.getCanvasContext();
    if (ctx) {
      const currentSpeed = this.checkCurrentSpeed();

      this.timerId = setTimeout(() => {
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
    this.drawSnake();
    this.game();
    if (this.props.newGame) {
      this.setFoodCoords();
    }
    this.drawFood()

    if (this.props.blocks) {
      if (this.props.newGame) {
        this.setBlockCoords();
      }
      this.drawBlock()
    }
  }

  render() {
    return <canvas
      className="AppCanvas"
      ref={this.canvas}
      tabIndex={0}
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
  blocks: PropTypes.bool,
  blockCoords: PropTypes.array,
  scene: PropTypes.string

};

export default Canvas;