import { Component, useState } from "react";

function Countdown({seconds}){

    const[secondsRemaining, setSecondsRemaining] = useState(0);

    function onStart(){
        const startTime = new Date();
        setSecondsRemaining(seconds);

        const intervalId = setInterval(function() {
            const now = new Date();
            const timeElapsed = now.getTime() - startTime.getTime(); //IN MILLISECONDS
            const timeRemaining = Math.round(seconds-timeElapsed/1000);

            if(timeRemaining <=0){
                clearInterval(intervalId);
                setSecondsRemaining(0);
            }
            else{
                setSecondsRemaining(timeRemaining);
            }
        }, 1000);
    }
//0 is false--> true then run
    return(
        <div>
            <p>Countdown {seconds} seconds</p>
            
            {!secondsRemaining && (
                <button type="button" onClick={onStart}>Start!</button>
            )}

            {secondsRemaining > 0 && (
                <div>{secondsRemaining} seconds remaining!</div>
            )}
        </div>
    );
}

export default Countdown;