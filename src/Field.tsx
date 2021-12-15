import React from 'react';
import './Field.css';
import './Button.css';

interface IFieldProps {
}

interface IFieldState {
  drawingLinePath: string,
  drawingPolygon: string,
  drawingCircle: JSX.Element[],
  drawingRect: JSX.Element[],
  drawingLine: JSX.Element[],
  buttonRed: boolean,
  buttonSave: boolean,
  buttonLoad: boolean,
  buttonZ: boolean,
  selectorCircleRect: boolean,
  buttonPolygon: boolean,
  buttonLine: boolean,
  buttonPolygonColorText: boolean,
}

//Помещение координат в массив

let setCoordinateArray: { x: number, y: number }[] = []
let color = "black";
let colorPolygonFill = "none";

let drawingCircleCoordinate: JSX.Element[] = []
let drawingRectCoordinate: JSX.Element[] = []


function addCoordinateToArray(event: React.MouseEvent) {
  setCoordinateArray.push({ x: event.clientX, y: event.clientY });
}

function applicationCircle() {
  drawingCircleCoordinate = setCoordinateArray.map((element, index) => (<circle key={index} cx={setCoordinateArray[index].x} cy={setCoordinateArray[index].y} r="5" fill='black' stroke='black'></circle>))
}

function applicationRect() {
  drawingRectCoordinate = setCoordinateArray.map((element, index) => (<rect key={index} x={setCoordinateArray[index].x - 2} y={setCoordinateArray[index].y - 2} width="5" height="5" fill='black' stroke='black' />))
}

//Сохранение в Local Storage

function saveCoordinateAndColor() {
  if (setCoordinateArray.length > 0) {
    localStorage.setItem("CoordinateArray", JSON.stringify(setCoordinateArray));
    localStorage.setItem("colorLocalStorage", color);
    localStorage.setItem("colorPolygonFillLocalStorage", colorPolygonFill);
    alert('Coxpaнено')
  } else {
    alert('нарисуйте минимум одну фигуру')
  }
}

//Загрузка из Local Storage

function loadCoordinateAndColor() {
  let getCoordinateArray = JSON.parse(localStorage.getItem("CoordinateArray")!);
  setCoordinateArray = getCoordinateArray;

  let loadColor = localStorage.getItem("colorLocalStorage")!;
  let loadColorPolygonFill = localStorage.getItem("colorPolygonFillLocalStorage")!;

  if (setCoordinateArray === null) {
    alert("LocalStorage пуст")
  } else {
    if (loadColor !== color) {
      color = (color === "red") ? "black" : "red";
    }
    if (loadColorPolygonFill !== colorPolygonFill) {
      colorPolygonFill = (colorPolygonFill === "blue") ? "none" : "blue";
    }
  }
}

class Field extends React.Component<IFieldProps, IFieldState> {

  constructor(props: IFieldProps) {
    super(props);

    this.state = {
      drawingCircle: [],  //массив с кружками в HTML формате
      drawingRect: [],    //массив с квардратами в HTML формате
      drawingLine: [],    //массив с линиями в HTML формате
      drawingLinePath: "",      //строка с координатами path для отрисовки
      drawingPolygon: "",        //строка с координатами Polygon, куда через map передаю точки setCoordinateArray
      buttonRed: false,           //кнопка переключения на красный цвет
      buttonSave: false,          //кнопка сохранения в localStorage
      buttonLoad: false,          //кнопка загрузки из localStorage
      buttonZ: false,             //кнопка соединения линий path
      selectorCircleRect: true,           //флаг переключения с кругов на квадраты в узлах
      buttonPolygon: false,       //активация рисования Polygon
      buttonLine: false,          //активация рисования обычной линии
      buttonPolygonColorText: false,  //изменение цвета заливки Polygon
    };

    this.textChangeRed = this.textChangeRed.bind(this);
    this.buttonSave = this.buttonSave.bind(this);
    this.colorChange = this.colorChange.bind(this);
    this.completeFigureButton = this.completeFigureButton.bind(this);
    this.drawingSvg = this.drawingSvg.bind(this);
    this.applicationPathLine = this.applicationPathLine.bind(this);
    this.applicationCirclesState = this.applicationCirclesState.bind(this);
    this.applicationRectState = this.applicationRectState.bind(this);
    this.applicationLineState = this.applicationLineState.bind(this);
    this.buttonPolygonChange = this.buttonPolygonChange.bind(this);
    this.buttonLineChange = this.buttonLineChange.bind(this);
    this.buttonPolygonChangeFill = this.buttonPolygonChangeFill.bind(this);
    this.buttonRemovePolygon = this.buttonRemovePolygon.bind(this);
    this.buttonRemoveLine = this.buttonRemoveLine.bind(this);
  }

  //Кнопка сохранения в Local Storage

  buttonSave() {
    this.setState({ buttonSave: true });
    saveCoordinateAndColor()
  }

  //Кнопка загрузки из Local Storage

  buttonLoad() {
    this.setState({ buttonLoad: true });
    loadCoordinateAndColor();
    // this.applicationPathLine()
    this.applicationPathLine()
    this.applicationCirclesState()

    if (colorPolygonFill === "blue") {
      this.setState({ buttonPolygonColorText: true })
    } else if (colorPolygonFill === "none") {
      this.setState({ buttonPolygonColorText: false })
    }
    if (color === "red") {
      this.setState({ buttonRed: true })
    } else if (color === "black") {
      this.setState({ buttonRed: false })
    }
  }

  //Очистка SVG поля для рисования

  buttonRemove() {
    window.location.reload()
  }

  //Изменение текста кнопки
  textChangeRed() {
    this.setState({ buttonRed: (this.state.buttonRed === false) ? true : false });
  }
  //Изменение цвета линий
  colorChange() {
    color = (color === "red") ? "black" : "red";
    this.textChangeRed()
  }

  //Переключение на рисование Polygon со сбросом текста кнопки линии

  buttonPolygonChange() {
    this.setState({ buttonPolygon: (this.state.buttonPolygon === false) ? true : false });
    this.buttonRemoveLine()
  }

  //Вкл\выкл заливки Polygon (текст и цвет)

  buttonPolygonChangeFill() {
    this.setState({ buttonPolygonColorText: (this.state.buttonPolygonColorText === false) ? true : false });
    this.buttonPolygonChangeFillColor()
  }

  //Изменение цвета заливки Polygon

  buttonPolygonChangeFillColor() {
    colorPolygonFill = (colorPolygonFill === "blue") ? "none" : "blue";
  }

  //Вкл\выкл рисования обычных линий и сброс рисования Polygon

  buttonLineChange() {
    this.setState({ buttonLine: (this.state.buttonLine === false) ? true : false });
    this.buttonRemovePolygon()
  }

  buttonRemovePolygon() {
    this.setState({ buttonPolygon: false })
  }

  buttonRemoveLine() {
    this.setState({ buttonLine: false })
  }

  //Кнопка соединения начальной точки и конечной

  completeFigureText() {
    this.setState(() => { return { buttonZ: true } });
  }

  //Соединения начальной точки и конечной с проверкой наличия двух отрисованных двух линий

  completeFigureButton() {

    if (this.state.drawingLinePath.length > 2) {
      this.setState({ drawingLinePath: this.state.drawingLinePath.concat("Z") });
      this.completeFigureText();
    } else {
      alert("нарисуйте минимум 2 линии")
    }
  }

  //Блок с переключением форм для рисунка и формой узлов

  drawingSvg(event: React.MouseEvent) {

    addCoordinateToArray(event);

    //формы

    if (this.state.buttonPolygon === true) {
      this.applicationPolygon()
    } else if (this.state.buttonLine === true) {
      this.applicationLineState();
    } else {
      this.applicationPathLine();
    }

    //узлы

    if (this.state.selectorCircleRect === true) {
      this.applicationCirclesState()
    } else {
      this.applicationRectState()
    }
  }

  //Отрисовка линии path

  applicationPathLine() {
    let drawingLinePathPoint = "";
    let pointM = "M";
    let pointL = "L";

    setCoordinateArray.map((element: { x: number, y: number }, i: number) => {
      let indexArray = setCoordinateArray[i];
      return drawingLinePathPoint += ((i === 0) ? pointM : pointL) + indexArray.x + " " + indexArray.y
    })

    console.log("drawingLinePathPoint", drawingLinePathPoint)
    console.log("drawingLinePath", this.state.drawingLinePath)
    console.log("setCoordinateArray", setCoordinateArray)

    this.setState({ drawingLinePath: drawingLinePathPoint })
  }

  //Line

  applicationLineState() {
    const drawingLinePoint: JSX.Element[] = []

    if (setCoordinateArray.length > 1) {
      for (let i = 1; i < setCoordinateArray.length; i++) {
        let indexArray = setCoordinateArray[i]
        let indexArrayMinus = setCoordinateArray[i - 1]
        drawingLinePoint.push(<line key={i} x1={indexArrayMinus.x} x2={indexArray.x} y1={indexArrayMinus.y} y2={indexArray.y} stroke={color} fill={color} strokeWidth="1" />)
      }
    }

    console.log('drawingLine', this.state.drawingLine)

    this.setState({ drawingLine: drawingLinePoint })
  }

  //Polygon

  applicationPolygon() {
    let drawingPolygonPoint = "";

    setCoordinateArray.map((element: { x: number, y: number, }, i: number) => {
      let indexArray = setCoordinateArray[i]
      drawingPolygonPoint += indexArray.x + " " + indexArray.y + " "
      return drawingPolygonPoint
    })

    this.setState({ drawingPolygon: drawingPolygonPoint })
  }

  //Кружки в узлых

  applicationCirclesState() {
    applicationCircle()
    this.setState({ drawingCircle: drawingCircleCoordinate })
  }

  //Квадраты в узлах

  applicationRectState() {
    applicationRect()
    this.setState({ drawingRect: drawingRectCoordinate })
  }

  render() {

    const drawingLinePathFinal = this.state.drawingLinePath
    const buttonRedFinal = this.state.buttonRed
    const pointCircleFinal = this.state.drawingCircle;
    const pointRectFinal = this.state.drawingRect
    const pointLineFinal = this.state.drawingLine
    const pointPolygonFinal = this.state.drawingPolygon
    const buttonPolygonFinal = this.state.buttonPolygon
    const buttonLineFinal = this.state.buttonLine
    const buttonPolygonTextFinal = this.state.buttonPolygonColorText

    return (

      <div>

        <svg onClick={this.drawingSvg} width="350" height="300" viewBox="0 0 350 300" xmlns="http://www.w3.org/2000/svg">
          {pointCircleFinal}
          {pointRectFinal}
          {pointLineFinal}
          <polygon points={pointPolygonFinal} stroke={color} fill={colorPolygonFill} strokeWidth="10" />
          <path id="line" d={drawingLinePathFinal} stroke={color} />
        </svg>

        <button className="buttonZ" onClick={() => this.completeFigureButton()}>Соединить точки</button>
        <button className="colorRed" onClick={() => this.colorChange()}>{buttonRedFinal ? "Красный вкл" : "Красный выкл"} </button>
        <br />
        <button className="save" onClick={() => this.buttonSave()}> Сохранить </button>
        <button className="save" onClick={() => this.buttonLoad()}> Загрузить </button>
        <button className="save" onClick={() => this.buttonRemove()}> Очистить </button>
        <br />
        <button className="buttonPolygon" onClick={() => this.buttonPolygonChange()}> {buttonPolygonFinal ? "Полигон вкл" : "Полигон выкл"} </button>
        <button className="buttonPolygon" onClick={() => this.buttonPolygonChangeFill()}> {buttonPolygonTextFinal ? "Заливка полигона вкл" : "Заливка полигона выкл"} </button>

        <button className="save" onClick={() => this.buttonLineChange()}> {buttonLineFinal ? "Линия вкл" : "Линия выкл"} </button>

      </div>
    );
  }
}

export default Field;