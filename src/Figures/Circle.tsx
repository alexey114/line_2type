import React from "react";

interface IPropsField {
    data: JSX.Element[], //Тип переданных пропсов - объект массивов с кружками
}

interface IStateField {
    drawingCircleCoordinate: JSX.Element[] //Тип изначального state - объект массивов с кружками
}

class Circle extends React.Component<IPropsField, IStateField> {

    constructor(props: IPropsField) {
        super(props);

        this.state = {
            drawingCircleCoordinate: props.data  //передаю в текущее состояние пропсы (массив объектов с кружками)
        }

        this.drawingCircle = this.drawingCircle.bind(this) //bind с контекстом
    };

    static getDerivedStateFromProps (props:any) {          //метод отслеживающий изменение пропсов
        console.log('props.drawingCircleProps', props.data)
        return ({drawingCircleCoordinate: props.data})     //при обновлении пропсов присваиваем новое значение массиву объектов в компоненте
    }

    drawingCircle() {
        this.setState({ drawingCircleCoordinate: this.state.drawingCircleCoordinate }) //Присваивание нового значения массиву через setState
        console.log('this.state.drawingCircle', this.state.drawingCircleCoordinate)
    }


    render () {
            console.log('Circle:', this.props.data)
            let drawingCircleCoordinateFinal = this.state.drawingCircleCoordinate;  //избегаю использование state в return созданием новой переменной
        return (
            <>
            {drawingCircleCoordinateFinal} {/* передаю массив компонетов на отрисовку */}
            {/* <circle onClick = {this.drawingCircle} cx="10" cy="20" r="5" fill='black' stroke='black'></circle> */}
            </>
        )
    }
}

export default Circle;