import React from 'react';
import './Field.css';
import './Button.css';

interface IFieldProps {
}
interface IFieldState {
  coordinateToArray: ICoordinate[],
  selectFigure: string,
  selectKnot: string,
  buttonColor: boolean,
  buttonFillColor: boolean,
  buttonCloseLinePath: boolean
}
interface ICoordinate {
  x: number,
  y: number
}

class Field extends React.Component<IFieldProps, IFieldState> {

  constructor(props: IFieldProps) {
    super(props);

    this.state = {
      coordinateToArray: [], //основной массив с координатами
      selectFigure: 'linePath',
      selectKnot: 'circle',
      buttonColor: false,
      buttonFillColor: false,
      buttonCloseLinePath: false
    };

    this.setCoordinateToArray = this.setCoordinateToArray.bind(this);
    this.handleChangeFigure = this.handleChangeFigure.bind(this);
    this.handleChangeKnot = this.handleChangeKnot.bind(this);

  }

  //ЗАПИСЬ КООРДИНАТ В МАССИВ
  setCoordinateToArray(event: React.MouseEvent) {
    let coordinateToArray = [...this.state.coordinateToArray]
    coordinateToArray.push({x: event.clientX, y: event.clientY});
    this.setState({ coordinateToArray })
    console.log('setState',coordinateToArray)
  }

  //ВЫБОР ФИГУРЫ ЧЕРЕЗ SELECT
  handleChangeFigure(event: React.ChangeEvent<HTMLSelectElement>) {
    this.setState({selectFigure: event.target.value});
    console.log(event.target.value)
  }

  //ВЫБОР УЗЛА ЧЕРЕЗ SELECT
  handleChangeKnot(event: React.ChangeEvent<HTMLSelectElement>) {
    this.setState({selectKnot: event.target.value});
    console.log(event.target.value)
  }

  setColor(){
    this.setState({buttonColor: (this.state.buttonColor)?false:true})
  }

  setColorFill(){
    this.setState({buttonFillColor: (this.state.buttonFillColor)?false:true})
  }

  setCloseLinePath(){
    this.setState({buttonCloseLinePath: true})
  }

  render() {

    let redColor = this.state.buttonColor;
    let colorСircuit = "black";
    let textButtonColor = "Красный выкл"  

    let fillPolygon = this.state.buttonFillColor;
    let colorFillPolygon = "none"
    let textButtonFillPolygon = "Заливка полигона выкл"

    function changeColor() {
      colorСircuit = (redColor) ? "red":"black";
      textButtonColor = (redColor) ? "Красный вкл" : "Красный выкл"
    }

    changeColor()

    function changeFillPolygon() { 
      colorFillPolygon = (fillPolygon) ? "blue" : "none"
      textButtonFillPolygon = (fillPolygon) ? "Заливка полигона вкл" : "Заливка полигона выкл"
    }

    changeFillPolygon()

    //Очистка SVG поля для рисования
    function buttonRemove() {
      window.location.reload()
    }

    let arrayCoordinat = this.state.coordinateToArray
    let optionFigure = this.state.selectFigure
    let optionKnot = this.state.selectKnot
    let closeLinePath = this.state.buttonCloseLinePath
    let coordinateLine: JSX.Element[] = []
    let coordinatePolygon: string[] = []
    let coordinateLinePath: string = ""


    //Polygon
    function createPolygon(element: ICoordinate) {
      return (element.x + " " + element.y)
    }

    //Отрисовка линии path
    function createLinePath(element: ICoordinate, index: number) {
      let pointM = "M";
      let pointL = "L";
      return ((index === 0) ? pointM : pointL) + (element.x + " " + element.y)
    }

    //Отрисовка фигур по условиям
    function createFigures() {
      if (optionFigure === 'line') {
        for (let index = 1; index < arrayCoordinat.length; index++) {
          coordinateLine.push(
            <line key={index} x1={arrayCoordinat[index - 1].x} x2={arrayCoordinat[index].x} y1={arrayCoordinat[index - 1].y} y2={arrayCoordinat[index].y} stroke={colorСircuit} fill={colorСircuit} strokeWidth="1" />
          )
          console.log("Line", coordinateLine)
        }
      } else {
        (optionFigure === 'polygon')
          ?
          coordinatePolygon = arrayCoordinat.map(createPolygon)
          :
          coordinateLinePath += arrayCoordinat.map(createLinePath).join(" ")
          if(closeLinePath === true){
            if(arrayCoordinat.length > 2){
              coordinateLinePath += " Z "
            } else {
              alert("нарисуйте минимум 2 линии")
            }
          }
      }
    }

    createFigures()

    //Рисование кружков или квадратов в узлах

    function createFiguresKnot(element: ICoordinate, index: number) {
      return (optionKnot === 'circle')
        ? <circle key={index} cx={element.x} cy={element.y} r="5" fill={colorСircuit} stroke={colorСircuit} />
        : <rect key={index} x={element.x - 2} y={element.y - 2} width="5" height="5" fill={colorСircuit} stroke={colorСircuit} />
    }
    let paintFiguresKnot = arrayCoordinat.map(createFiguresKnot)

  //СОХРАНЕНИЕ КООРДИНАТ
  function saveCoordinateAndColor() {
    if (arrayCoordinat.length > 0) {
      localStorage.setItem("CoordinateArray", JSON.stringify(arrayCoordinat));
      localStorage.setItem("colorLocalStorage", colorСircuit);
      localStorage.setItem("colorPolygonFillLocalStorage", colorFillPolygon);
      alert('Coxpaнено')
    } else {
      alert('нарисуйте минимум одну фигуру')
    }
  }

  //ЗАГРУЗКА КООРДИНАТ
  function loadCoordinateAndColor() {
    let getCoordinateArray = JSON.parse(localStorage.getItem("CoordinateArray")!);
    arrayCoordinat = getCoordinateArray

    let loadColor = localStorage.getItem("colorLocalStorage")!;
    let loadColorPolygonFill = localStorage.getItem("colorPolygonFillLocalStorage")!;

    console.log(arrayCoordinat)

    if (getCoordinateArray === null) {
      alert("LocalStorage пуст")
    } else {
      if (loadColor !== colorСircuit) {
        colorСircuit = (colorСircuit === "red") ? "black" : "red";
      }
      if (loadColorPolygonFill !== colorFillPolygon) {
        colorFillPolygon = (colorFillPolygon === "blue") ? "none" : "blue";
      }
    }
  }

    const coordinatePolygonString = coordinatePolygon.join(" ")

    return (

      <div>

        <svg onClick={this.setCoordinateToArray} width="350" height="300" viewBox="0 0 350 300" xmlns="http://www.w3.org/2000/svg">
          {paintFiguresKnot}
          {coordinateLine}
          <polygon points={coordinatePolygonString} stroke={colorСircuit} fill={colorFillPolygon} strokeWidth="10" />
          <path id="line" d={coordinateLinePath} stroke={colorСircuit} />
        </svg>

        <label>
          Выберите фигуру для рисования:
          <select value={optionFigure} onChange={this.handleChangeFigure}>
            <option value="line">Линия</option>
            <option value="linePath">Линия сложная</option>
            <option value="polygon">Полигон</option>
          </select>
        </label>
        <br />
        <label>
          Выберите фигуру в узлах:
          <br />
          <select value={optionKnot} onChange={this.handleChangeKnot}>
            <option value="circle">Кружок</option>
            <option value="rect">Квадратик</option>
          </select>
        </label>
        <br />
        <button className="buttonZ" onClick={() => this.setCloseLinePath()}>Соединить точки</button>
        <br />
        <button className="colorRed" onClick={() => this.setColor()}>{textButtonColor} </button>
        <button className="buttonPolygon" onClick={() => this.setColorFill()}> {textButtonFillPolygon} </button>
        <br />

        <button className="save" onClick={() => saveCoordinateAndColor()}> Сохранить </button>
        <button className="save" onClick={() => loadCoordinateAndColor()}> Загрузить </button>
        <button className="save" onClick={() => buttonRemove()}> Очистить </button>

        <br />

      </div>
    );
  }
}

export default Field;
