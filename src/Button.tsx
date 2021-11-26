import React, {useState} from "react";
import './Button.css';

export interface ButtonClose {
    className: string;
    onClick: () => void;
    button: boolean;
    setButton: boolean;
}


const Button = ()=> {

    const [buttonClick, setButtonClick] = useState(false);
    const toggle = () => setButtonClick(!buttonClick)

    
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
                <button className="button_z" onClick={toggle}>{buttonClick ? 'Закрытие линий вкл' : 'Закрытие линий выкл'}</button>
                <button className="color_black" onClick={toggle}>{buttonClick ? 'Черный вкл' : 'Черный выкл'} </button>
                <button className="color_green" onClick={toggle}> {buttonClick ? 'Зеленый вкл' : 'Зеленый выкл'}</button>
                <button className="color_blue" onClick={toggle}>{buttonClick ? 'Синий вкл' : 'Синий выкл'} </button>
            </div>
          );

    }

export default Button;