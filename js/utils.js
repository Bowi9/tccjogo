function determineWinner({ player, player2, timerId }) {
  clearTimeout(timerId);
  document.querySelector("#displayText").style.display = "flex";
  if (player.points === player2.points) {
    document.querySelector("#displayText").innerHTML = "Tie";
    movement = false;
  } else if (player.points > player2.points) {
    document.querySelector("#displayText").innerHTML = "Player 1 Wins";
    movement = false;
  } else {
    document.querySelector("#displayText").innerHTML = "Player 2 Wins";
    movement = false;
  }
}

let timer = 60; // Tempo em segundos
let timerId;

function decreaseTimer() {
  if (!paused) {
    if (timer > 0) {
      timerId = setTimeout(decreaseTimer, 1000); // Espera 1 segundo (1000 milissegundos)
      timer--;
      document.querySelector("#timer").innerHTML = timer;
    }

    if (timer === 0) {
      determineWinner({
        player,
        // player2,
        timerId,
      });
    }
  } else {
    clearInterval(timerInterval);
    document.querySelector("#timer").innerHTML = timer;
  }
}

//console.log(paused)

function score() {
  document.querySelector("#player1Points").innerHTML = player.points;
  document.querySelector("#player2Points").innerHTML = player2.points;
}
