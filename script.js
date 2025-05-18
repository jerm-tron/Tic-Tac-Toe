const Gameboard = (() => {
  let gameboard = ["", "", "", "", "", "", "", "", ""];

  const render = () => {
    let boardHTML = "";

    gameboard.forEach((cell, index) => {
      boardHTML += `<div class="cell" id="cell-${index}">${cell}</div>`;
    });
    document.querySelector(".board").innerHTML = boardHTML;
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
      cell.addEventListener("click", GameController.handleClick);
    });
  };
  const getBoard = () => gameboard;
  return { render, getBoard };
})();

const GameController = (() => {
  let currentPlayer = "X";

  const switchPlayer = () => {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  };

  const handleClick = (event) => {
    let index = parseInt(event.target.id.split("-")[1]);
    playRound(index);
  };

  const playRound = (cellIndex) => {
    const board = Gameboard.getBoard();
    if (board[cellIndex] !== "") {
      return;
    }
    board[cellIndex] = currentPlayer;

    Gameboard.render();

    const winner = checkWinner(board);
    if (winner) {
      alert(`${winner} wins`);
      return;
    }
    if (checkTie(board)) {
      alert("it's a tie");
      return;
    }

    switchPlayer();
  };

  const resetGame = () => {
    Gameboard.getBoard().forEach((cell, index, board) => {
      board[index] = "";
    });
    Gameboard.render();
  };

  const checkWinner = (board) => {
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < winningCombos.length; i++) {
      const [a, b, c] = winningCombos[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const checkTie = (board) => {
    return board.every((cell) => cell !== "");
  };

  return { handleClick, playRound, resetGame, checkTie, checkWinner };
})();

const resetButton = document.querySelector(".reset-button");
resetButton.addEventListener("click", () => {
  GameController.resetGame();
});

const startButton = document.querySelector(".start-button");
startButton.addEventListener("click", () => {
  Gameboard.render();
});
