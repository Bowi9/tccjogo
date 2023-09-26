function determineWinner({player,player2, timerId}){
  clearTimeout(timerId)
  document.querySelector('#displayText').style.display = "flex"
  if (player.points === player2.points) {
      document.querySelector('#displayText').innerHTML = "Tie"
      movement = false
      
  }else if(player.points > player2.points){
    document.querySelector('#displayText').innerHTML = "Player 1 Wins"
    movement = false

  }else{
    document.querySelector('#displayText').innerHTML = "Player 2 Wins"
    movement = false
  }
}

let timer = 60
let timerId
function decreaseTimer(){
    
    if(timer >0){
        timerId = setTimeout(decreaseTimer, 1000)
        timer--;
        document.querySelector('#timer').innerHTML = timer
    }

    if(timer===0){
        determineWinner({player,player2,timerId})
    }
}