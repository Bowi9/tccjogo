const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
let gameRunning = false;
let paused = false;
let dis = document.getElementById("btn-div").style.display;

const canvasWidth = 1280;
const canvasHeight = 720;
// Modifique o código para selecionar o canvas pelo ID.

canvas.width = canvasWidth;
canvas.height = canvasHeight;

// Resto do seu código

const desiredFPS = 60;
const frameTime = 1000 / desiredFPS;

let prevTime = performance.now();
let lag = 0;

canvas.width = canvasWidth;
canvas.height = canvasHeight;

function drawImageOverCanvas() {
  let image = new Image();
  image.src = "img/fundo.png";
  image.onload = function () {
    ctx.drawImage(image, 0, 0, canvasWidth, canvasHeight);
  };
}

function animate() {
  if (gameRunning && !paused) {
    const currentTime = performance.now();
    const elapsed = currentTime - prevTime;
    prevTime = currentTime;

    lag += elapsed;

    handleControls();

    while (lag >= frameTime) {
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);
      background.update();
      // hoop.update()
      // support.update()
      // hoop2.update()
      // support2.update()
      // //wall.update()
      player.update();
      // player2.update()
      basketBall.update();

      lag -= frameTime;
    }

    //   console.log(player.position.y)
    //   console.log(basketBall.position.y + " posição bola ")
    //  console.log(player2.points+ "pontos do player2" )
    //console.log(player.end)

    //  console.log(player2.totalPoints + " é o total point")
    //  console.log(player2.beforePoints + "é o beforePoints")

    // console.log(fps + " fps")

    window.requestAnimationFrame(animate);
  }
}

function startGame() {
  if (!gameRunning) {
    gameRunning = true;
    //  document.getElementById('btn-div').textContent = 'Pausar';
    document.getElementById("btn-div").style.display = "none";
    document.getElementById("btn-div").style.pointerEvents = "none";
    document.getElementById("timer").style.display = "block";
    document.getElementById("player1Points").style.display = "block";
    document.getElementById("Player2Points").style.display = "block";

    decreaseTimer();
    animate();
  } else if (paused) {
    paused = false;
    document.getElementById("btn-div").textContent = "Pausar";
    document.getElementById("btn-div").style.display = "none";
    document.getElementById("btn-div").style.pointerEvents = "none";

    animate();
  } else {
    paused = true;
    document.getElementById("btn-div").textContent = "Continuar";
    document.getElementById("btn-div").style.display = "block";
    document.getElementById("btn-div").style.pointerEvents = "auto";
    drawImageOverCanvas();
    decreaseTimer();
  }
}
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    if (gameRunning) {
      if (!paused) {
        paused = true;
        document.getElementById("btn-div").textContent = "Continuar";

        document.getElementById("btn-div").style.display = "block";
        document.getElementById("btn-div").style.pointerEvents = "auto";
        console.log(
          document.getElementById("btn-div").style.display + " continuar",
        );
        console.log(
          document.getElementById("btn-div").style.pointerEvents +
            " pcontinuar",
        );
        drawImageOverCanvas();
      } else {
        paused = false;
        document.getElementById("btn-div").textContent = "Pausar";
        document.getElementById("btn-div").style.display = "none";
        document.getElementById("btn-div").style.pointerEvents = "none";
        console.log(
          document.getElementById("btn-div").style.display + " pausar",
        );
        decreaseTimer();
        animate();
      }
    }
  }
});

animate();
