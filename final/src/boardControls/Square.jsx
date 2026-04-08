export default function Square({ cell, onClick, showIncorrect }) {
    const stateToColor = ["#bfc0c0", "#ef8354", "#2d3142"]
    const style = {
        backgroundColor: stateToColor[cell.currentState],
        border: showIncorrect && cell.canToggle && cell.currentState !== cell.correctState
            ? "2px solid red"
            : "1px solid darkgrey",
        width: "60px",
        height: "60px",
    };
    
    return (
        <td style={style} onClick={cell.canToggle ? onClick : undefined}></td>
    )
}