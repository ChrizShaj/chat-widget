import logo from './logo.svg';
import './App.css';
import Button from './button/button';
import { useState } from 'react';
import ChatWindow from './chat-window/chatWindow';


function App() {
   const [toggle, setToggle] = useState(false)
  
  //  help and close
  const toggleBox = (event) => {
    setToggle(!toggle);
  }

  return (

    <div className="App">
       <div className="fixed btn-position">
      {/* handleClick is a callback function which returns an event as true or false */}
         {
           toggle ? 
              <ChatWindow handleClick={toggleBox}/> 
              :
              <Button handleClick={toggleBox} /> 
         }
          
         
           
       </div>
    </div>
  );
}

export default App;
