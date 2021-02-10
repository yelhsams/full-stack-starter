import { useState } from "react";

import Countdown from "./Countdown";

function Components() {
    //declares seconds, int value 0
    //declares function setSeconds, only funct that changes seconds
    //hooks statement
    const [seconds, setSeconds] = useState(0); 

    //changed seconds by the typed number 
    //input box returns strings, parseInt--> integer, event.target= 
    function onSecondsChanged(event) {
        const newSeconds = parseInt(event.target.value);
        setSeconds(newSeconds);
    }

    return (
        <div className="container">
           <h1>Components</h1>
           <p>{seconds} seconds for my timer</p>
           <input type="number" value= {seconds} onChange={onSecondsChanged} min= "0"></input>
           <Countdown seconds={seconds} />
        </div>
    );
}

export default Components;