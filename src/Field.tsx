import React, { useState, useEffect } from 'react'
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

  // let coordinateLine: JSX.Element[] = []             //Массив с координатами обычных линий для отрисовки
  let coordinatePolygon: string = ""                  //Строка с координатами полигона
  // let coordinateLinePath: string = ""                //Строка с координатами линии Path

  let colorСircuit = "black"                          //Цвет контуров
  let textButtonColor = "Красный выкл"                //Текст кнопки переключения цветов

  let colorFillPolygon = "none"                       //Цвет заливки
  let textButtonFillPolygon = "Заливка полигона выкл" //Текст кнопки переключения заливки 

  // let textButtonCloseLinePath = "Соединить точки"    //Текст кнопки закрытия линии Path

  let [windowSize, setWindowSize] = useState<number[]>([500, 500])                        //Отслеживание размера окна браузера
  let [coordinateToArray, setCoordinateArray] = useState<ICoordinate[]>([])  //ОСНОВНОЙ массив координат

  // let [buttonCloseLinePath, setButtonCloseLinePath] = useState(false)      //соединение PATH линий
  // let [selectFigure, setSelectFigure]  = useState('linePath')              //выбор по умолчанию для визуализации сложной линиия
  // let [selectKnot, setSelectKnot] = useState('circle')                     //выбор по умолчанию, для визуализации в узлах кружков
  let [buttonColor, setButtonColor] = useState(false)                       //переключение цвета контуров
  let [buttonFillColor, setButtonFillColor] = useState(false)               //переключение цвета заливки

  let [isDown, setIsDown] = useState(false)                                     //отслеживание нажата ли кнопка на узле
  let [isDownPolygon, setIsDownPolygon] = useState(false)                                     //отслеживание зажата ли кнопка на полигоне


  //Перетаскивание полигона

  //ОТСЛЕЖИВАНИЕ ИЗМЕНЕНИЯ РАЗМЕРА ОКНА БРАУЗЕРА ДЛЯ ПОСЛЕДУЮЩЕЙ АДАПТАЦИИ SVG ПОЛЯ ПОД НЕГО

  useEffect(() => {
    function changeWindow() {
      setWindowSize([window.innerWidth - 50, window.innerHeight - 100])
      console.log("window", window.innerWidth, window.innerHeight)
    }
    window.addEventListener("resize", changeWindow);
    changeWindow()
    return () => window.removeEventListener("resize", changeWindow);

  }, [])

  //ЗАПИСЬ КООРДИНАТ В МАССИВ

  function setCoordinateToArray(e: any) {
    if (!isDown && !isDownPolygon) {
      let offset = e.target.getBoundingClientRect() //отслеживание положения поля
      let coordinate = [...coordinateToArray]
      coordinate.push({ x: e.clientX - offset.left, y: e.clientY - offset.top })
      setCoordinateArray(coordinate)
      console.log("coordinateToArray из coordinate", coordinate)
    }
  }

  console.log("вне coordinateToArray", coordinateToArray)

  //ОТСЛЕЖИВАНИЕ ПЕРЕМЕЩЕНИЯ ПРИ НАЖАТОЙ КНОПКЕ МЫШИ

  function trackingCoordinatesMove(index: number, e: any) {
    let offset = e.target.getBoundingClientRect() //отслеживание положения поля  

    if (isDown) {
      let coordinate = [...coordinateToArray]
      coordinate.splice(index, 1, { x: e.clientX - offset.left, y: e.clientY - offset.top })
      setCoordinateArray(coordinate)
    }

    if (isDownPolygon) {
      let newCoordinatePolygonX = e.clientX - coordinateToArray[coordinateToArray.length - 1].x
      let newCoordinatePolygonY = e.clientY - coordinateToArray[coordinateToArray.length - 1].y

      let newCoordinatePolygon = coordinateToArray.map(function (element: ICoordinate, index: number) {
        let x = coordinateToArray[index].x + newCoordinatePolygonX
        let y = coordinateToArray[index].y + newCoordinatePolygonY
        return { x: x, y: y }
      })
      setCoordinateArray(newCoordinatePolygon)
    }
  }

  //ОТСЛЕЖИВАНИЕ ОТПУСКАНИЯ КНОПКИ

  function trackingCoordinatesUp(e: React.MouseEvent) {
    setIsDown(false)
    setIsDownPolygon(false)
    console.log('Up')
  }

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

  //ИЗМЕНЕНИЕ ЦВЕТА КОНТУРОВ И ТЕКСТА КНОПКИ

  function changeColor() {
    colorСircuit = (buttonColor) ? "red" : "black"
    textButtonColor = (buttonColor) ? "Красный вкл" : "Красный выкл"
  }
  changeColor()

  //ИЗМЕНЕНИЕ ЦВЕТА ЗАЛИВКИ И ТЕКСТА КНОПКИ

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

  //ПОЛИГОН ПРИ ПЕРЕТАСКИВАНИИ

  function downPolygon() {
    setIsDownPolygon(true)
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

  //РИСОВАНИЕ ПОЛИГОНОВ
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

  //РИСОВАНИЕ КРУЖКОВ

  function createFiguresKnot(element: ICoordinate, index: number) {
    return <circle key={index} onMouseDown={(e) => { downCircle(index, e) }} cx={element.x} cy={element.y} style={{ zIndex: 1000 }} r="20" fill={colorFillPolygon} stroke={colorСircuit} />
  }
  let paintFiguresKnot = coordinateToArray.map(createFiguresKnot)

  //ОТСЛЕЖИВАНИЕ НАЖАТИЯ КНОПКИ

  function downCircle(index: number, e: React.MouseEvent) {
    if (index >= 0) {
      setIsDown(true)
      console.log('Down')
    }
  }

  //СОХРАНЕНИЕ КООРДИНАТ
  function saveCoordinate() {
    if (coordinateToArray.length > 0) {
      localStorage.setItem("CoordinateArray", JSON.stringify(coordinateToArray))
      alert('Coxpaнено')
    } else {
      alert('нарисуйте минимум одну фигуру')
    }
  }

  console.log("finish")

  return (

    <div className='polygonFields' style={{ width: windowSize[0], height: windowSize[1] }}>
      <svg className='fieldsSVG' onMouseUp={trackingCoordinatesUp} onMouseMove={(e) => { trackingCoordinatesMove(index, e) }} onClick={setCoordinateToArray} width={windowSize[0]} height={windowSize[1]} xmlns="http://www.w3.org/2000/svg">
        {paintFiguresKnot}
        {/* <circle id="circle" onMouseDown={trackingCoordinatesDown} cx={newCoordinate.x} cy={newCoordinate.y} style={{zIndex:1000}} r="20" fill="black" stroke="black" /> */}
        {/* {coordinateLine} */}
        <polygon points={coordinatePolygon} onMouseDown={downPolygon} stroke={colorСircuit} fill={colorFillPolygon} strokeWidth="10" />
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

//Задачи:
//Когда полигон залит, переносим за заливку весь полигон
//За грань, где не было точки, делаем новую точку
//Если точка была, то меняем форму полигона перетаскивая точку
// Активная точка при выделении
//Удаление через кнопку DEL \ кнопка на меню