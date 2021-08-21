
import React from 'react';
import chat from '../assets/images/chat.png';
import './button.css';

const Button = ({ handleClick }) => {

    return (
        <>
         {/* help button  */}
                <button onClick={handleClick}>
                    Help
                </button>
          
        </>
    )
}

export default Button;