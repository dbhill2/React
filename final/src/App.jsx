import { useEffect, useState } from "react";
import Board from "./boardControls/Board.jsx";
import Timer from "./boardControls/Timer.jsx";
import checkPuzzle from "./utils/checkPuzzle.js";
import BoardTimerBorder from "./boardControls/BoardTimerBorder.jsx";
import "./App.css";


const URLsample = "https://prog2700.onrender.com/threeinarow/sample";
const URLrand = "https://prog2700.onrender.com/threeinarow/random";
const URL6x6 = "https://prog2700.onrender.com/threeinarow/6x6";
const URL8x8 = "https://prog2700.onrender.com/threeinarow/8x8";
const URL10x10 = "https://prog2700.onrender.com/threeinarow/10x10";
const URL12x12 = "https://prog2700.onrender.com/threeinarow/12x12";
const URL14x14 = "https://prog2700.onrender.com/threeinarow/14x14";

export default function App(){
    //State hooks for timers, board set up, and messages
    const [ogTime, setOGTime] = useState(20);
    const [board, setBoard] = useState([]);
    const [showIncorrect, setShowIncorrect] = useState(false);
    const [timedMode, setTimedMode] = useState(false);

    const [timeLeft, setTimeLeft] = useState(ogTime);
    const [timerActive, setTimerActive] = useState(false);
    const [bestTime, setBestTime] = useState(null);

    const [ogMess, setOGMess] = useState("Status: --")
    const [statusMessage, setStatusMessage] = useState(ogMess);

    //get our data
    useEffect(() => {
        async function load() {
            const res = await fetch(URLsample);
            const data = await res.json();
            console.log(data);
            const originalBoard = data.rows.map(row =>
                row.map(cell => ({
                    ...cell,
                    originalState: cell.currentState
                }))
            );

            setBoard(originalBoard);
        }
        load();
    }, []);

    //countdown effect moves down by 1000ms only active when timed mode is on
    useEffect(() => {
        if (!timerActive) return;

        const id = setInterval(() => {
        setTimeLeft(t => {
            if (t <= 1) {
                clearInterval(id);
                setTimerActive(false);
                setStatusMessage("Time's up!");
                return 0;
                }
            return t - 1;
        });
        }, 1000);

        return () => clearInterval(id);
    }, [timerActive]); //checks timerActives state, when it changes the useEffect fires

    //helper to set everything back to default
    function resetTimer() {
        setTimerActive(false);
        setTimeLeft(ogTime);
        setOGTime(ogTime)
        setTimedMode(false)
    }

    //helper to reset message back to default
    function resetStatus(){
        setShowIncorrect(false);
        setStatusMessage(ogMess);
    }

    //logic for cell clicks
    function handleCellClick(r, c) {
        //Activates the timed mode if conditions are met
        if (timedMode && !timerActive) {
            setTimerActive(true);
            setTimeLeft(ogTime);
        }

        //copies and saves original board and returns the new version of it
        setBoard(prev => {
            const newBoard = JSON.parse(JSON.stringify(prev));
            const cell = newBoard[r][c];

            if(!cell.canToggle) {
                return prev;
            }

            cell.currentState = (cell.currentState + 1) % 3; //moves through the different colours
            return newBoard;
        });
    }

    //moves through the puzzle with checkPuzzle.js and if conditions are bet a best time is displayed
    function handleCheckPuzzle() {
        const message = checkPuzzle(board);
        setStatusMessage(message);

        if(message === "You did it!" && timedMode) {
            const elapsed = ogTime - timeLeft;

            if (bestTime === null || elapsed < bestTime) {
                setBestTime(elapsed);
                setStatusMessage(`New best time: ${elapsed} seconds!`);
            }

            setTimerActive(false);
        }
    }

    //resets the board onclick of the reset button to the original state
    function handleReset() {
        setBoard(prev =>
            prev.map(row => 
                row.map(cell => ({
                    ... cell,
                    currentState: cell.originalState
                }))
            )
        );
        resetStatus();
        resetTimer();
    }

    //styling of the web app
    return (
        <div id="app" style={{ padding: "20px" }}>
            <h1 className="saira-stencil-main">Three In A Row</h1>

            {/* Toggles */}
            <label>
                <input
                    type="checkbox"
                    checked={timedMode}
                    onChange={() => setTimedMode(t => !t)}
                />
                Timed Mode
            </label>

            {/* Timer */}
            <Timer timeLeft={timeLeft} timerActive={timerActive} bestTime={bestTime}/>

            <div
                style={{
                    position: "relative",
                    width: 300,
                    height: 300,
                    marginTop: "20px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                <BoardTimerBorder 
                    size={300} 
                    duration={ogTime * 1000} 
                    active={timedMode && timerActive}
                    ogTime={ogTime}
                    setStatusMessage={setStatusMessage}
                    />
                <div className="board-wrapper">
                    <Board
                        board={board}
                        onCellClick={handleCellClick}
                        showIncorrect={showIncorrect}
                    />
                </div>
            </div>


            {/* Buttons */}
            <div style={{ marginTop: "20px"}}>
                <button className="buttonGrp" onClick={handleCheckPuzzle}>Check Puzzle</button>
                <button className="buttonGrp" onClick={() => {
                    setShowIncorrect(s => !s)}} style={{marginLeft: "10px"}}>
                        {showIncorrect ? "Hide Incorrect" : "Show Incorrect"}
                </button>
                <button className="buttonGrp" onClick={handleReset} style={{marginLeft: "10px"}}>Reset Puzzle</button>      
            </div>

            {/* Status */}
            <div className="status"
                style={{
                    marginTop: "20px",
                    padding: "10px",
                    border: "1px solid #ccc",
                    width: "250px",
                    fontWeight: "bold",
                }}
            >
                {statusMessage}
            </div>
            
        </div>
    )
}