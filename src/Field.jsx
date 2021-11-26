import React from 'react';
import './Field.css';



class Field extends React.Component {

  constructor(props) {
    super(props);
    this.state = {onClick: false}; //текущее состояние

    // Эта привязка обязательна для работы `this` в колбэке.
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick($event) {
    this.setState(console.log($event.clientX, $event.clientY)); //новое состояние при клике вызывает консоль лог с координатами
  }

  render() {
  return (
          <div className="Field_item" onClick={this.handleClick}>
                <svg id="svg_field" width="350" height="300" viewBox="0 0 350 300" xmlns="http://www.w3.org/2000/svg">
                      <path id="line" d="M10 250 L250 100" stroke="red"/>
                </svg>
          </div>
);
}
}

 

function Ok() {
  console.log('Ok');
}
Ok()

export default Field;