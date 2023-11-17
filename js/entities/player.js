//player.js
import GameObject from "../utils/game-object.js";
import Physics from "../physics/physics.js";

class Player extends GameObject {
  constructor(x, y, width, height, color, canvas, context, groundHeight, game, isFirstPlayer) {
    super(x, y, width, height, color);
    this.velocityX = 0;
    this.velocityY = 0;
    this.speed = 5;
    this.canvas = canvas;
    this.context = context;
    this.groundHeight = groundHeight;
    this.hasBall = false;
    this.ball = null;
    this.game = game; // Armazene a instância do jogo
    this.isFirstPlayer = isFirstPlayer;
    this.strength = 30; // O maximo vai ser 5
    this.physics = new Physics(canvas);
    this.physics.setBall(this);
  }

  move() {
    this.y += this.velocityY;
    this.x += this.velocityX;

    // Verifica se o jogador está no chão e impede que ele atravesse o chão
    if (this.y + this.height > this.canvas.height - this.groundHeight) {
      this.y = this.canvas.height - this.height - this.groundHeight;
      this.velocityY = 0;
    } else {
      this.velocityY += 1;
    }

    // Verifica se o jogador está dentro dos limites do canvas (pode adicionar mais lógica aqui)
    if (this.x < 50) {
      this.x = 50;
    } else if (this.x > 1190) {
      this.x = 1190;
    }

    // if (this.x + this.width > this.canvas.width) {
    //   this.x = this.canvas.width - this.width;
    // }
  }

  jump() {
    // Verifique se o jogador está no chão antes de permitir o salto
    if (this.y + this.height === this.canvas.height - this.groundHeight) {
      // Aplique um impulso vertical negativo para fazer o jogador pular
      this.velocityY = -22;
      // Se o jogador tiver a bola, mova a bola junto com o jogador
      if (this.hasBall && this.ball) {
        this.ball.y = this.y - this.ball.height;
      }
    }
  }

  catchBall(ball) {
    if (!this.hasBall && this.isTouchingBall(ball)) {
      this.hasBall = true;
      this.ball = ball;
      ball.holder = this;
    }
  }

  throwBallToHoop(hoop) {
    if (this.hasBall && this.ball) {
      // Defina os pontos iniciais e finais para a curva quadrática
      const startX = this.ball.x;
      const startY = this.ball.y;

      const endX = hoop.x + hoop.width / 2; // Posição x do meio do aro
      const endY = hoop.y;

      // Calcule o ponto máximo da curva (concavidade para baixo)
      const controlX = (startX + endX) / 2;
      const controlY = Math.max(startY, endY) + 200; // Ajuste a altura conforme necessário

      // Use a fórmula da curva quadrática para definir a trajetória
      const t = 1; // Fator de "tempo" para encontrar o ponto na metade da curva
      const x = (1 - t) ** 2 * startX + 2 * (1 - t) * t * controlX + t ** 2 * endX;
      const y = (1 - t) ** 2 * startY + 2 * (1 - t) * t * controlY + t ** 2 * endY;

      // Calcule as velocidades horizontal e vertical com base na posição final e inicial
      const dx = endX - startX;
      const dy = endY - startY;

      // Calcule a variação baseada na proximidade ao alvo
      const proximity = Math.abs(endX - startX); // pensar no que fazer com isso
      console.log(proximity);

      // Calcule o ângulo em graus antes da conversão para radianos
      let angleDegrees = Math.atan2(dy, dx) * (180 / Math.PI);
      if (this.isFirstPlayer) {
        angleDegrees -= 45;
      } else {
        angleDegrees += 45;
      }

      // Adicione a variação aleatória e converta para radianos
      const angle = angleDegrees * (Math.PI / 180);

      const speed = 30; // Ajuste conforme necessário

      this.ball.velocityX = speed * Math.cos(angle);
      this.ball.velocityY = speed * Math.sin(angle);

      // Define a posição inicial da bola
      this.ball.x = startX;
      this.ball.y = startY;

      // Reinicia o estado do jogador
      this.resetPlayerState();
    }
  }

  resetPlayerState() {
    this.hasBall = false;
    this.ball.holder = null;
  }

  isTouchingBall(ball) {
    // Verifique se há uma colisão entre o jogador e a bola
    return this.x < ball.x + ball.width && this.x + this.width > ball.x && this.y < ball.y + ball.height && this.y + this.height > ball.y;
  }

  checkPlayerCollision() {
    const otherPlayer = this.isFirstPlayer ? this.game.secondPlayer : this.game.firstPlayer;

    // Verificar se há colisão com o outro jogador
    if (
      this.x < otherPlayer.x + otherPlayer.width &&
      this.x + this.width > otherPlayer.x &&
      this.y < otherPlayer.y + otherPlayer.height &&
      this.y + this.height > otherPlayer.y
    ) {
      // Resolva a sobreposição movendo o jogador para longe do outro jogador
      if (this.x < otherPlayer.x) {
        this.x = otherPlayer.x - this.width;
      } else {
        this.x = otherPlayer.x + otherPlayer.width;
      }
    }
  }

  update() {
    this.move(); // Chama a função de movimento

    if (!this.hasBall) {
      // Verifica colisão com a bola apenas se o jogador não estiver segurando a bola
      if (this.isTouchingBall(this.game.ball)) {
        this.catchBall(this.game.ball);
      }
    }

    if (this.hasBall && this.ball) {
      // Move a bola junto com o jogador
      this.ball.x = this.x + this.width / 2 - this.ball.width / 2;
      this.ball.y = this.y - this.ball.height;
    }

    // Verifica colisão com o outro jogador
    this.checkPlayerCollision(this.game.secondPlayer);
  }
}

export default Player;
