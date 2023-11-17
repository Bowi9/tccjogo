//game.js
import Player from "../entities/player.js";
import Ball from "../entities/ball.js";
import Hoop from "../entities/hoop.js";
import Backboard from "../entities/backboard.js";
import Renderer from "../rendering/renderer.js";
import Physics from "../physics/physics.js";

class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.groundHeight = 50; // Altura do chão

    this.firstPlayer = new Player( // cria uma instancia do jogador para o Player 1
      canvas.width / 2 - 100,
      canvas.height - this.groundHeight,
      40,
      75,
      "blue",
      canvas,
      this.context,
      this.groundHeight,
      this,
      true
    );

    this.secondPlayer = new Player( // cria uma instancia do jogador para o Player 2a
      canvas.width / 2 + 100,
      canvas.height - this.groundHeight,
      40,
      75,
      "red",
      canvas,
      this.context,
      this.groundHeight,
      this,
      false
    );

    this.ball = new Ball(canvas.width / 2 + 10, canvas.height - 200, 20, "orange", canvas, this.context, this.groundHeight); // cria uma instancia da bola

    this.firstPlayerHoop = new Hoop(
      40, // Posição x do retângulo
      390, // Posição y do retângulo
      60, // Tamanho total do retângulo (largura)
      10, // Tamanho total do retângulo (altura)
      this.firstPlayer.color
    );

    this.firstPlayerBackboard = new Backboard(
      10, // Posição x do retângulo
      290, // Posição y do retângulo
      10, // Tamanho do quadrado (largura e altura iguais)
      120,
      this.firstPlayer.color
    );

    this.secondPlayerHoop = new Hoop(
      1180, // Posição x do retângulo
      390, // Posição y do retângulo
      60, // Tamanho total do retângulo (largura)
      10, // Tamanho total do retângulo (altura)
      this.secondPlayer.color
    );

    this.secondPlayerBackboard = new Backboard(
      1260, // Posição x do retângulo
      290, // Posição y do retângulo
      10, // Tamanho do quadrado (largura e altura iguais)
      120,
      this.secondPlayer.color
    );

    this.gamePaused = false;
    this.gameDuration = 600000000000; //60000
    this.timeLeft = this.gameDuration;
    this.gameInterval = null;

    this.renderer = new Renderer(
      canvas,
      this.context,
      this.firstPlayer,
      this.secondPlayer,
      this.ball,
      this.firstPlayerHoop,
      this.firstPlayerBackboard,
      this.secondPlayerHoop,
      this.secondPlayerBackboard,
      this.groundHeight
    );

    this.physics = new Physics(canvas, this);
    this.physics.setBall(this.ball);
  }

  draw() {
    this.renderer.clearCanvas();

    this.renderer.drawGround();

    this.renderer.drawPlayer();

    this.renderer.drawBall(this.ball);

    // Modifique as chamadas para drawHoop
    this.renderer.drawHoop(this.firstPlayerHoop, this.firstPlayer);
    this.renderer.drawBackboard(this.firstPlayerBackboard, this.firstPlayer);

    this.renderer.drawHoop(this.secondPlayerHoop, this.secondPlayer);
    this.renderer.drawBackboard(this.secondPlayerBackboard, this.secondPlayer);
  }

  update() {
    this.ball.update(1, this.canvas, this.firstPlayerHoop, this.secondPlayerHoop);

    this.firstPlayer.update(this.canvas);
    this.secondPlayer.update(this.canvas);

    if (this.ball.holder) {
      this.ball.x = this.ball.holder.x + (this.ball.holder.width - this.ball.width) / 2;
      this.ball.y = this.ball.holder.y - this.ball.height;
    }

    // Verifique se a bola atingiu o limite esquerdo do canvas
    if (this.ball.x < 0) {
      this.ball.x = 0;
      this.ball.velocityX = -this.ball.velocityX; // Inverta a velocidade para que a bola "quique" na parede
    }

    // Verifique se a bola atingiu o limite direito do canvas
    if (this.ball.x + this.ball.width > this.canvas.width) {
      this.ball.x = this.canvas.width - this.ball.width;
      this.ball.velocityX = -this.ball.velocityX; // Inverta a velocidade para que a bola "quique" na parede
    }

    // Verifique se a bola atingiu o limite inferior do canvas (chão)
    if (this.ball.y + this.ball.height > this.canvas.height - this.groundHeight) {
      this.ball.y = this.canvas.height - this.ball.height - this.groundHeight;
    }

    // Lida com a lógica de física, incluindo colisões
    this.physics.handleBallCollisions();
  }

  startGame() {
    this.gamePaused = false;
    this.timeLeft = this.gameDuration;
    this.gameInterval = setInterval(() => {
      try {
        this.update();
        this.draw();
      } catch (error) {
        console.error("Error in game loop:", error);
      }
    }, 1000 / 60);
  }
}

export default Game;
