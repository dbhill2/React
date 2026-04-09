export default function Timer({ timeLeft, timerActive, bestTime }) {
    return ( //stylings for the timer
        <div style={{ marginTop: "10px" }}>
            <div>Time left: {timerActive ? timeLeft : "--"}</div>
            <div>Best Time: {bestTime ?? "--"}</div>
        </div>
    );
}