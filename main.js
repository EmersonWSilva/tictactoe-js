let currentPlayer = "X";
let gameActive = true;
let msg = document.querySelector("p");
const blocos = document.querySelectorAll("td");
const resetButton = document.getElementById("reset");

blocos.forEach(bloco => {
  bloco.addEventListener("click", () => {
    //Impedir que um jogador jogue em uma celula ja ocupada
    if (bloco.textContent === "" & gameActive) {
      //Alternar entre X e O ao clicar na celula
      bloco.textContent = currentPlayer;
      if (checkWinner()) {
        //Exibir mensagem quando houver um vencedor ou empate
        msg.innerHTML = `O jogador <span>${currentPlayer}</span> venceu!`;
        gameActive = false;
      } else if ([...blocos].every(c => c.textContent !== "")) {
        //Exibir mensagem quando houver um vencedor ou empate
        msg.textContent = `Empate!`;
        gameActive = false;
      } else {
        //Ternario para alterar entre os jogadores
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        msg.textContent = `Proximo  a jogar = ${currentPlayer}`;
      }
    }
  });
});

function checkWinner() {
  //Constante com as combinações vitoriosas
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], //Linhas
    [0, 3, 6], [1, 4, 7], [2, 5, 8], //Colunas
    [0, 4, 8], [2, 4, 6]             //Diagonais
  ];

  //Verificar se um jogador venceu
  return winningCombinations.some(comb => {
    let [a, b, c] = comb;
    return blocos[a].textContent !== "" &&
    blocos[a].textContent === blocos[b].textContent &&
    blocos[a].textContent === blocos[c].textContent;
  });
}

// Resetar Jogo
resetButton.addEventListener("click", () => {
  blocos.forEach(bloco => bloco.textContent = "");
  currentPlayer = "X";
  gameActive = true;
})
