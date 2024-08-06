import React, {useState,useEffect,useRef} from "react"
function Stopwatch(){
    const [isrunning,setisrunning] = useState(false);
    const [elapsedTime,setElapsedTime] = useState(0);
    const intervalidref = useRef(null);
    const starttimeref  = useRef(0); 
    useEffect(()=>{},[isrunning]);
    function start(){
    }
    function stop(){
        
    }
    function formattime(){
        return '00::00:00'
    }
    function reset(){
        
    }

    return (
        <>
        <div className="stopwatch"></div>
            <div className="display">{formattime(elapsedTime)}</div>
            <div className="controls">
                <button onClick={start} className="start-btn">Start</button>
                <button onClick={stop} className="stop-btn">Stop</button>
                <button onClick={reset} className="reset-btn">Reset</button>
            </div>
        </>
    );
}
export default Stopwatch