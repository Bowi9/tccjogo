// renderer.js
class Renderer {
  constructor(canvas, context, ball, firstPlayer, secondPlayer, firstPlayerHoop, firstPlayerBackboard, secondPlayerHoop, secondPlayerBackboard, groundHeight) {
    this.canvas = canvas;
    this.context = context;
    this.ball = ball;
    this.firstPlayer = firstPlayer;
    this.secondPlayer = secondPlayer;
    this.firstPlayerHoop = firstPlayerHoop;
    this.firstPlayerBackboard = firstPlayerBackboard;
    this.secondPlayerHoop = secondPlayerHoop;
    this.secondPlayerBackboard = secondPlayerBackboard;
    this.groundHeight = groundHeight;
    this.loadFont();
  }

  // Carrega a fonte do timer
  async loadFont() {
    const font = new FontFace("Dot-Matrix", "url(./assets/fonts/Dot-Matrix.ttf)");

    try {
      await font.load();
      document.fonts.add(font);
    } catch (error) {
      console.error("Erro ao carregar a fonte:", error);
    }
  }

  drawGenericObject(gameObject) {
    gameObject.draw(this.context);
  }

  drawBall() {
    this.ball.draw(this.context);
  }

  drawPlayer() {
    this.firstPlayer.draw(this.context);
    this.secondPlayer.draw(this.context);
  }

  drawHoop(hoop) {
    this.context.fillStyle = hoop.color;
    this.context.fillRect(hoop.x, hoop.y, hoop.width, hoop.height);
  }

  drawBackboard(backboard) {
    this.context.fillStyle = backboard.color;
    this.context.fillRect(backboard.x, backboard.y, backboard.width, backboard.height);
  }

  drawGround() {
    this.context.fillStyle = "magenta";
    this.context.fillRect(0, this.canvas.height - this.groundHeight, this.canvas.width, this.groundHeight);
  }

  drawScore(player, x, y) {
    this.context.fillStyle = player.color;
    this.context.font = "48px Dot-Matrix";
    this.context.fillText(player.score, x, y);
  }

  drawCenteredScores(player1, player2) {
    const x1 = this.canvas.width / 2 - 100; // Ajusta a posição x para o placar do jogador 1
    const x2 = this.canvas.width / 2 + 70; // Ajusta a posição x para o placar do jogador 2
    const y = 140;

    this.drawScore(player1, x1, y);
    this.drawScore(player2, x2, y);
  }

  drawTimer(timeLeft) {
    const minutes = Math.floor(timeLeft / 60000);
    const seconds = Math.floor((timeLeft % 60000) / 1000);

    const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

    this.context.fillStyle = "white";
    this.context.font = "72px Dot-Matrix";
    const textWidth = this.context.measureText(formattedTime).width;
    const x = (this.canvas.width - textWidth) / 2;
    const y = (this.canvas.height - 72) / 8;
    this.context.fillText(formattedTime, x, y);
  }

  // Apenas para ajustes
  drawGrid(cellSize) {
    this.context.strokeStyle = "rgba(255, 255, 255, 0.2)"; // Cor das linhas do grid
    this.context.lineWidth = 1;

    // Desenha linhas horizontais
    for (let y = 0; y <= this.canvas.height; y += cellSize) {
      this.context.beginPath();
      this.context.moveTo(0, y);
      this.context.lineTo(this.canvas.width, y);
      this.context.stroke();
    }

    // Desenha linhas verticais
    for (let x = 0; x <= this.canvas.width; x += cellSize) {
      this.context.beginPath();
      this.context.moveTo(x, 0);
      this.context.lineTo(x, this.canvas.height);
      this.context.stroke();
    }
  }

  clearCanvas() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

export default Renderer;
