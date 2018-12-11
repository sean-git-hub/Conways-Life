import React, { Component } from 'react';

class GameBoard extends React.Component{
  constructor(props){
      super(props);
      this.state = {
          height: 300,
          width: 300,
          cells: 15
      }
  }
  drawCanvas = () => {
      let canvas = this.refs.canvas.getContext('2d');
      canvas.fillStyle = 'white';

       const squares = this.state.height/this.state.cells;

       canvas.fillRect(0,0,this.state.height, this.state.width);

       for (let i = 0; i <= this.state.height; i += squares){
          canvas.moveTo(0,i);
          canvas.lineTo(this.state.width, i);
          for (let i = 0; i <= this.state.width; i += squares){
              canvas.moveTo(i,0);
              canvas.lineTo(i, this.state.height);
          }
      }
      canvas.stroke();
  }
   componentDidMount(){
      this.drawCanvas();
  }

  handleClick = (e) => {
    const can = this.refs.canvas
    const context = can.getContext("2d");
    const pos = this.refs.canvas.getBoundingClientRect()
    const squareSize = 20
    context.fillStyle = "black";
    context.fillRect(e.clientX - pos.x - ((e.clientX - pos.x) % squareSize),
      e.clientY - pos.y - ((e.clientY - pos.y) % squareSize),
      squareSize,
      squareSize);
      let cellState = `${(e.clientX - pos.x - (e.clientX - pos.x) % squareSize)/20},${ (e.clientY - pos.y - (e.clientY - pos.y) % squareSize)/20}`;
      console.log(this.state[`${cellState}`]);
      this.setState({[`${cellState}`]: "alive"});
  }

  unselectSquare = (e) => {
    const can = this.refs.canvas
    const context = can.getContext("2d");
    const pos = can.getBoundingClientRect()
    const squareSize = 20
    context.fillStyle = "white";
    context.fillRect(e.clientX - pos.x - ((e.clientX - pos.x) % squareSize),
      e.clientY - pos.y - ((e.clientY - pos.y) % squareSize),
      squareSize,
      squareSize);
}

clearGrid = (e) => {
  const can = this.refs.canvas
  const context = can.getContext("2d");
  context.clearRect(0,0,can.width,can.height)
  this.drawCanvas()
}

  render(){
      return(
        <>
          <canvas 
              onClick={this.handleClick}
              onDoubleClick={this.unselectSquare}
              ref="canvas"
              height={this.state.height}
              width={this.state.width} 
              /> 
              <div className = 'buttons'>
              <button>play</button>
              <button>stop</button>
              <button onClick={this.clearGrid}>clear</button>
              </div>
              <div>Game Rules:</div>
            </>
      );
  }
}
  export default GameBoard;