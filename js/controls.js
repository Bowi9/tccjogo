const keys = {
  a: {
    pressed: false,
    hold: false,
  },
  d: {
    pressed: false,
    hold: false,
  },
  w: {
    pressed: false,
    hold: false,
  },
  space: {
    pressed: false,
    hold: false,
  },
  s: {
    pressed: false,
    hold: false,
  },
  j: {
    pressed: false,
    hold: false,
  },
  ArrowLeft: {
    pressed: false,
    hold: false,
  },
  ArrowRight: {
    pressed: false,
    hold: false,
  },
  ArrowUp: {
    pressed: false,
    hold: false,
  },
  ArrowDown: {
    pressed: false,
    hold: false,
  },
  "/": {
    pressed: false,
    hold: false,
  },
  ";": {
    pressed: false,
    hold: false,
  },
};

window.addEventListener("keydown", (e) => {
  let key = e.key;

  switch (key) {
    case "a":
      keys.a.pressed = true;
      keys.a.hold = true;
      player.lastKeyPressed = key;
      player.onMovement = true;
      break;
    case "d":
      keys.d.pressed = true;
      keys.d.hold = true;
      player.lastKeyPressed = key;
      player.onMovement = true;
      break;
    case "w":
      keys.w.pressed = true;
      keys.w.hold = true;
      player.onMovement = true;
      break;
    case " ":
      keys.space.pressed = true;
      break;
    case "s":
      keys.s.pressed = true;
      player.onMovement = true;
      break;
    case "j":
      keys.j.pressed = true;
      player.onMovement = true;
      break;
  }

  //player dois
  // switch (key) {
  //   case "ArrowLeft":
  //     keys.ArrowLeft.pressed = true;
  //     keys.ArrowLeft.hold = true;
  //     player2.lastKeyPressed = key;
  //     player2.onMovement = true;
  //     break;
  //   case "ArrowRight":
  //     keys.ArrowRight.pressed = true;
  //     keys.ArrowRight.hold = true;
  //     player2.lastKeyPressed = key;
  //     player2.onMovement = true;
  //     break;
  //   case "ArrowUp":
  //     keys.ArrowUp.pressed = true;
  //     keys.ArrowUp.hold = true;
  //     player2.onMovement = true;
  //     break;
  //   case ";":
  //     keys[";"].pressed = true;
  //     player2.onMovement = true;
  //     break;
  //   case "ArrowDown":
  //     keys.ArrowDown.pressed = true;
  //     keys.ArrowDown.hold = true;
  //     player2.onMovement = true;
  //     break;
  //   case "/":
  //     keys["/"].pressed = true;
  //     break;
  // }
});

window.addEventListener("keyup", (e) => {
  let key = e.key;

  switch (key) {
    case "a":
      keys.a.pressed = false;
      keys.a.hold = false;
      player.onMovement = false;
      break;
    case "d":
      keys.d.pressed = false;
      keys.d.hold = false;
      player.onMovement = false;
      break;
    case "w":
      keys.w.pressed = false;
      keys.w.hold = false;
      player.onMovement = false;
      break;
    case " ":
      keys.space.pressed = false;
      keys.space.hold = false;
      player.onMovement = false;
      break;
    case "s":
      keys.s.pressed = false;
      keys.s.hold = false;
      player.onMovement = false;
      break;
    case "j":
      keys.j.pressed = false;
      keys.j.hold = false;
      player.onMovement = false;
      break;
  }

  //player dois
  // switch (key) {
  //   case "ArrowLeft":
  //     keys.ArrowLeft.pressed = false;
  //     keys.ArrowLeft.hold = false;
  //     player2.onMovement = false;
  //     break;
  //   case "ArrowRight":
  //     keys.ArrowRight.pressed = false;
  //     keys.ArrowRight.hold = false;
  //     player2.onMovement = false;
  //     break;
  //   case "ArrowUp":
  //     keys.ArrowUp.pressed = false;
  //     keys.ArrowUp.hold = false;
  //     player2.onMovement = false;
  //     break;
  //   case ";":
  //     keys[";"].pressed = false;
  //     keys[";"].hold = false;
  //     player2.onMovement = false;
  //     break;
  //   case "ArrowDown":
  //     keys.ArrowDown.pressed = false;
  //     keys.ArrowDown.hold = false;
  //     player2.onMovement = false;
  //     break;
  //   case "/":
  //     keys["/"].pressed = false;
  //     keys["/"].hold = false;
  //     break;
  // }
});

function handleControls() {
  if (!player.onMovement && player.onGround) {
    if (player.onGround) {
      player.setSprite("idle");
    } else player.setSprite("jumping");
  }

 
  movement();
  get();

  //   if (player.end === true) {
  //     movement() = false
  //  //   movement2() = false
  //   }
}

function movement() {
  player.velocity.x = 0;

  if (keys.a.pressed && ["a", "ArrowLeft"].includes(player.lastKeyPressed)) {
    player.velocity.x = -1.2 * 3.4;
    player.facing = "left";
    player.onMovement = true;
    if (!player.onGround) return;
    player.setSprite("running");
  }

  if (keys.d.pressed && ["d", "ArrowRight"].includes(player.lastKeyPressed)) {
    player.velocity.x = 1.2 * 3.4;
    player.facing = "right";
    player.onMovement = true;
    if (!player.onGround) return;
    player.setSprite("running");
  }

  if (keys.space.pressed && !keys.space.hold) {
    player.jump();
    player.onJump = true;
    keys.w.hold = true;
    player.setSprite("jumping");
  }
}

// function movement2(){
// player2.velocity.x = 0

// if(keys.ArrowLeft.pressed && ["ArrowLeft"].includes(player2.lastKeyPressed)){
//  player2.velocity.x = -1.5 *3.4
// }

// if(keys.ArrowRight.pressed && ["ArrowRight"].includes(player2.lastKeyPressed)){
//     player2.velocity.x = 1.5 *3.4
// }

// if (keys[";"].pressed && !keys[";"].hold) {
//     player2.jump();

//     keys[";"].hold = true;
//   }
//    player2.onMovement = true;
// }

function get(){
    let isColliding = false;

    if (
        player.position.x < basketBall.position.x + basketBall.width &&
        player.position.x + player.width > basketBall.position.x &&
        player.position.y < basketBall.position.y + basketBall.height &&
        player.position.y + player.height > basketBall.position.y
      ) {
        isColliding = true;
        console.log("ta colidindo")
      } else {
        isColliding = false;
        console.log("nao ta colidindo")

      }

    if(isColliding && keys.j.pressed){
      basketBall.position.y = player.position.y + 25;
      basketBall.velocity.x = 0;
      basketBall.velocity.y = 0;
        const throwSpeed = 16;

        //lançando reto
        if (keys.a.hold && isColliding && keys.j.pressed ) {
          basketBall.velocity.x = -throwSpeed;
          basketBall.velocity.y = 0;
          basketBall.position.y = player.position.y + 25;
        }
        if (keys.d.hold && isColliding && keys.j.pressed ) {
          basketBall.velocity.x = throwSpeed;
          basketBall.velocity.y = 0;
          basketBall.position.y = player.position.y + 25;
        }
        if (keys.w.hold && isColliding && keys.j.pressed ) {
          basketBall.velocity.x = 0;
          basketBall.velocity.y = -throwSpeed;
       basketBall.position.y = player.position.y + 25;
        }
         if (keys.s.hold && isColliding && keys.j.pressed ) {
          basketBall.velocity.x = 0;
          basketBall.velocity.y = throwSpeed;
          //basketBall.position.y = player.position.y + 25;
        }

        //lançando na diagonal
        if (keys.a.hold && keys.w.hold && isColliding && keys.j.pressed ) {
            basketBall.velocity.x = -throwSpeed;
            basketBall.velocity.y = -throwSpeed;
            basketBall.position.y = player.position.y + 25;
          }
          if (keys.d.hold && keys.w.hold && isColliding && keys.j.pressed ) {
            basketBall.velocity.x = throwSpeed;
            basketBall.velocity.y = -throwSpeed;
            basketBall.position.y = player.position.y + 25;
          }
          if (keys.s.hold && keys.a.hold && isColliding && keys.j.pressed ) {
            basketBall.velocity.x = -throwSpeed;
            basketBall.velocity.y = throwSpeed;
            basketBall.position.y = player.position.y + 25;
          //  (isColliding)
          }
           if (keys.s.hold && keys.d.hold && isColliding && keys.j.pressed ) {
            basketBall.velocity.x = throwSpeed;
            basketBall.velocity.y = throwSpeed;
            basketBall.position.y = player.position.y + 25;
          }
        keys.j.hold = true;
    }
  }


// function get2(){
//   let isColliding2 = false;

//   if (
//       player2.position.x < basketBall.position.x + basketBall.width &&
//       player2.position.x + player2.width > basketBall.position.x &&
//       player2.position.y < basketBall.position.y + basketBall.height &&
//       player2.position.y + player2.height > basketBall.position.y
//     ) {
//       isColliding2 = true;

//     } else {
//       isColliding2 = false;

//     }

//   if(isColliding2 && keys["/"].pressed){
//     basketBall.position.y = player2.position.y + 25;
//     basketBall.velocity.x = 0;
//     basketBall.velocity.y = 0;
//       const throwSpeed = 16;

//       //lançando reto
//       if (keys.ArrowLeft.hold && isColliding2 && keys["/"].pressed ) {
//         basketBall.velocity.x = -throwSpeed;
//         basketBall.velocity.y = 0;
//         basketBall.position.y = player2.position.y + 25;
//       }
//       if (keys.ArrowRight.hold && isColliding2 && keys["/"].pressed ) {
//         basketBall.velocity.x = throwSpeed;
//         basketBall.velocity.y = 0;
//         basketBall.position.y = player2.position.y + 25;
//       }
//       if (keys.ArrowUp.hold && isColliding2 && keys["/"].pressed ) {
//         basketBall.velocity.x = 0;
//         basketBall.velocity.y = -throwSpeed;
//      basketBall.position.y = player2.position.y + 25;
//         ('true')
//       }
//        if (keys.ArrowDown.hold && isColliding2 && keys["/"].pressed ) {
//         basketBall.velocity.x = 0;
//         basketBall.velocity.y = throwSpeed;
//         //basketBall.position.y = player2.position.y + 25;
//       }

//       //lançando na diagonal
//       if (keys.ArrowLeft.hold && keys.ArrowUp.hold && isColliding2 && keys["/"].pressed ) {
//           basketBall.velocity.x = -throwSpeed;
//           basketBall.velocity.y = -throwSpeed;
//           basketBall.position.y = player2.position.y + 25;
//         }
//         if (keys.ArrowRight.hold && keys.ArrowUp.hold && isColliding2 && keys["/"].pressed ) {
//           basketBall.velocity.x = throwSpeed;
//           basketBall.velocity.y = -throwSpeed;
//           basketBall.position.y = player2.position.y + 25;
//         }
//         if (keys.ArrowDown.hold && keys.ArrowLeft.hold && isColliding2 && keys["/"].pressed ) {
//           basketBall.velocity.x = -throwSpeed;
//           basketBall.velocity.y = throwSpeed;
//           basketBall.position.y = player2.position.y + 25;
//         //   (isColliding2)
//         }
//          if (keys.ArrowDown.hold && keys.ArrowRight.hold && isColliding2 && keys["/"].pressed ) {
//           basketBall.velocity.x = throwSpeed;
//           basketBall.velocity.y = throwSpeed;
//           basketBall.position.y = player2.position.y + 25;
//         }
//       keys.j.hold = true;
//   }
// }
