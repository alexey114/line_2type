import React from 'react';
import './Field.css';
import './Button.css';

interface IFieldProps {
}

export interface IFieldState {
  arrayCoordinate: string, //Array<number|string> // (number | string)[]
  addCordinateArray:  (number)[], // (number | string)[]
  localStorageCoordinate: string,
  color: string,
  buttonRed: boolean,
  buttonSave: boolean,
  buttonLoad: boolean,
  buttonZ: boolean
}

export class Field extends React.Component<IFieldProps, IFieldState> {

  constructor(props: IFieldProps) {
    super(props);
    this.state = {
      arrayCoordinate: "",
      addCordinateArray: [],
      localStorageCoordinate: "",
      color: "black",
      buttonRed: false,
      buttonSave: false,
      buttonLoad: false,
      buttonZ: false,
    }; //текущее состояние

    // Эта привязка обязательна для работы `this` в колбэке.
    this.arrClon = this.arrClon.bind(this);
    this.textChange = this.textChange.bind(this);
    this.buttonSave = this.buttonSave.bind(this);
    this.colorChange = this.colorChange.bind(this);
    this.addCordinateArrayAll = this.addCordinateArrayAll.bind(this);
    this.coordinateSave = this.coordinateSave.bind(this);
    this.coordinateLoad = this.coordinateLoad.bind(this);
    this.completeFigureButton = this.completeFigureButton.bind(this);
  }

  textChange() {
    this.setState({ buttonRed: (this.state.buttonRed === false) ? true : false });
  }

  colorChange() {
    this.setState({ color: (this.state.color === "red") ? "black" : "red" });
    this.textChange()
  }

  // ________________________________________Local Storage_______________________________________  //

  coordinateSave() {
    if (this.state.arrayCoordinate.length > 0) {
      localStorage.setItem("arrayCoordinateJSON", JSON.stringify(this.state.arrayCoordinate));
      this.buttonSave()
    } else {
      alert('нарисуйте минимум одну линию')
    }
  }

  coordinateLoad = () => {
    let localStorageCoordinate = localStorage.getItem("arrayCoordinateJSON")!;
    if(localStorageCoordinate.length < 1) {
      alert("LocalStorage пуст")
    }
    console.log("localStorageCoordinate:", localStorageCoordinate);
    return localStorageCoordinate;
  }

  buttonLoad() {
    this.setState({ buttonLoad: true });
    this.coordinateLoad();
  }

  buttonSave() {
    this.setState({ buttonSave: true });
    alert('Coxpaнено')
  }

  // ________________________________________Local Storage END_______________________________________  //

  completeFigureText() {
    this.setState(() => { return { buttonZ: true } });
  }

  completeFigureButton() {

    if (this.state.arrayCoordinate.length > 2) {
      this.setState({ arrayCoordinate: this.state.arrayCoordinate.concat("Z") });
      this.completeFigureText();
    } else {
      alert("нарисуйте минимум 2 линии")
    }
  }

  // ________________________________________Cordinate_______________________________________  //


  addCordinateArrayAll(event: React.MouseEvent) {
    this.setState({ addCordinateArray: (this.state.addCordinateArray.concat(event.clientX, event.clientY))});
  }

   arrClon(event: React.MouseEvent) {
    this.addCordinateArrayAll(event);
    console.log(this.state.addCordinateArray);
    this.setState({ arrayCoordinate: (this.state.arrayCoordinate.concat((this.state.arrayCoordinate.length < 1) ? (`M${event.clientX} ${event.clientY}`) :
      (`L${event.clientX} ${event.clientY}`)))});
  }

  // ________________________________________Cordinate END_______________________________________  //

  render() {
    return (

      <div>

        <svg onClick={this.arrClon} width="350" height="300" viewBox="0 0 350 300" xmlns="http://www.w3.org/2000/svg">
          <path id="line" d={this.state.arrayCoordinate} stroke={this.state.color} />
        </svg>

        <button className="buttonZ" onClick={() => this.completeFigureButton()}>Соединить точки</button>
        <button className="colorRed" onClick={() => this.colorChange()}>{this.state.buttonRed ? "Красный вкл" : "Красный выкл"} </button>
        <button className="save" onClick={() => this.coordinateSave()}> Сохранить рисунок </button>
        <button className="save" onClick={() => this.buttonLoad()}> Загрузить рисунок </button>

      </div>
    );
  }
}

export default Field;