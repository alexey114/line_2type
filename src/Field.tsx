import React from 'react';
import './Field.css';
import './Button.css';

interface IFieldProps {
}

export interface IFieldState {
  // arrayCoordinate: string, //Array<number|string> // (number | string)[]
  addCoordinateArray: {x:number, y:number}[], // (number | string)[]
  addCoordinate: {x:number, y:number}[], // (number | string)[]
  localStorageCoordinate: string,
  color: string,
  localStorageColor: string,
  buttonRed: boolean,
  buttonSave: boolean,
  buttonLoad: boolean,
  buttonZ: boolean,
  drawingCoordinate: string
}

export class Field extends React.Component<IFieldProps, IFieldState> {
  drawingCoordinate: string | undefined;

  constructor(props: IFieldProps) {
    super(props);

    this.state = {
      // arrayCoordinate: "",
      addCoordinateArray: [],
      addCoordinate:[],
      localStorageCoordinate: "",
      color: "black",
      localStorageColor: "",
      buttonRed: false,
      buttonSave: false,
      buttonLoad: false,
      buttonZ: false,
      drawingCoordinate: ""
    }; //текущее состояние

    // Эта привязка обязательна для работы `this` в колбэке.
    // this.arrClon = this.arrClon.bind(this);
    this.textChange = this.textChange.bind(this);
    this.buttonSave = this.buttonSave.bind(this);
    this.colorChange = this.colorChange.bind(this);
    this.addCoordinateToArray = this.addCoordinateToArray.bind(this);
    this.coordinateSave = this.coordinateSave.bind(this);
    this.coordinateLoad = this.coordinateLoad.bind(this);
    this.completeFigureButton = this.completeFigureButton.bind(this);
    // this.createArrObj = this.createArrObj.bind(this);
    this.drawingSvg = this.drawingSvg.bind(this);

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
    if (this.state.drawingCoordinate.length > 0) {
      localStorage.setItem("drawingCoordinateLocalStorage", this.state.drawingCoordinate);
      localStorage.setItem("colorLocalStorage", this.state.color);
      this.buttonSave()
    } else {
      alert('нарисуйте минимум одну линию')
    }
  }

  coordinateLoad = () => {
    let localStorageCoordinate = localStorage.getItem("drawingCoordinateLocalStorage")!;
    let localStorageColor = localStorage.getItem("colorLocalStorage")!;
    if (localStorageCoordinate === null) {
      alert("LocalStorage пуст")
    } else {
      this.setState({drawingCoordinate: localStorageCoordinate});

      if(localStorageColor !== this.state.color) {
        this.setState({color: localStorageColor});
        this.colorChange();
      }
      

      console.log("localStorageCoordinate:", localStorageCoordinate);
      console.log("colorLocalStorage:", localStorageColor);
    }
  }

  buttonSave() {
    this.setState({ buttonSave: true });
    alert('Coxpaнено')
  }

  buttonLoad() {
    this.setState({ buttonLoad: true });
    this.coordinateLoad();
  }

  buttonRemove() {
    this.setState({drawingCoordinate: ""});
  }

  // ________________________________________Local Storage END_______________________________________  //

  completeFigureText() {
    this.setState(() => { return { buttonZ: true } });
  }

  completeFigureButton() {

    if (this.state.drawingCoordinate.length > 2) {
      this.setState({ drawingCoordinate: this.state.drawingCoordinate.concat("Z") });
      this.completeFigureText();
    } else {
      alert("нарисуйте минимум 2 линии")
    }
  }

  // ________________________________________Cordinate_______________________________________  //

  //!!!

  addCoordinateToArray(event: React.MouseEvent) {
    this.state.addCoordinate.push({x:event.clientX, y:event.clientY});
    this.setState({addCoordinateArray: this.state.addCoordinate})
    // console.log(this.state.addCoordinateArray)
    // console.log({x:event.clientX, y:event.clientY})
  }

  // arrClon(event: React.MouseEvent) {
  //   this.addCoordinateToArray(event);

  //   this.setState({
  //     drawingCoordinate:
  //       (this.state.drawingCoordinate.concat((this.state.drawingCoordinate.length < 1) ?
  //         (`M${event.clientX} ${event.clientY}`) :
  //         (`L${event.clientX} ${event.clientY}`)))
  //   });
  // }

// ________________________________________Cordinate END_______________________________________  //

// ________________________________________drawingSvg_______________________________________  //

  drawingSvg(event: React.MouseEvent) {

    this.addCoordinateToArray (event)

    let drawingCoordinate = "";

    this.state.addCoordinateArray.forEach((element:{x:number, y:number}, index:number)=>{
 
      if(index === 0) {
        drawingCoordinate += `M${this.state.addCoordinateArray[index].x} ${this.state.addCoordinateArray[index].y}`
      } else {
        drawingCoordinate += `L${this.state.addCoordinateArray[index].x} ${this.state.addCoordinateArray[index].y}`
      }

    })

    this.setState({drawingCoordinate: drawingCoordinate})

    console.log(drawingCoordinate)
    console.log({x:event.clientX, y:event.clientY})
  }

  // ________________________________________drawingSvg END_______________________________________  //

  render() {
    return (

      <div>

        <svg onClick={this.drawingSvg} width="350" height="300" viewBox="0 0 350 300" xmlns="http://www.w3.org/2000/svg">
          <path id="line" d={this.state.drawingCoordinate} stroke={this.state.color} />
        </svg>

        <button className="buttonZ" onClick={() => this.completeFigureButton()}>Соединить точки</button>
        <button className="colorRed" onClick={() => this.colorChange()}>{this.state.buttonRed ? "Красный вкл" : "Красный выкл"} </button>
        <br/>
        <button className="save" onClick={() => this.coordinateSave()}> Сохранить </button>
        <button className="save" onClick={() => this.buttonLoad()}> Загрузить </button>
        <button className="save" onClick={() => this.buttonRemove()}> Очистить </button>

      </div>
    );
  }
}

export default Field;