let input = [
  [".", "3", ".", ".", "7", ".", ".", ".", "."],
  [".", ".", ".", "1", ".", "5", ".", ".", "."],
  [".", "9", "8", ".", ".", ".", ".", "6", "."],
  ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
  ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
  ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
  [".", "6", ".", ".", ".", ".", "2", "8", "."],
  [".", ".", ".", "4", "1", "9", ".", ".", "5"],
  [".", ".", ".", ".", "8", ".", ".", "7", "9"],
];

let solveSudoku = function (board) {
  let size = 9;
  let boxSize = 3;

  let findEmpty = (board) => {
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (board[r][c] === ".") {
          return [r, c];
        }
      }
    }
    return null;
  };

  let valid = (num, pos, board) => {
    let [r, c] = pos;

    // check rows
    for (let i = 0; i < size; i++) {
      if (board[i][c] === num && i !== r) {
        return false;
      }
    }

    // check cols
    for (let i = 0; i < size; i++) {
      if (board[r][i] === num && i !== c) {
        return false;
      }
    }

    // check box
    let boxRow = Math.floor(r / boxSize) * boxSize;
    let boxCol = Math.floor(c / boxSize) * boxSize;

    for (let i = boxRow; i < boxRow + boxSize; i++) {
      for (let j = boxCol; j < boxCol + boxSize; j++) {
        if (board[i][j] === num && i !== r && j !== c) {
          return false;
        }
      }
    }

    return true;
  };

  let solve = () => {
    let currPos = findEmpty(board);

    if (currPos === null) {
      return true;
    }

    for (let i = 1; i < size + 1; i++) {
      let currNum = i.toString();
      let isValid = valid(currNum, currPos, board);

      if (isValid) {
        let [x, y] = currPos;
        board[x][y] = currNum;

        if (solve()) {
          return true;
        }

        board[x][y] = ".";
      }
    }

    return false;
  };
  solve();
  return board;
};
console.table(input);
console.table(solveSudoku(input));