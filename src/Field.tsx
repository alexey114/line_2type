import React from 'react';
import './Field.css';
import './Button.css';

interface IFieldProps {
}
interface IFieldState {
  coordinateToArray: ICoordinates[],
}
interface ICoordinates {
  type: any,
  x: number,
  y: number,
  color: string,
  colorFill: string
}

let colorСircuit = "black";
let textButtonColor = "Красный выкл"
let redColor = false;

let switchPolygon = false;
let textButtonPolygon = "Полигон выкл"

let switchLine = true;
let textButtonLine = "Линия выкл"

let checkKnotRect = false;

let fillPolygon = false;
let textButtonFillPolygon = "Заливка полигона выкл"
let colorFillPolygon = "none"

  // const typeFigures = {
  //   typeLinePatch: "lnpt",
  //   typeLine: "ln",
  //   typePolygon: "plg",
  //   typeCircle: "crl",
  //   typeRect: "rct"
  // }

function changeColor() {
  redColor = (redColor) ? false : true;
  colorСircuit = (redColor) ? "red" : "black";
  textButtonColor = (redColor) ? "Красный вкл" : "Красный выкл"
}

function changeFillPolygon() {
  fillPolygon = (fillPolygon) ? false : true;
  colorFillPolygon = (fillPolygon) ? "blue" : "none"
  textButtonFillPolygon = (fillPolygon) ? "Заливка полигона вкл" : "Заливка полигона выкл"
}

function onLine() {
  switchLine = (switchLine) ? false : true;
  textButtonLine = (switchLine) ? "Линия вкл" : "Линия выкл"
  removePolygon()
}

function onPolygon() {
  switchPolygon = (switchPolygon) ? false : true;
  textButtonPolygon = (switchPolygon) ? "Полигон вкл" : "Полигон выкл"
  removeLine()
}

function removeLine() {
  if (switchLine) {
    switchLine = false
    textButtonLine = "Линия выкл"
  }
}

function removePolygon() {
  if (switchLine) {
    switchPolygon = false
    textButtonPolygon = "Полигон выкл"
  }
}

function changeKnotFigures() {
  checkKnotRect = (checkKnotRect === false) ? true : false;
}


//Очистка SVG поля для рисования
function buttonRemove() {
  window.location.reload()
}

let typeFigure = ""
let typeKnot = ""

function setTypeFigure(){
  if(switchLine){
    typeFigure = "ln"
  } else if(switchPolygon){
    typeFigure = "plg"
  } else {
    typeFigure = "lnpt"
  }
}

function setTypeKnot(){
  typeKnot = (checkKnotRect) ? "rct" : "crl"
}

class Field extends React.Component<IFieldProps, IFieldState> {

  constructor(props: IFieldProps) {
    super(props);

    this.state = {
      coordinateToArray: [],        //основной массив с координатами
    };

    this.setCoordinateToArray = this.setCoordinateToArray.bind(this);
  }

  //Сделать чек боксы для фигру + отрисовку вывести в отдельную функцию

  //ЗАПИСЬ КООРДИНАТ В МАССИВ

  setCoordinateToArray(event: React.MouseEvent) {
    let coordinateToArray = [...this.state.coordinateToArray]
    
    setTypeFigure()
    setTypeKnot()
    coordinateToArray.push({type: typeFigure, x: event.clientX, y: event.clientY, color: colorСircuit, colorFill: colorFillPolygon });
    coordinateToArray.push({type: typeKnot, x: event.clientX, y: event.clientY, color: colorСircuit, colorFill: "none" });

    this.setState({ coordinateToArray })
    console.log(coordinateToArray)
    return coordinateToArray
  }

  loadCoordinateAndColor() {
    let getCoordinateArray = JSON.parse(localStorage.getItem("CoordinateArray")!);
    this.setState({ coordinateToArray: [...getCoordinateArray]})

    let loadColor = localStorage.getItem("colorLocalStorage")!;
    let loadColorPolygonFill = localStorage.getItem("colorPolygonFillLocalStorage")!;

    console.log(this.state.coordinateToArray)

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

  render() {

    let arrayCoordinat = this.state.coordinateToArray
    let coordinateLine: JSX.Element[] = []
    let coordinatePolygon: string[] = []
    let coordinateLinePath: string = ""


    //Polygon
    function createPolygon(element: ICoordinates) {
      return (element.x + " " + element.y)
    }

    //Отрисовка линии path
    function createLinePath(element: ICoordinates, index: number) {
      let pointM = "M";
      let pointL = "L";
      return ((index === 0) ? pointM : pointL) + (element.x + " " + element.y)
    }

    
    // Соединения начальной точки и конечной с проверкой наличия двух отрисованных двух линий
    // let compoundPointLinePath = false;
    //ИСПОЛЬЗОВАТЬ КАЛЛ БЭК для отрисовки

    function completeLinePath() {
      if (arrayCoordinat.length > 2) {
        coordinateLinePath += " Z "
      } else {
        alert("нарисуйте минимум 2 линии")
      }
      return coordinateLinePath
    }

    //Отрисовка фигур по условиям
    function createFigures() {
      if (switchLine) {
        for (let index = 1; index < arrayCoordinat.length; index++) {
          coordinateLine.push(
            <line key={index} x1={arrayCoordinat[index - 1].x} x2={arrayCoordinat[index].x} y1={arrayCoordinat[index - 1].y} y2={arrayCoordinat[index].y} stroke={colorСircuit} fill={colorСircuit} strokeWidth="1" />
          )
          console.log("Line", coordinateLine)
        }
      } else {
        (switchPolygon)
          ?
          coordinatePolygon = arrayCoordinat.map(createPolygon)
          :
          coordinateLinePath += arrayCoordinat.map(createLinePath).join(" ")
      }
    }

    createFigures()

    //Рисование кружков или квадратов в узлах

    function createFiguresKnot(element: ICoordinates, index: number) {
      return (checkKnotRect)
        ? <rect key={index} x={element.x - 2} y={element.y - 2} width="5" height="5" fill={colorСircuit} stroke={colorСircuit} />
        : <circle key={index} cx={element.x} cy={element.y} r="5" fill={colorСircuit} stroke={colorСircuit} />
    }
    let paintFiguresKnot = arrayCoordinat.map(createFiguresKnot)

    //Сохранение в Local Storage

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

    const coordinatePolygonString = coordinatePolygon.join(" ")

    return (

      <div>

        <svg onClick={this.setCoordinateToArray} width="350" height="300" viewBox="0 0 350 300" xmlns="http://www.w3.org/2000/svg">
          {paintFiguresKnot}
          {coordinateLine}
          <polygon points={coordinatePolygonString} stroke={colorСircuit} fill={colorFillPolygon} strokeWidth="10" />
          <path id="line" d={coordinateLinePath} stroke={colorСircuit} />
        </svg>

        <label>Квадраты в узлах </label>
        <input type="checkbox" onChange={changeKnotFigures} />
        <br />

        <button className="buttonZ" onClick={() => completeLinePath()}>Соединить точки</button>
        <button className="colorRed" onClick={() => changeColor()}>{textButtonColor} </button>
        <br />

        <button className="save" onClick={() => saveCoordinateAndColor()}> Сохранить </button>
        <button className="save" onClick={() => this.loadCoordinateAndColor()}> Загрузить </button>
        <button className="save" onClick={() => buttonRemove()}> Очистить </button>
        <br />
        <button className="buttonPolygon" onClick={() => onPolygon()}> {textButtonPolygon} </button>
        <button className="buttonPolygon" onClick={() => changeFillPolygon()}> {textButtonFillPolygon} </button>

        <button className="save" onClick={() => onLine()}> {textButtonLine} </button>

      </div>
    );
  }
}

export default Field;