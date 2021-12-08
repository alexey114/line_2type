import React from 'react';
import './Field.css';
import './Button.css';

interface IFieldProps {
}

export interface IFieldState {
  addCoordinateArray: { x: number, y: number }[],
  addCoordinate: { x: number, y: number }[],
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

  constructor(props: IFieldProps) {
    super(props);

    this.state = {
      addCoordinateArray: [],
      addCoordinate: [],
      localStorageCoordinate: "",
      color: "black",
      localStorageColor: "",
      buttonRed: false,
      buttonSave: false,
      buttonLoad: false,
      buttonZ: false,
      drawingCoordinate: ""
    };

    this.textChange = this.textChange.bind(this);
    this.buttonSave = this.buttonSave.bind(this);
    this.colorChange = this.colorChange.bind(this);
    this.addCoordinateToArray = this.addCoordinateToArray.bind(this);
    this.coordinateSave = this.coordinateSave.bind(this);
    this.coordinateLoad = this.coordinateLoad.bind(this);
    this.completeFigureButton = this.completeFigureButton.bind(this);
    this.drawingSvg = this.drawingSvg.bind(this);

  }

  //Изменение текста кнопки
  textChange() {
    this.setState({ buttonRed: (this.state.buttonRed === false) ? true : false });
  }
  //Изменение цвета линий
  colorChange() {
    this.setState({ color: (this.state.color === "red") ? "black" : "red" });
    this.textChange()
  }

  //Сохранение в Local Storage

  coordinateSave() {
    if (this.state.drawingCoordinate.length > 0) {
      localStorage.setItem("drawingCoordinateLocalStorage", this.state.drawingCoordinate);
      localStorage.setItem("colorLocalStorage", this.state.color);
      this.buttonSave()
    } else {
      alert('нарисуйте минимум одну линию')
    }
  }

  //Загрузка из Local Storage

  coordinateLoad = () => {
    let localStorageCoordinate = localStorage.getItem("drawingCoordinateLocalStorage")!;
    let localStorageColor = localStorage.getItem("colorLocalStorage")!;
    if (localStorageCoordinate === null) {
      alert("LocalStorage пуст")
    } else {
      this.setState({ drawingCoordinate: localStorageCoordinate });

      if (localStorageColor !== this.state.color) {
        this.setState({ color: localStorageColor });
        this.colorChange();
      }

    }
  }

  //Кнопка сохранения в Local Storage

  buttonSave() {
    this.setState({ buttonSave: true });
    alert('Coxpaнено')
  }

  //Кнопка загрузки из Local Storage

  buttonLoad() {
    this.setState({ buttonLoad: true });
    this.coordinateLoad();
  }

  //Очистка SVG поля для рисования

  buttonRemove() {
    this.setState({ drawingCoordinate: "" });
  }

  //Кнопка соединения начальной точки и конечной

  completeFigureText() {
    this.setState(() => { return { buttonZ: true } });
  }

  //Соединения начальной точки и конечной с проверкой наличия двух отрисованных двух линий

  completeFigureButton() {

    if (this.state.drawingCoordinate.length > 2) {
      this.setState({ drawingCoordinate: this.state.drawingCoordinate.concat("Z") });
      this.completeFigureText();
    } else {
      alert("нарисуйте минимум 2 линии")
    }
  }

  //Помещение кординат в массив

  addCoordinateToArray(event: React.MouseEvent) {
    this.state.addCoordinate.push({ x: event.clientX, y: event.clientY });
    this.setState({ addCoordinateArray: this.state.addCoordinate })
  }

  //Преобразование массива в строку с необходимыми координатами для строк

  drawingSvg(event: React.MouseEvent) {

    this.addCoordinateToArray(event)

    let drawingCoordinateFinal = "";
    let pointM = "M";
    let pointL = "L";

    this.state.addCoordinateArray.forEach((element: { x: number, y: number }, index: number) => {
      drawingCoordinateFinal += ((index === 0) ? pointM : pointL) + this.state.addCoordinateArray[index].x + " " + this.state.addCoordinateArray[index].y
    })

    this.setState({ drawingCoordinate: drawingCoordinateFinal })
  }

  // ________________________________________drawingSvg END_______________________________________  //

  render() {

    const drawingLine = this.state.drawingCoordinate
    const colorFinal = this.state.color
    const buttonRedFinal = this.state.buttonRed

    return (

      <div>

        <svg onClick={this.drawingSvg} width="350" height="300" viewBox="0 0 350 300" xmlns="http://www.w3.org/2000/svg">
          Circles (<circle cx="25" cy="75" r="20"/>)
          <path id="line" d={drawingLine} stroke={colorFinal} />
        </svg>

        <button className="buttonZ" onClick={() => this.completeFigureButton()}>Соединить точки</button>
        <button className="colorRed" onClick={() => this.colorChange()}>{buttonRedFinal ? "Красный вкл" : "Красный выкл"} </button>
        <br />
        <button className="save" onClick={() => this.coordinateSave()}> Сохранить </button>
        <button className="save" onClick={() => this.buttonLoad()}> Загрузить </button>
        <button className="save" onClick={() => this.buttonRemove()}> Очистить </button>

      </div>
    );
  }
}

export default Field;