import React from "react";


interface IPropsButton {

}

export interface IStateButton {
    
}


class Button extends React.Component<IPropsButton, IStateButton> {


    render () {
        return (
            <div>        
            {/* <svg onClick={this.drawingSvg} width="350" height="300" viewBox="0 0 350 300" xmlns="http://www.w3.org/2000/svg">
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
            <button className="save" onClick={() => this.createArrayCoordinae()}> Test </button> */}
    
          </div>
        )
    }
}

export default Button;