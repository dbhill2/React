import Square from "../Types/Square.tsx";

export default function Board({ board, onCellClick, showIncorrect }) {
  const size = board.length;

  const style = {
    display: "grid",
    width: "100%",
    height: "100%",
    gridTemplateColumns: `repeat(${size}, 1fr)`,
    gridTemplateRows: `repeat(${size}, 1fr)`,
    gap: "4px"
  };

  return (
    <div style={style}>
      {board.flatMap((row, r) =>
        row.map((cell, c) => (
          <Square
            key={`${r}-${c}`}
            cell={cell}
            showIncorrect={showIncorrect}
            onClick={() => onCellClick(r, c)}
          />
        ))
      )}
    </div>
  );
}

