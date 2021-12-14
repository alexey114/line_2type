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
  loadPointLinePath: string,
  color: string,
  loadColor: string,
  colorPolygonFill: string,
  buttonRed: boolean,
  buttonSave: boolean,
  buttonLoad: boolean,
  buttonZ: boolean,
  selectorCircleRect: boolean,
  buttonPolygon: boolean,
  buttonLine: boolean,
  buttonPolygonColorText: boolean,
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

      loadPointLinePath: "", //сохранение в localStorage кординаты линии path
      color: "black",             //цвет линий
      loadColor: "",      //сохранение цвета в localStorage
      colorPolygonFill: "none",   //заливка полигона
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
    this.coordinateSave = this.coordinateSave.bind(this);
    this.coordinateLoad = this.coordinateLoad.bind(this);
    this.completeFigureButton = this.completeFigureButton.bind(this);
    this.drawingSvg = this.drawingSvg.bind(this);
    this.circles = this.circles.bind(this);
    this.rect = this.rect.bind(this);
    this.line = this.line.bind(this);
    this.buttonPolygonChange = this.buttonPolygonChange.bind(this);
    this.buttonLineChange = this.buttonLineChange.bind(this);
    this.buttonPolygonChangeFill = this.buttonPolygonChangeFill.bind(this);
    this.buttonRemovePolygon = this.buttonRemovePolygon.bind(this);
    this.buttonRemoveLine = this.buttonRemoveLine.bind(this);
  }

  

  //Сохранение в Local Storage

  coordinateSave() {
    if (setCoordinateArray.length > 0) {
      localStorage.setItem("drawingLinePathLocalStorage", this.state.drawingLinePath);
      localStorage.setItem("pointPolygonLocalStorage", this.state.drawingPolygon);

      localStorage.setItem("pointLineLocalStorage", JSON.stringify(this.state.drawingLine));
      localStorage.setItem("pointRectLocalStorage", JSON.stringify(this.state.drawingRect));
      localStorage.setItem("pointCircleLocalStorage", JSON.stringify(this.state.drawingCircle));

      localStorage.setItem("colorLocalStorage", this.state.color);

      this.buttonSave()
    } else {
      alert('нарисуйте минимум одну фигуру')
    }
  }

  //Загрузка из Local Storage

  coordinateLoad = () => {
    let loadPointLinePath = localStorage.getItem("drawingLinePathLocalStorage");
    let loadPointPolygon = localStorage.getItem("pointPolygonLocalStorage")!;

    let loadPointLine = JSON.parse(localStorage.getItem("pointLineLocalStorage")!);
    let loadPointCircle = JSON.parse(localStorage.getItem("pointCircleLocalStorage")!);
    let loadPointRect = JSON.parse(localStorage.getItem("pointRectLocalStorage")!);

    let loadColor = localStorage.getItem("colorLocalStorage")!;

    if (loadPointLinePath === null) {
      alert("LocalStorage пуст")
    } else {
      this.setState({ drawingLinePath: loadPointLinePath });
      this.setState({ drawingPolygon: loadPointPolygon });

      this.setState({ drawingLine: loadPointLine });
      console.log(loadPointLine)
      this.line()
      this.setState({ drawingCircle: loadPointCircle });
      console.log("drawingCircle", loadPointCircle)
      this.circles()
      this.setState({ drawingRect: loadPointRect });
      this.rect()

      if (loadColor !== this.state.color) {
        this.setState({ color: loadColor });
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
    window.location.reload()
  }

  //Изменение текста кнопки
  textChangeRed() {
    this.setState({ buttonRed: (this.state.buttonRed === false) ? true : false });
  }
  //Изменение цвета линий
  colorChange() {
    this.setState({ color: (this.state.color === "red") ? "black" : "red" });
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
    this.setState({ colorPolygonFill: (this.state.colorPolygonFill === "none") ? "blue" : "none" });
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

  //Помещение координат в массив

  

  //Блок с переключением форм для рисунка и формой узлов

  drawingSvg(event: React.MouseEvent) {

    addCoordinateToArray(event);

    //формы

    if (this.state.buttonPolygon === true) {
      this.polygon()
    } else if (this.state.buttonLine === true) {
      this.line();
    } else {
      this.pathLine();
    }

    //узлы

    if (this.state.selectorCircleRect === true) {
      this.circles()
    } else {
      this.rect()
    }
  }

  //Отрисовка линии path

  pathLine() {
    let drawingLinePath = "";
    let pointM = "M";
    let pointL = "L";

    setCoordinateArray.map((element: { x: number, y: number }, index: number) => {
      return drawingLinePath += ((index === 0) ? pointM : pointL) + setCoordinateArray[index].x + " " + setCoordinateArray[index].y
    })

    this.setState({ drawingLinePath: drawingLinePath })
  }

  //Line

  line() {
    const drawingLine: JSX.Element[] = []

    if (setCoordinateArray.length > 1) {
      for (let i = 1; i < setCoordinateArray.length; i++) {
        drawingLine.push(<line key={i} x1={setCoordinateArray[i - 1].x} x2={setCoordinateArray[i].x} y1={setCoordinateArray[i - 1].y} y2={setCoordinateArray[i].y} stroke={this.state.color} fill="transparent" strokeWidth="1" />)
      }
    }

    console.log('drawingLine', this.state.drawingLine)

    this.setState({ drawingLine: drawingLine })
  }

  //Polygon

  polygon() {
    let drawingPolygon = "";

    setCoordinateArray.map((element: { x: number, y: number, }, index: number) => {
      drawingPolygon += setCoordinateArray[index].x + " " + setCoordinateArray[index].y + " "
      return drawingPolygon
    })

    this.setState({ drawingPolygon: drawingPolygon })
  }

  //Кружки в узлых

  circles() {

    let drawingCircle = [];

    for (let i = 0; i < setCoordinateArray.length; i++) {
      drawingCircle.push(<circle key={i} cx={setCoordinateArray[i].x} cy={setCoordinateArray[i].y} r="5" fill={this.state.color} stroke={this.state.color}></circle>)
    }

    this.setState({ drawingCircle: drawingCircle })
  }

  //Квадраты в узлах

  rect() {

    let drawingRect = [];

    for (let i = 0; i < setCoordinateArray.length; i++) {
      drawingRect.push(<rect key={i} x={setCoordinateArray[i].x - 2} y={setCoordinateArray[i].y - 2} width="5" height="5" fill={this.state.color} stroke={this.state.color} />)
    }

    this.setState({ drawingRect: drawingRect })
  }



  render() {

    const drawingLine = this.state.drawingLinePath
    const colorFinal = this.state.color
    const buttonRedFinal = this.state.buttonRed
    const pointCircleFinal = this.state.drawingCircle;
    const pointRectFinal = this.state.drawingRect
    const pointLineFinal = this.state.drawingLine
    const pointPolygonFinal = this.state.drawingPolygon
    const buttonPolygonFinal = this.state.buttonPolygon
    const buttonLineFinal = this.state.buttonLine
    const buttonPolygonTextFinal = this.state.buttonPolygonColorText
    const colorPolygonFillFinal = this.state.colorPolygonFill

    return (

      <div>

        <svg onClick={this.drawingSvg} width="350" height="300" viewBox="0 0 350 300" xmlns="http://www.w3.org/2000/svg">
          {pointCircleFinal}
          {pointRectFinal}
          {pointLineFinal}
          <polygon points={pointPolygonFinal} stroke={colorFinal} fill={colorPolygonFillFinal} strokeWidth="10" />
          <path id="line" d={drawingLine} stroke={colorFinal} />
        </svg>

        <button className="buttonZ" onClick={() => this.completeFigureButton()}>Соединить точки</button>
        <button className="colorRed" onClick={() => this.colorChange()}>{buttonRedFinal ? "Красный вкл" : "Красный выкл"} </button>
        <br />
        <button className="save" onClick={() => this.coordinateSave()}> Сохранить </button>
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

  const setCoordinateArray: {x:number, y:number}[] = []

  function addCoordinateToArray(event:React.MouseEvent) {
    setCoordinateArray.push({ x: event.clientX, y: event.clientY });
  }

