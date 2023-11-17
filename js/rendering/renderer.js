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

  clearCanvas() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

export default Renderer;
