import React from "react";
import Circle from "./Figures/Circle";
// import FieldState from "./FieldState";
// import Button from "./Button";

function Coordinate() {
    let setCoordinate: { x: number, y: number }[] = []

    let drawingRectCoordinate: JSX.Element[] = []
    let drawingCircleCoordinate: JSX.Element[] = []
    let drawingLineCoordinate: JSX.Element[] = []

    let drawingPolygonCoordinate = "";
    let drawingPathLineAdd = "";

    function setCoordinateToArray(event: React.MouseEvent) {
        setCoordinate.push({ x: event.clientX, y: event.clientY })

    }

    function drawingPathLine() {
        let pointM = "M";
        let pointL = "L";

        setCoordinate.map((element: { x: number, y: number }, index: number) =>
            drawingPathLineAdd += ((index === 0) ? pointM : pointL) + setCoordinate[index].x + " " + setCoordinate[index].y
        )
    }

    function drawingCircle() {
        drawingCircleCoordinate = setCoordinate.map((element, index) => (<circle key={index} cx={setCoordinate[index].x} cy={setCoordinate[index].y} r="5" fill='black' stroke='black'></circle>))
        console.log(drawingCircleCoordinate)
    }

    function drawingRect() {
        drawingRectCoordinate = setCoordinate.map((element, index) => (<rect key={index} x={setCoordinate[index].x - 2} y={setCoordinate[index].y - 2} width="5" height="5" fill='black' stroke='black' />))
    }

    function drawingLine() {
        if (setCoordinate.length > 1) {
            for (let i = 1; i < setCoordinate.length; i++) {
                drawingLineCoordinate = setCoordinate.map((element, index) => (<line key={i} x1={setCoordinate[i - 1].x} x2={setCoordinate[i].x} y1={setCoordinate[i - 1].y} y2={setCoordinate[i].y} stroke="black" fill="transparent" strokeWidth="1" />))
            }
        }
    }

    function drawingPolygon() {
        setCoordinate.map((item, index) => {
            drawingPolygonCoordinate += setCoordinate[index].x + " " + setCoordinate[index].y + " "
            return drawingPolygonCoordinate
        })
    }

    function Click(event: React.MouseEvent) {
        setCoordinateToArray(event)
        drawingPathLine()
        drawingCircle()
        drawingLine()
        drawingRect()
        drawingPolygon()
        console.log(setCoordinate)
        console.log(drawingPathLineAdd)
        console.log('drawingCircleCoordinate', drawingCircleCoordinate)
        console.log(drawingRectCoordinate)
        console.log(drawingLineCoordinate)
        console.log(drawingPolygonCoordinate)
    }

    

    return (
        
        <>

            <svg onClick={Click} width="350" height="300" viewBox="0 0 350 300" xmlns="http://www.w3.org/2000/svg">
                {/* <FieldState data={setCoordinate}>
                {console.log}
                </FieldState> */}
                <Circle data = {drawingCircleCoordinate}/>


            </svg>

            {/* <Button /> */}

        </>
    )

}

export default Coordinate;