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
  colorPolygonFill: string,
  buttonRed: boolean,
  buttonSave: boolean,
  buttonLoad: boolean,
  buttonZ: boolean,
  drawingCoordinate: string,
  pointCircle: {}[],
  pointCircleAdd: { x: number, y: number }[],
  pointCircleAddDrawing: { x: number, y: number }[],
  pointRect: {}[],
  pointRectAdd: { x: number, y: number }[],
  pointRectAddDrawing: { x: number, y: number }[],
  pointLine: {}[],
  pointLineAdd: { x: number, y: number }[],
  pointLineAddDrawing: { x: number, y: number }[],
  circleRect: boolean,
  pointPolygon: string,
  pointPolygonAdd: string,
  buttonPolygon: boolean,
  buttonLine: boolean,
  buttonPolygonColorText: boolean
}

export class Field extends React.Component<IFieldProps, IFieldState> {

  

  constructor(props: IFieldProps) {
    super(props);

    this.state = {
      addCoordinateArray: [],     //массив, в который передаю обновленное значение addCoordinate
      addCoordinate: [],          //массив, в который пушим кординаты x и y при каждом нажатии
      localStorageCoordinate: "", //сохранение в localStorage кординаты линии path
      color: "black",             //цвет линий
      localStorageColor: "",      //сохранение цвета в localStorage
      colorPolygonFill: "none",   //заливка полигона
      buttonRed: false,           //кнопка переключения на красный цвет
      buttonSave: false,          //кнопка сохранения в localStorage
      buttonLoad: false,          //кнопка загрузки из localStorage
      buttonZ: false,             //кнопка соединения линий path
      drawingCoordinate: "",      //строка с координатами path
      pointCircle: [],            //массив для отрисовки кружков в узлах через setState
      pointCircleAdd: [],         //массив с координатами x и y для отрисовки кружков в узлах
      pointCircleAddDrawing: [],  //массив с кружками в HTML формате
      pointRect: [],              //массив для отрисовки квадратов в узлах через setState
      pointRectAdd: [],           //массив с координатами x и y для отрисовки квадратов в узлах
      pointRectAddDrawing: [],    //массив с квардратами в HTML формате
      pointLine: [],              //массив для отрисовки обычных линий через setState
      pointLineAdd: [],           //массив с координатами x и y для отрисовки обычных линий
      pointLineAddDrawing: [],    //массив с линиями в HTML формате
      circleRect: true,           //флаг переключения с кругов на квадраты в узлах
      pointPolygon: "",           //строка с координатами Polygon
      pointPolygonAdd: "",        //строка с координатами Polygon, куда через map передаю точки addCoordinateArray
      buttonPolygon: false,       //активация рисования Polygon
      buttonLine: false,          //активация рисования обычной линии
      buttonPolygonColorText: false,  //изменение цвета заливки Polygon
    };

    this.textChangeRed = this.textChangeRed.bind(this);
    this.buttonSave = this.buttonSave.bind(this);
    this.colorChange = this.colorChange.bind(this);
    this.addCoordinateToArray = this.addCoordinateToArray.bind(this);
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

    // this.createArrayCoordinae = this.createArrayCoordinae.bind(this);

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

  //Сохранение в Local Storage

  coordinateSave() {
    if (this.state.addCoordinate.length > 0) {
      localStorage.setItem("drawingCoordinateLocalStorage", this.state.drawingCoordinate);
      localStorage.setItem("pointPolygonLocalStorage", this.state.pointPolygon);

      localStorage.setItem("pointLineLocalStorage", JSON.stringify(this.state.pointLineAdd));
      localStorage.setItem("pointRectLocalStorage", JSON.stringify(this.state.pointRectAdd));
      localStorage.setItem("pointCircleLocalStorage", JSON.stringify(this.state.pointCircleAdd));

      localStorage.setItem("colorLocalStorage", this.state.color);

      this.buttonSave()
    } else {
      alert('нарисуйте минимум одну линию')
    }
  }

  //Загрузка из Local Storage

  coordinateLoad = () => {
    let localStorageCoordinate = localStorage.getItem("drawingCoordinateLocalStorage");
    let loadPointPolygon = localStorage.getItem("pointPolygonLocalStorage")!;

    let loadPointLine = JSON.parse(localStorage.getItem("pointLineLocalStorage")!);
    let loadPointCircle = JSON.parse(localStorage.getItem("pointCircleLocalStorage")!);
    let loadPointRect = JSON.parse(localStorage.getItem("pointRectLocalStorage")!);

    let localStorageColor = localStorage.getItem("colorLocalStorage")!;

    if (localStorageCoordinate === null) {
      alert("LocalStorage пуст")
    } else {
      this.setState({ drawingCoordinate: localStorageCoordinate });
      this.setState({ pointPolygon: loadPointPolygon });

      this.setState({ pointLineAdd: loadPointLine });
      console.log(loadPointLine)
      this.line()
      this.setState({ pointCircleAdd: loadPointCircle });
      this.circles()
      this.setState({ pointRectAdd: loadPointRect });
      this.rect()

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

    this.setState({ pointPolygon: "" });
    this.setState({ pointLine: [] });

    this.setState({ pointRect: [] });
    this.setState({ pointCircle: [] });
  }

  //Переключение на рисование Polygon со сбросом текста кнопки линии

  buttonPolygonChange() {
    this.setState({ buttonPolygon: (this.state.buttonPolygon === false) ? true : false });
    this.setState({ buttonLine: false });
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
    this.setState({ buttonPolygon: false });
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

  //Помещение координат в массив

  addCoordinateToArray(event: React.MouseEvent) {
    this.state.addCoordinate.push({ x: event.clientX, y: event.clientY });
    this.setState({ addCoordinateArray: this.state.addCoordinate })
  }

  //Блок с переключением форм для рисунка и формой узлов

  drawingSvg(event: React.MouseEvent) {

    this.addCoordinateToArray(event);

    //формы

    if (this.state.buttonPolygon === true) {
      this.polygon()
    } else if (this.state.buttonLine === true) {
      this.line();
    } else {
      this.pathLine();
    }

    //узлы

    if (this.state.circleRect === true) {
      this.circles()
    } else {
      this.rect()
    }
  }

  //Отрисовка линии path

  pathLine() {
    let drawingCoordinateAdd = "";
    let pointM = "M";
    let pointL = "L";

    this.state.addCoordinateArray.map((element: { x: number, y: number }, index: number) => {
      return drawingCoordinateAdd += ((index === 0) ? pointM : pointL) + this.state.addCoordinateArray[index].x + " " + this.state.addCoordinateArray[index].y
    })

    this.setState({ drawingCoordinate: drawingCoordinateAdd })
  }

  //Line

  line() {
    let pointLineAdd = [];
    let pointLineAddDrawing = [];

    for (let i = 0; i < this.state.addCoordinateArray.length; i++) {
      pointLineAdd.push({ x: this.state.addCoordinateArray[i].x, y: this.state.addCoordinateArray[i].y })
    }

    if (pointLineAdd.length > 1) {
      for (let i = 1; i < pointLineAdd.length; i++) {
        pointLineAddDrawing.push(<line key={i} x1={pointLineAdd[i - 1].x} x2={pointLineAdd[i].x} y1={pointLineAdd[i - 1].y} y2={pointLineAdd[i].y} stroke={this.state.color} fill="transparent" strokeWidth="1" />)
      }
    }

    this.setState({ pointLineAdd: pointLineAdd })
    this.setState({ pointLine: pointLineAddDrawing })
  }

  //Polygon

  polygon() {
    let pointPolygonAdd = "";


    this.state.addCoordinateArray.map((element: { x: number, y: number, }, index: number) => {
      pointPolygonAdd += this.state.addCoordinateArray[index].x + " " + this.state.addCoordinateArray[index].y + " "
      return pointPolygonAdd
    })

    this.setState({ pointPolygon: pointPolygonAdd })
  }

  //Кружки в узлых

  circles() {

    let pointCircleAdd = [];
    let pointCircleAddDrawing = [];

    for (let i = 0; i < this.state.addCoordinateArray.length; i++) {
      pointCircleAdd.push({ x: this.state.addCoordinateArray[i].x, y: this.state.addCoordinateArray[i].y })
    }

    for (let i = 0; i < this.state.pointCircleAdd.length; i++) {
      pointCircleAddDrawing.push(<circle key={i} cx={pointCircleAdd[i].x} cy={pointCircleAdd[i].y} r="5" fill={this.state.color} stroke={this.state.color}></circle>)
    }

    this.setState({ pointCircleAdd: pointCircleAdd })
    this.setState({ pointCircle: pointCircleAddDrawing })
  }

  //Квадраты в узлах

  rect() {

    let pointRectAdd = [];
    let pointRectAddDrawing = [];

    for (let i = 0; i < this.state.addCoordinateArray.length; i++) {
      pointRectAdd.push({ x: this.state.addCoordinateArray[i].x, y: this.state.addCoordinateArray[i].y })
    }

    for (let i = 0; i < pointRectAdd.length; i++) {
      pointRectAddDrawing.push(<rect key={i} x={pointRectAdd[i].x - 2} y={pointRectAdd[i].y - 2} width="5" height="5" fill={this.state.color} stroke={this.state.color} />)
    }

    this.setState({ pointCircleAdd: pointRectAdd })
    this.setState({ pointRect: pointRectAddDrawing })
  }


  render() {

    

    // function createArrayCoordinae(event:React.MouseEvent){
    //   const arrayCoordinate = [];
    //   arrayCoordinate.push({ x: event.clientX, y: event.clientY });
    //   console.log(arrayCoordinate)
    //   return arrayCoordinate    }



    const drawingLine = this.state.drawingCoordinate
    const colorFinal = this.state.color
    const buttonRedFinal = this.state.buttonRed
    const pointCircleFinal = this.state.pointCircle;
    const pointRectFinal = this.state.pointRect

    const pointLineFinal = this.state.pointLine
    const pointPolygonFinal = this.state.pointPolygon
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
        {/* <button className="save" onClick={() => this.createArrayCoordinae()}> Test </button> */}

      </div>
    );
  }
}

export default Field;