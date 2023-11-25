// input.js
const setupInputListeners = (game, canvas) => {
  document.addEventListener("keydown", (event) => {
    if (!game.gamePaused) {
      // Player 1
      if (event.key === "w" && game.firstPlayer.y >= canvas.height - game.groundHeight - game.firstPlayer.height) {
        game.firstPlayer.jump();
      }
      if (event.key === "a") {
        game.firstPlayer.velocityX = -game.firstPlayer.speed; // Move para a esquerda
      }
      if (event.key === "d") {
        game.firstPlayer.velocityX = game.firstPlayer.speed; // Move para a direita
      }
      if (event.key === "e" && game.firstPlayer.hasBall) {
        // Verifique se o jogador está segurando a bola antes de arremessá-la
        game.firstPlayer.throwBallToHoop(game.secondPlayerHoop);
      }
      // Player 2
      if (event.key === "ArrowUp" && game.secondPlayer.y >= canvas.height - game.groundHeight - game.secondPlayer.height) {
        game.secondPlayer.jump();
      }
      if (event.key === "ArrowLeft") {
        game.secondPlayer.velocityX = -game.secondPlayer.speed; // Move para a esquerda
      }
      if (event.key === "ArrowRight") {
        game.secondPlayer.velocityX = game.secondPlayer.speed; // Move para a direita
      }

      if (event.key === "1" && game.secondPlayer.hasBall) {
        // Verifique se o jogador está segurando a bola antes de arremessá-la
        game.secondPlayer.throwBallToHoop(game.firstPlayerHoop);
      }
    }
  });

  document.addEventListener("keyup", (event) => {
    if (event.key === "w") {
      game.firstPlayer.velocityY = 0;
    }

    if (event.key === "p") {
      if (game.gamePaused) {
        game.resumeGame(); // Alteração: use resumeGame() para retomar o jogo
      } else {
        game.pauseGame(); // Alteração: use pauseGame() para pausar o jogo
      }
    }

    // Se você quiser reiniciar o jogo com uma tecla diferente (por exemplo, "r"):
    if (event.key === "r") {
      game.restartGame(); // Chame restartGame() para reiniciar o jogo
    }

    if (event.key === "a" || event.key === "d") {
      game.firstPlayer.velocityX = 0; // Para o movimento quando a tecla é solta
    }

    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      game.secondPlayer.velocityX = 0; // Para o movimento quando a tecla é solta
    }
  });
};

export { setupInputListeners };
