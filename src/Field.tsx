import React from 'react';
import './Field.css';

export interface FieldClass {
  arrayClick: any;
}

export class Field extends React.Component<{}, FieldClass> {

  constructor(props:any) {
    super(props);
    this.state = { arrayClick:  [] }; //текущее состояние

    // Эта привязка обязательна для работы `this` в колбэке.
    this.arrClon = this.arrClon.bind(this);
  }

  arrClon (event:any) {

    if(this.state.arrayClick < 3){
      let arrClonAdd = this.state.arrayClick.concat(`M${event.clientX} ${event.clientY}`);
      this.setState({arrayClick:arrClonAdd});
    } else {
      let arrClonL = this.state.arrayClick.concat(`L${event.clientX} ${event.clientY}`);
      console.log(event.clientX, event.clientY);
      this.setState({arrayClick:arrClonL});
    };
      }

  render() {
  return (

          <div className="Field_item">
                <svg onClick={this.arrClon} id="svg_field" width="350" height="300" viewBox="0 0 350 300" xmlns="http://www.w3.org/2000/svg">

                      <path id="line" d={this.state.arrayClick.join(" ")} stroke="red"/>

                </svg>
          </div>
);
}
}

export default Field;