// physics.js
class Physics {
  constructor(canvas, game) {
    this.ball = null;
    this.canvas = canvas;
    this.game = game; // Adiciona a referência ao objeto game
  }

  setBall(ball) {
    this.ball = ball;
  }

  handleBallCollisions() {
    // Verifique a colisão com as tabelas
    this.handleBackboardCollision(this.game.firstPlayerBackboard);
    this.handleBackboardCollision(this.game.secondPlayerBackboard);
    this.handleHoopCollision(this.game.firstPlayerHoop);
    this.handleHoopCollision(this.game.secondPlayerHoop);
  }

  handleBackboardCollision(backboard) {
    // Verifica se a bola está colidindo com a tabela
    if (this.ball.isCollidingWithBackboard(this.ball, backboard)) {
      // Inverte a direção vertical da bola
      this.ball.velocityY = -this.ball.velocityY;
    }
  }

  handleHoopCollision(hoop) {
    // Verifica se a bola está colidindo com a tabela
    if (this.ball.isCollidingWithHoop(this.ball, hoop)) {
      // Inverte a direção vertical da bola
      this.ball.velocityY = -this.ball.velocityY;
    }
  }
}

export default Physics;
