import React, {useState} from "react";
import './Button.css';

export interface ButtonClose {
    className: string;
    onClick: () => void;
    button: boolean;
    setButton: boolean;
    color: any;
    setColor: any;
}


const Button = ()=> {

    const [buttonZ, setButtonZ] = useState(false);
    const [buttonBlack, setButtonRed] = useState(false);
    const [color, setColor] = useState("black");
    // const [buttonGreen, setButtonGreen] = useState(false);
    // const [buttonBlue, setButtonBlue] = useState(false);

    const toggleButtonZ = () => {
        setButtonZ(!buttonZ);
    }

    const toggleButtonRed = () => {
        setButtonRed(!buttonBlack)
         const changeColor = (color:any)=> {
            setColor("red")
        }
    }
    // const toggleButtonGreen = () => setButtonGreen(!buttonGreen)
    // const toggleButtonBlue = () => setButtonBlue(!buttonBlue)
    
//--------------------------------------------------------------------

    // click.addEventListener("click", function() {
    //     yes_no.innerHTML = !button;
    //     button = !button;
    //   })
    
    //   function ClearGreen() {
    //     color_green_yes_no.innerHTML = !green;
    //     green = false;
    //   }
    
    //   function ClearBlack () {
    //     color_black_yes_no.innerHTML = !black;
    //     black = false;
    //   }
    
    //   function ClearBlue () {
    //     color_blue_yes_no.innerHTML = !blue;
    //     blue = false;
    //   }
    
    //   color_black.addEventListener("click", function() {
    //     color_black_yes_no.innerHTML = !black;
    //     if(green === true && blue === true) {
    //         ClearBlue ()
    //         ClearGreen()
    //     } else if (green === true) {
    //         ClearGreen ()
    //     } else if (blue === true) {
    //         ClearBlue ()
    //     }
    //     black = !black;
    //   })
    
    //   color_green.addEventListener("click", function() {
    //     color_green_yes_no.innerHTML = !green;
    //     if(black === true && blue === true) {
    //         ClearBlack ()
    //         ClearBlue()
    //     } else if (black === true) {
    //         ClearBlack ()
    //     } else if (blue === true) {
    //         ClearBlue ()
    //     }
    //     green = !green;
    //   })
    
    //   color_blue.addEventListener("click", function() {
    //     color_blue_yes_no.innerHTML = !blue;
    //     if(black === true && green === true) {
    //         ClearBlack ()
    //         ClearGreen()
    //     } else if (black === true) {
    //         ClearBlack ()
    //     } else if (green === true) {
    //         ClearGreen ()
    //     }
    //     blue = !blue;
    //   })

//--------------------------------------------------------------------

      
          return (
            <div>
                <button className="button_z" onClick={toggleButtonZ}>{buttonZ ? 'Закрытие линий вкл' : 'Закрытие линий выкл'}</button>
                <button className="color_black" onClick={toggleButtonRed}>{buttonBlack ? 'Красный вкл' : 'Красный выкл'} </button>
                {/* <button className="color_green" onClick={toggleButtonGreen}> {buttonGreen ? 'Зеленый вкл' : 'Зеленый выкл'}</button>
                <button className="color_blue" onClick={toggleButtonBlue}>{buttonBlue ? 'Синий вкл' : 'Синий выкл'} </button> */}
            </div>
          );

    }

export default Button;