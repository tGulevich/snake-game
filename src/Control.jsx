import React from 'react'
// import Canvas from './Canvas'
const Canvas = React.lazy(() => import('./Canvas'));

// console.log(Canvas.state.direction)

// function getDirection(evt) {
//   let dir;

//   switch (evt.keyCode) {
//     case 38:
//       dir = 'up'
//       break;
//     case 40:
//       dir = 'down'
//       break;
//     case 37:
//       dir = 'left'
//       break;
//     case 39:
//       dir = 'right'
//       break;
//     // default:
//     //   direction = false
//   }
//   this.setState({
//     direction: dir
//   })
//   console.log(dir)
// }

export default class Control {
  getDirection(evt) {
    let dir;
    console.log(evt.keyCode)

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
      // default:
      //   direction = false
    }
    this.setState({
      direction: dir
    })
    console.log(dir)
  }

  keyDownHandler() {
    window.addEventListener('keydown', getDirection)
  }

  keyDownHandlerRemove() {

  }

}
