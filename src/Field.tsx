import React, { useState, useLayoutEffect } from 'react'
import './Field.css'
import './Button.css'

// interface IFieldState {
//   coordinateToArray: ICoordinate[],
//   selectFigure: string,
//   selectKnot: string,
//   buttonColor: boolean,
//   buttonFillColor: boolean,
//   buttonCloseLinePath: boolean,
// }
interface ICoordinate {
  x: number,
  y: number
}

function Field() {

  // let coordinateLine: JSX.Element[] = []  //Массив с координатами обычных линий для отрисовки
  let coordinatePolygon: string = ""      //Строка с координатами полигона
  // let coordinateLinePath: string = ""     //Строка с координатами линии Path

  let colorСircuit = "black"              //Цвет контуров
  let textButtonColor = "Красный выкл"    //Текст кнопки переключения цветов

  let colorFillPolygon = "none"           //Цвет заливки
  let textButtonFillPolygon = "Заливка полигона выкл" //Текст кнопки переключения заливки 

  // let textButtonCloseLinePath = "Соединить точки"     //Текст кнопки закрытия линии Path

  let [windowSize, setWindowSize] = useState([0, 0])                   //Отслеживание размера окна браузера
  let [coordinateToArray, setCoordinateArray] = useState([{ x: 0, y: 0 }]) //ОСНОВНОЙ массив координат
  // let [buttonCloseLinePath, setButtonCloseLinePath] = useState(false)      //соединение PATH линий
  // let [selectFigure, setSelectFigure]  = useState('linePath')              //выбор по умолчанию для визуализации сложной линиия
  // let [selectKnot, setSelectKnot] = useState('circle')                     //выбор по умолчанию, для визуализации в узлах кружков
  let [buttonColor, setButtonColor] = useState(false)                      //переключение цвета контуров
  let [buttonFillColor, setButtonFillColor] = useState(false)              //переключение цвета заливки

  //ЗАПИСЬ КООРДИНАТ В МАССИВ

  function setCoordinateToArray(event: any) {
    let offset = event.target.getBoundingClientRect() //отслеживание положения поля
    let coordinate = [...coordinateToArray]
    coordinate.push({ x: event.clientX - offset.left, y: event.clientY - offset.top })
    setCoordinateArray(coordinate)
  }

  useLayoutEffect(() => {
    //Изменение размера окна браузераы
    function changeWindow() {
        setWindowSize([window.innerWidth - 50, window.innerHeight - 100])
        console.log(window.innerWidth, window.innerHeight)
    }
    window.addEventListener("resize", changeWindow);
    changeWindow()
    return () => window.removeEventListener("resize", changeWindow);

  }, [])

  //СОЕДИНЕНИЕ ЛИНИЙ
  // function setCloseLinePath() {
  //   setButtonCloseLinePath((buttonCloseLinePath) ? false : true)
  // }

  //ВЫБОР ФИГУРЫ ЧЕРЕЗ SELECT
  // function handleChangeFigure(event: React.ChangeEvent<HTMLSelectElement>) {
  //   setSelectFigure( event.target.value )
  // }

  //ВЫБОР УЗЛА ЧЕРЕЗ SELECT
  // function handleChangeKnot(event: React.ChangeEvent<HTMLSelectElement>) {
  //   setSelectKnot( event.target.value )
  //   console.log(event.target.value)
  // }

  //ИЗМЕНЕНИЕ ЦВЕТА КОНТУРА
  function setColor() {
    setButtonColor((buttonColor) ? false : true)
  }

  //ИЗМЕНЕНИЕ ЦВЕТА ЗАЛИВКИ
  function setColorFill() {
    setButtonFillColor((buttonFillColor) ? false : true)
  }

  //ЗАГРУЗКА КООРДИНАТ ИЗ LOCAL STORAGE
  function loadCoordinate() {
    let getCoordinateArray = JSON.parse(localStorage.getItem("CoordinateArray")!)
    if (getCoordinateArray === null) {
      alert("Local Storage пуст")
    } else {
      setCoordinateArray(getCoordinateArray)
    }
  }

  function changeColor() {
    colorСircuit = (buttonColor) ? "red" : "black"
    textButtonColor = (buttonColor) ? "Красный вкл" : "Красный выкл"
  }
  changeColor()

  function changeFillPolygon() {
    colorFillPolygon = (buttonFillColor) ? "blue" : "none"
    textButtonFillPolygon = (buttonFillColor) ? "Заливка полигона вкл" : "Заливка полигона выкл"
  }
  changeFillPolygon()

  // function changeCloseLinePath(){
  //   if(selectFigure === 'linePath'){
  //     if (coordinateToArray.length > 2) {
  //       textButtonCloseLinePath = (buttonCloseLinePath)?"Убрать соединение" : "Соединить точки"
  //       }
  //   }
  // }
  // changeCloseLinePath()

  //Очистка SVG поля для рисования
  function buttonRemove() {
    window.location.reload()
  }

  //Polygon
  function createPolygon(element: ICoordinate) {
    return (element.x + " " + element.y)
  }

  //Отрисовка линии path
  // function createLinePath(element: ICoordinate, index: number) {
  //   let pointM = "M"
  //   let pointL = "L"
  //   return ((index === 0) ? pointM : pointL) + (element.x + " " + element.y)
  // }

  //Отрисовка фигур по условиям
  // function createFigures() {
  //   if (selectFigure === 'line') {
  //     for (let index = 1; index < coordinateToArray.length; index++) {
  //       coordinateLine.push(
  //         <line key={index} x1={coordinateToArray[index - 1].x} x2={coordinateToArray[index].x} y1={coordinateToArray[index - 1].y} y2={coordinateToArray[index].y} stroke={colorСircuit} fill={colorFillPolygon} strokeWidth="1" />
  //       )
  //       console.log("Line", coordinateLine)
  //     }
  //   } else {
  //     (selectFigure === 'polygon')
  //       ?
  //       coordinatePolygon += coordinateToArray.map(createPolygon).join(" ")
  //       :
  //       coordinateLinePath += coordinateToArray.map(createLinePath).join(" ")
  //     console.log(coordinateLinePath)
  //     if (buttonCloseLinePath === true) {
  //       if (coordinateToArray.length > 2) {
  //         coordinateLinePath += " Z "
  //         console.log(coordinateLinePath)
  //       } else {
  //         alert("нарисуйте минимум 2 линии")
  //       }
  //     }
  //   }
  // }

  // createFigures()

  //Рисование ПОЛИГОНОВ

  function createFigures() {
    coordinatePolygon += coordinateToArray.map(createPolygon).join(" ")
  }
  createFigures()


  //Рисование кружков или квадратов в узлах

  // function createFiguresKnot(element: ICoordinate, index: number) {
  //   return (selectKnot === 'circle')
  //     ? <circle key={index} cx={element.x} cy={element.y} r="5" fill={colorFillPolygon} stroke={colorСircuit} />
  //     : <rect key={index} x={element.x - 2} y={element.y - 2} width="5" height="5" fill={colorFillPolygon} stroke={colorСircuit} />
  // }
  // let paintFiguresKnot = coordinateToArray.map(createFiguresKnot)

  //СОХРАНЕНИЕ КООРДИНАТ
  function saveCoordinate() {
    if (coordinateToArray.length > 0) {
      localStorage.setItem("CoordinateArray", JSON.stringify(coordinateToArray))
      alert('Coxpaнено')
    } else {
      alert('нарисуйте минимум одну фигуру')
    }
  }

  return (

    <div className='polygonFields' style={{ width: windowSize[0], height: windowSize[1] }}>
      <svg className='fieldsSVG' onClick={setCoordinateToArray} width={windowSize[0]} height={windowSize[1]} xmlns="http://www.w3.org/2000/svg">
        {/* {paintFiguresKnot} */}
        {/* {coordinateLine} */}
        <polygon points={coordinatePolygon} stroke={colorСircuit} fill={colorFillPolygon} strokeWidth="10" />
        {/* <path id="line" d={coordinateLinePath} fill={colorFillPolygon} stroke={colorСircuit} /> */}
      </svg>

      <div className='buttonBox'>
        {/* <label>
          Выберите фигуру для рисования:
          <select value={selectFigure} onChange={handleChangeFigure}>
            <option value="line">Линия</option>
            <option value="linePath">Линия сложная</option>
            <option value="polygon">Полигон</option>
          </select>
        </label>
        <br />

        <label>
          Выберите фигуру в узлах:
          <br />
          <select value={selectKnot} onChange={handleChangeKnot}>
            <option value="circle">Кружок</option>
            <option value="rect">Квадратик</option>
          </select>
        </label>
        <br /> */}

        {/* <button className="buttonZ" onClick={() => setCloseLinePath()}>{textButtonCloseLinePath}</button> */}
        <br />

        <button className="colorRed" onClick={() => setColor()}>{textButtonColor} </button>
        <button className="buttonPolygon" onClick={() => setColorFill()}> {textButtonFillPolygon} </button>
        <br />

        <button className="save" onClick={() => saveCoordinate()}> Сохранить </button>
        <button className="save" onClick={() => loadCoordinate()}> Загрузить </button>
        <button className="save" onClick={() => buttonRemove()}> Очистить </button>
        <br />
      </div>
    </div>
  )
}

export default Field