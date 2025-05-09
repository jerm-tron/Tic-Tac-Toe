const Gameboard = (() => {
  let gameboard = ["", "", "", "", "", "", "", "", ""];

  const render = () => {
    let boardHTML = "";

    gameboard.forEach((cell, index) => {
      boardHTML += `<div class="cell" id="cell-${index}"> ${square}</div>`;
    });
    document.querySelector(".board").innerHTML = boardHTML;
  };
  return { render };
})();

const gameController = () => {};

const startButton = document.querySelector(".start-button");
startButton.addEventListener("click", () => {
  alert("HELLO WORLD");
});
