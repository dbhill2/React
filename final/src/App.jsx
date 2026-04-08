import { useEffect, useState } from "react";
import Board from "./boardControls/Board.jsx";
import Timer from "./boardControls/Timer.jsx";
import checkPuzzle from "./utils/checkPuzzle.js";
import "./App.css";


const URLsample = "https://prog2700.onrender.com/threeinarow/sample";
const URLrand = "https://prog2700.onrender.com/threeinarow/random";
const URL6x6 = "https://prog2700.onrender.com/threeinarow/6x6";
const URL8x8 = "https://prog2700.onrender.com/threeinarow/8x8";
const URL10x10 = "https://prog2700.onrender.com/threeinarow/10x10";
const URL12x12 = "https://prog2700.onrender.com/threeinarow/12x12";
const URL14x14 = "https://prog2700.onrender.com/threeinarow/14x14";

export default function App(){
    const [board, setBoard] = useState([]);
    const [showIncorrect, setShowIncorrect] = useState(false);
    const [timedMode, setTimedMode] = useState(false);

    const [timeLeft, setTimeLeft] = useState(60);
    const [timerActive, setTimerActive] = useState(false);
    const [bestTime, setBestTime] = useState(null);

    const [statusMessage, setStatusMessage] = useState("Status: --");

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
    }, [timerActive]);

    function handleCellClick(r, c) {
        if (timedMode && !timerActive) {
            setTimerActive(true);
            setTimeLeft(60);
        }

        setBoard(prev => {
            const newBoard = JSON.parse(JSON.stringify(prev));
            const cell = newBoard[r][c];

            if(!cell.canToggle) {
                return prev;
            }

            cell.currentState = (cell.currentState + 1) % 3;
            return newBoard;
        });
    }

    function handleCheckPuzzle() {
        const message = checkPuzzle(board);
        setStatusMessage(message);

        if(message === "You did it!" && timedMode) {
            const elapsed = 60 - timeLeft;

            if (bestTime === null || elapsed < bestTime) {
                setBestTime(elapsed);
                setStatusMessage(`New best time: ${elapsed} seconds!`);
            }

            setTimerActive(false);
        }
    }

    function handleReset() {
        setBoard(prev =>
            prev.map(row => 
                row.map(cell => ({
                    ... cell,
                    currentState: cell.originalState
                }))
            )
        );

        setShowIncorrect(false);
        setTimerActive(false);
        setTimeLeft(60);
        setStatusMessage("Status: --");
        setTimedMode(false);
    }

    return (
        <div id="app" style={{ padding: "20px" }}>
            <h1>Three In A Row</h1>

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

            {/* Board */}
            <Board
                board={board}
                onCellClick={handleCellClick}
                showIncorrect={showIncorrect}
            />

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
            <div
                style={{
                    marginTop: "20px",
                    padding: "10px",
                    border: "1px solid #ccc",
                    width: "250px",
                    fontWeight: "bold"
                }}
            >
                {statusMessage}
            </div>
        </div>
    )
}