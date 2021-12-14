import React from "react";
// import Circle from "./Figures/Circle";


interface IPropsField {
    
    data: { x: number, y: number }[],

}

interface IStateField {
    coordineteForDrawing: {}[]

    drawingCircleCoordinate: {}[]
}


class FieldState extends React.Component<IPropsField, IStateField> {

    constructor(props: IPropsField) {
        super(props);

        this.state = {
            coordineteForDrawing: props.data,
            drawingCircleCoordinate: []
        }

        this.drawingCircle = this.drawingCircle.bind(this)
    };

    static getDerivedStateFromProps (props:any) {
        return ({coordineteForDrawing: props.data})
    }

    drawingCircle() {
        let drawingCircleCoordinate = this.props.data.map((item, index) => (<circle key={index} cx={this.props.data[index].x} cy={this.props.data[index].y} r="5" fill='black' stroke='black'></circle>))
        this.setState({ drawingCircleCoordinate: drawingCircleCoordinate })
        // console.log('drawingCircle')
        console.log("drawingCircleCoordinate", drawingCircleCoordinate)
        console.log("this.props.data", this.props.data)
    }



    render() {
        
        // console.log(this.props.data)
        return (
            <>
                <div>


                    {this.state.drawingCircleCoordinate}
                    {/* <Circle /> */}
                    {/* {drawingCircleCoordinate}
                        {drawingRectCoordinate}
                        {drawingLineCoordinate}
                        <polygon points={drawingPolygonCoordinate} stroke='black' fill='black' strokeWidth="10" />
                        <path id="line" d={drawingPathLineAdd} stroke='black' /> */}

                </div>
            </>
        )
    }

}

export default FieldState;