import React from "react";

interface IPropsField {    
    data: {}[],
}

interface IStateField {
    drawingCircleCoordinate: {}[]
}

class Circle extends React.Component<IPropsField, IStateField> {

    constructor(props: IPropsField) {
        super(props);

        this.state = {
            drawingCircleCoordinate: props.data
        }

        this.drawingCircle = this.drawingCircle.bind(this)
    };

    static getDerivedStateFromProps (props:any) {
        console.log('props.drawingCircleProps', props.data)
        return ({drawingCircleCoordinate: props.data})
    }

    drawingCircle() {
        this.setState({ drawingCircleCoordinate: this.state.drawingCircleCoordinate })
        console.log('this.state.drawingCircle', this.state.drawingCircleCoordinate)
    }


    render () {
            console.log('Circle:', this.props.data)
            let drawingCircleCoordinateFinal = this.state.drawingCircleCoordinate;
        return (
            <>
            
            {drawingCircleCoordinateFinal}
            <circle onClick = {this.drawingCircle} cx="10" cy="20" r="5" fill='black' stroke='black'></circle>
            {/* <div onClick = {this.drawingCircle} style={{width: "350px", height: "350px"}}></div>
            <button className="save" onClick={()=>this.drawingCircle()}> Очистить </button> */}
            </>
        )
    }
}

export default Circle;