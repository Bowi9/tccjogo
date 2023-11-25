// ball.js
import GameObject from "../utils/game-object.js";

class Ball extends GameObject {
  constructor(x, y, size, color, canvas, context, groundHeight, game) {
    super(x, y, size, size, color);
    this.velocityX = 0;
    this.velocityY = 0;
    this.canvas = canvas;
    this.context = context;
    this.groundHeight = groundHeight;
    this.game = game;
  }

  // Adicione esta função para verificar a colisão com a tabela
  isCollidingWithBackboard(ball, backboard) {
    return (
      ball.x + ball.width >= backboard.x &&
      ball.x <= backboard.x + backboard.width &&
      ball.y + ball.height >= backboard.y &&
      ball.y <= backboard.y + backboard.height
    );
  }

  isInTheSecondPartOfHoop(ball, hoop) {
    // Segunda parte (40)
    var secondPart = {
      x: hoop.x + 5,
      y: hoop.y + 15,
      width: 55,
      height: 1,
    };

    // Verifica colisão com a segunda parte apenas quando a bola está vindo de cima
    if (
      // Colisão com a segunda parte (40) e a bola vem de cima para baixo
      ball.x + ball.width >= secondPart.x &&
      ball.x <= secondPart.x + secondPart.width &&
      ball.y + ball.height >= secondPart.y &&
      ball.y <= secondPart.y + secondPart.height &&
      ball.y + ball.height / 2 <= secondPart.y + secondPart.height / 2
    ) {
      // Ajusta a posição da bola para o topo da segunda parte
      ball.velocityX = 0; // Define a velocidade vertical como zero para interromper a animação

      if (hoop === this.game.firstPlayerHoop) {
        this.game.secondPlayer.increaseScore(); // Altere a pontuação conforme necessário
        this.game.firstPlayer.x = hoop.x;
      } else if (hoop === this.game.secondPlayerHoop) {
        this.game.firstPlayer.increaseScore(); // Altere a pontuação conforme necessário
        this.game.secondPlayer.x = hoop.x;
      }
    }
  }

  // Adicione esta função para verificar a colisão com a tabela dividida em três partes
  isCollidingWithHoop(ball, hoop) {
    // Primeira parte (10)
    var firstPart = {
      x: hoop.x,
      y: hoop.y,
      width: 5,
      height: hoop.height,
    };

    // Terceira parte (10)
    var thirdPart = {
      x: hoop.x + 55,
      y: hoop.y,
      width: 5,
      height: hoop.height,
    };

    this.isInTheSecondPartOfHoop(ball, hoop);

    // Verifica colisão com as outras partes
    return (
      // Colisão com a primeira parte (10)
      (ball.x + ball.width >= firstPart.x &&
        ball.x <= firstPart.x + firstPart.width &&
        ball.y + ball.height >= firstPart.y &&
        ball.y <= firstPart.y + firstPart.height) ||
      // Colisão com a terceira parte (10)
      (ball.x + ball.width >= thirdPart.x &&
        ball.x <= thirdPart.x + thirdPart.width &&
        ball.y + ball.height >= thirdPart.y &&
        ball.y <= thirdPart.y + thirdPart.height)
    );
  }

  draw(context) {
    context.fillStyle = this.color;
    context.beginPath();
    context.arc(this.x + this.width / 2, this.y + this.height / 2, this.width / 2, 0, 2 * Math.PI);
    context.fill();
    context.closePath();
  }

  update(gravity, canvas) {
    this.x += this.velocityX;
    this.y += this.velocityY;

    // Verifique se a bola atingiu o limite esquerdo do canvas
    if (this.x < 0) {
      this.x = 0;
      this.velocityX = -this.velocityX; // Inverta a velocidade para quicar na parede
    }

    // Verifique se a bola atingiu o limite direito do canvas
    if (this.x + this.width > canvas.width) {
      this.x = canvas.width - this.width;
      this.velocityX = -this.velocityX; // Inverta a velocidade para quicar na parede
    }

    // Verifique se a bola atingiu o limite inferior do canvas (chão)
    if (this.y + this.height > canvas.height - this.groundHeight) {
      this.y = canvas.height - this.height - this.groundHeight;
      this.velocityY = -Math.abs(--this.velocityY); // Inverta apenas a direção vertical
    } else {
      this.velocityY += gravity;
    }
  }
}

export default Ball;
