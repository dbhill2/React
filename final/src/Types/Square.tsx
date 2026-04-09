import React from 'react';
import type { Cell } from "../Types/Cell";


type SquareProps = {
    cell: Cell;
    onClick: React.MouseEventHandler<HTMLDivElement>
    showIncorrect: boolean;
};

export default function Square({ cell, onClick, showIncorrect }: SquareProps) { // destructure SquareProps and ensure correct type being passed
  // Colors for each state (index = currentState)
  const stateToColor = ["#bfc0c0", "#ef8354", "#2d3142"]; //colour pallette used for click events

  // Inline style object — TypeScript infers the correct type automatically.
  const style = {
    backgroundColor: stateToColor[cell.currentState], // sets the colours
    border:
      showIncorrect &&
      cell.canToggle && //cell imported from Cell.tsx
      cell.currentState !== cell.correctState //checks the cell's state and compares then either makes a red border or does nothing
        ? "1px solid red"
        : "1px solid darkgrey",
    width: "100%",
    height: "100%",
    boxSizing: "border-box" as const,
  };

  return (
    <div // returns stylings and actions taken by the cells inside the square to be used by App.jsx
      className="square"
      style={style}
      onClick={cell.canToggle ? onClick : undefined}
    />
  );
}
