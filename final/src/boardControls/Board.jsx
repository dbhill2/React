import Square from "./Square.jsx";

export default function Board({ board, onCellClick, showIncorrect }) {
    return(
        <table>
            <tbody>
                {board.map((row, r) => (
                    <tr key={r}>
                        {row.map((cell, c) => (
                            <Square
                                key={c}
                                cell={cell}
                                showIncorrect={showIncorrect}
                                onClick={() => onCellClick(r,c)}
                            />
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}