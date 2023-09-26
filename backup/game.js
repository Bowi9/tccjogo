const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const canvasWidth = 1824
const canvasHeight = 800

canvas.width = canvasWidth
canvas.height = canvasHeight
let prevTime
animate()

decreaseTimer()

function animate(){
    window.requestAnimationFrame(animate)
    ctx.fillStyle = "black"
    ctx.fillRect(0,0, canvasWidth,canvasHeight)
    hoop.update()
    support.update()
    hoop2.update()
    support2.update()
    //wall.update()
    player.update()
    player2.update()
    basketBall.update()
 //   console.log(player.position.y)
 //   console.log(basketBall.position.y + " posição bola ")
//  console.log(player2.points+ "pontos do player2" )
 console.log(player.end)

//  console.log(player2.totalPoints + " é o total point")
//  console.log(player2.beforePoints + "é o beforePoints")

    let delta = (performance.now() - prevTime) / 1000
    let fps = 1 /delta

    prevTime = performance.now()
    
   // console.log(fps + " fps")

    handleControls()
}

