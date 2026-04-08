export default function checkPuzzle(tableData) {
  const result = tableData.reduce(
    (acc, row) => {
      return row.reduce((acc, cell) => {
            const isCorrect = cell.currentState === cell.correctState;

            // Track global correctness (all cells)
            if (!isCorrect) {
                acc.allCorrect = false;
            }

            if (cell.canToggle) {
                const isDefault = cell.currentState === 0; // white = untouched

                // If user has colored this cell and it's wrong → incorrect
                if (!isDefault && !isCorrect) {
                    acc.anyIncorrect = true;
                }

                // If user has colored this cell at all
                if (!isDefault) {
                    acc.anyColored = true;
                }
            }
            return acc;
        }, acc);
    }, { allCorrect: true, anyIncorrect: false, anyColored: false });

    if (result.allCorrect) {
        return "You did it!";
    }

    if (result.anyIncorrect) {
        return "Something is wrong";
    }

    return "So far so good";
}