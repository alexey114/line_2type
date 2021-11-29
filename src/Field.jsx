import React from 'react';
import './Field.css';



class Field extends React.Component {

  constructor(props) {
    super(props);
    this.state = { arrayClick: [] }; //текущее состояние

    // Эта привязка обязательна для работы `this` в колбэке.
    this.arrClon = this.arrClon.bind(this);
  }

  arrClon (event) {

    if(this.state.arrayClick < 3){
      let arrClonAdd = this.state.arrayClick.concat(`M${event.clientX} ${event.clientY}`);
      this.setState({arrayClick:arrClonAdd});
    } else {
      let arrClonT = this.state.arrayClick.concat(`L${event.clientX} ${event.clientY}`);
      console.log(event.clientX, event.clientY);
      this.setState({arrayClick:arrClonT});
    };
      }

  render() {
  return (

          <div className="Field_item">
                <svg onClick={this.arrClon} id="svg_field" width="350" height="300" viewBox="0 0 350 300" xmlns="http://www.w3.org/2000/svg">

                      <path id="line" d={this.state.arrayClick.join(" ")} stroke="red"/>

                </svg>
                <h1>{this.state.arrayClick}</h1>
          </div>
);
}
}

function Ok() {
  console.log('Ok');
}
Ok()

export default Field;