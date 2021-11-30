import React from 'react';
import './Field.css';
import './Button.css';



export interface IButtonProps {
  button: boolean
}

interface IFieldProps {
}

export interface IFieldState {
  arrayCoordinate: (number | string)[], //Array<number|string>
  addCordinateArray: (number | string)[],
  color: string,
  buttonRed: string,
  buttonSave: string
}

export class Field extends React.Component<IFieldProps, IFieldState> {

  constructor(props: IFieldProps) {
    super(props);
    this.state = {
      arrayCoordinate: [],
      addCordinateArray: [],
      color: "black",
      buttonRed: "Красный выкл",
      buttonSave: "Сохранить"
    }; //текущее состояние

    // Эта привязка обязательна для работы `this` в колбэке.
    this.arrClon = this.arrClon.bind(this);
    this.textChange = this.textChange.bind(this);
    this.textChangeSave = this.textChangeSave.bind(this);
    this.colorChange = this.colorChange.bind(this);
    this.addCordinateArrayAll = this.addCordinateArrayAll.bind(this);
  }

  //   toggleButtonRed = () => {
  //     setButtonRed(!buttonBlack)
  //      const changeColor = (color:any)=> {
  //         setColor("red")
  //     }
  // }
  textChange() {
    this.setState({ buttonRed: "Красный вкл" });
    this.colorChange();
  }

  colorChange() {
    this.setState({ color: "red" });
  }

  textChangeSave() {
    this.setState({ buttonSave: "Сохранено" });
  }

  addCordinateArrayAll(event: any) {
    let arrClonAddAll = this.state.addCordinateArray.concat(event.clientX, event.clientY);
    this.setState({ addCordinateArray: arrClonAddAll });
    console.table(arrClonAddAll);
  }
  
  // componentDidUpdate (prevState) {
  //   if (this.state.color === prevState.color) {
  //     this.setState(this.state.color);
  //   }
  // }

  arrClon(event: any) {
    this.addCordinateArrayAll(event);
    if (this.state.arrayCoordinate.length < 1) {
      let arrClonAdd = this.state.arrayCoordinate.concat(`M${event.clientX} ${event.clientY}`);
      this.setState({ arrayCoordinate: arrClonAdd });
    } else {
      let arrClonL = this.state.arrayCoordinate.concat(`L${event.clientX} ${event.clientY}`);
      this.setState({ arrayCoordinate: arrClonL });
    };
  }

  render() {
    return (

      <div className="Field_item">
        <svg onClick={this.arrClon} id="svg_field" width="350" height="300" viewBox="0 0 350 300" xmlns="http://www.w3.org/2000/svg">
          <path id="line" d={this.state.arrayCoordinate.join(" ")} stroke={this.state.color} />
        </svg>
        {/* <button className="button_z" onClick={toggleButtonZ}>{buttonZ ? 'Закрытие линий вкл' : 'Закрытие линий выкл'}</button> */}
        <h1>{this.state.buttonRed}</h1>
        <button className="color_black" onClick={this.textChange}>{this.state.buttonRed} </button>
        <button className="save" onClick={this.textChangeSave}>{this.state.buttonSave} </button>


      </div> //(a:React.MouseEvent|React.TouchEvent) => {console.log(1)}
    );
  }
}

export default Field;