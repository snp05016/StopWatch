import React, { useState, useEffect, useRef } from "react";

function Stopwatch() {
    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [laps, setLaps] = useState([]);
    const intervalIdRef = useRef(null);
    const startTimeRef = useRef(0);
    const containerRef = useRef(null); // Ref to track container height
    const [containerHeight, setContainerHeight] = useState('auto');

    useEffect(() => {
        if (isRunning) {
            intervalIdRef.current = setInterval(() => {
                setElapsedTime(Date.now() - startTimeRef.current);
            }, 1);
        } else {
            clearInterval(intervalIdRef.current);
        }

        return () => clearInterval(intervalIdRef.current);
    }, [isRunning]);

    useEffect(() => {
        // Update the container height when laps change
        if (containerRef.current) {
            setContainerHeight(`${containerRef.current.scrollHeight}px`);
        }
    }, [laps]);

    function start() {
        setIsRunning(true);
        startTimeRef.current = Date.now() - elapsedTime;
    }

    function stop() {
        setIsRunning(false);
    }

    function reset() {
        setElapsedTime(0);
        setLaps([]);
        clearInterval(intervalIdRef.current);
        setIsRunning(false);
        startTimeRef.current = 0;
        setContainerHeight('auto'); // Reset to auto when reset
    }

    function addLap() {
        setLaps([elapsedTime, ...laps]);
    }

    function formatTime(time) {
        const hours = Math.floor(time / (1000 * 60 * 60));
        const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((time % (1000 * 60)) / 1000);
        const milliseconds = time % 1000;

        return (
            <span>
                {hours > 0 && <span>{String(hours).padStart(2, '0')}:&nbsp;</span>}
                <span>{String(minutes).padStart(2, '0')}</span>
                <span className="semi">:</span>
                <span>{String(seconds).padStart(2, '0')}</span>
                <span className="semi">:</span>
                <span>{String(milliseconds).padStart(3, '0')}</span>
            </span>
        );
    }

    return (
        <div className="stopwatch" ref={containerRef} style={{ height: containerHeight, transition: 'height 0.3s ease-in-out' }}>
            <div className="display">{formatTime(elapsedTime)}</div>
            <div className="controls">
                {isRunning ? (
                    <button onClick={stop} className="stop-btn">Stop</button>
                ) : (
                    <button onClick={start} className="start-btn">Start</button>
                )}
                <button onClick={reset} className="reset-btn">Reset</button>
                {isRunning && <button onClick={addLap} className="lap-btn">Lap</button>}
            </div>
            <div className="laps">
                {laps.map((lap, index) => (
                    <div key={index} className="lap">
                        <span className="lap-number">Lap {laps.length - index}</span>
                        <span className="lap-time">{formatTime(lap)}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Stopwatch;
