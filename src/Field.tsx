import React from 'react';
import './Field.css';
import './Button.css';

interface IFieldProps {
}

export interface IFieldState {
  arrayCoordinate: (number | string)[], //Array<number|string>
  addCordinateArray: (number | string)[],
  color: string,
  buttonRed: string,
  buttonSave: string,
  buttonZ: string
}

export class Field extends React.Component<IFieldProps, IFieldState> {

  constructor(props: IFieldProps) {
    super(props);
    this.state = {
      arrayCoordinate: [],
      addCordinateArray: [],
      color: "black",
      buttonRed: "Красный выкл",
      buttonSave: "Сохранить",
      buttonZ: "Закрытие линий выкл"
    }; //текущее состояние

    // Эта привязка обязательна для работы `this` в колбэке.
    this.arrClon = this.arrClon.bind(this);
    this.textChange = this.textChange.bind(this);
    this.textChangeSave = this.textChangeSave.bind(this);
    this.colorChange = this.colorChange.bind(this);
    this.addCordinateArrayAll = this.addCordinateArrayAll.bind(this);
    this.coordinateSave = this.coordinateSave.bind(this);
    this.completeFigureButton = this.completeFigureButton.bind(this);
  }

  //   toggleButtonRed = () => {
  //     setButtonRed(!buttonBlack)
  //      const changeColor = (color:any)=> {
  //         setColor("red")
  //     }
  // }

  textChange() {
    this.setState({ buttonRed: "Красный вкл" });
  }

  colorChange() {
    this.setState({ color: "red" });
    this.textChange()
  }

  textChangeSave() {
    this.setState({ buttonSave: "Сохранено" });
  }

  // ________________________________________Local Storage_______________________________________  //

  coordinateSave() {
    localStorage.setItem("arrayCoordinate", JSON.stringify(this.state.arrayCoordinate));
    let localStorageCoordinate = localStorage.getItem("arrayCoordinate");
    console.log("localStorageCoordinate:", localStorageCoordinate);

    this.textChangeSave()
  }


  // ________________________________________Local Storage END_______________________________________  //

  completeFigureText () {
      this.setState({ buttonZ: "Закрытие линий вкл" });
  }

  completeFigureButton() {

    if (this.state.arrayCoordinate.length > 2) {
      this.completeFigureText ();
      let arrClonAdd = this.state.arrayCoordinate.concat("Z");
      this.setState({ arrayCoordinate: arrClonAdd });
    }
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
      let arrClonAdd = this.state.arrayCoordinate.concat(`L${event.clientX} ${event.clientY}`);
      this.setState({ arrayCoordinate: arrClonAdd });
    };
  }

  render() {
    return (

      <div className="Field_item">
        <svg onClick={this.arrClon} id="svg_field" width="350" height="300" viewBox="0 0 350 300" xmlns="http://www.w3.org/2000/svg">
          <path id="line" d={this.state.arrayCoordinate.join(" ")} stroke={this.state.color} />
        </svg>

        <button className="button_z" onClick={this.completeFigureButton}>{this.state.buttonZ}</button>
        <button className="color_black" onClick={this.colorChange}>{this.state.buttonRed} </button>
        <button className="save" onClick={this.coordinateSave}>{this.state.buttonSave} </button>


      </div>
    );
  }
}

export default Field;