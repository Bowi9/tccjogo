const gravity = 1

class Sprite {
    constructor({
        position,
        velocity,
        dimensions,

 


    }){
        this.position = position
        this.velocity = velocity
        this.width = dimensions?.width
        this.height = dimensions?.height
    }

    draw(){
        ctx.fillStyle = this.color.color
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update (){
        this.draw()
    }
}

class Actor extends Sprite{
    constructor({
        position,
        velocity,
        dimensions,
        color,
        bounce,
        inicialX,
        inicialY,
        offset = {x: 0, y:0},

        
        rebote
    }){
        super({
            position,
            velocity,
            dimensions
        })
        
        this.velocity = velocity
        this.hitbox = {
            position: {
              x: this.position.x,
              y: this.position.y,
            },
            width: dimensions.width,
            height: dimensions.height,
          }
        this.width = dimensions.width
        this.height = dimensions.height
        this.color = color
        this.offset = {
            x: offset.x,
            y: offset.y
        }
        this.onGround
        this.onColission = false         
        this.lastKeyPressed
        //this.isColliding = false
        this.bounce = bounce
        this.onMovement = false
        this.top = 351
        this.bottom = 650   
        this.Ground = true
        this.points = 0
        this.totalPoints = 1
        this.beforePoints = 0
        this.end = false
        //this.rebote = rebote
    }

    update(){

        if(Math.ceil(this.position.y + this.height) >= canvas.height){
            this.onGround = true
            //this.velocity.y = 0
          
        }else{
            this.onGround =false
           // this.velocity.y += gravity
        }

        if(this.position.y + this.height > canvas.height){
            this.position.y = canvas.height - this.height
            if (Math.abs(this.velocity.y) < 1) {
                this.velocity.y = 0
            }else{
                this.velocity.y *= -this.bounce.y;
            }
            
        }else{
            if(!this.onGround) this.velocity.y +=gravity
    
        }

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (Math.ceil(this.position.x + this.width) >= canvas.width ) {
           this.position.x = canvas.width - this.width
           this.velocity.x *= -this.bounce.x;
        //    this.rebote = this.velocity.x = -this.velocity.x

          }else if (this.position.x <= 0) {
            this.position.x = 0;
            this.velocity.x *= -this.bounce.x;
        //    this.rebote = this.velocity.x = -this.velocity.x

          }
          if(this.onGround){
            this.velocity.x *= 0.99;
            this.velocity.y *= 0.99;
          }
        this.collisionSupport() 
        this.collisionHoop1()
        this.collisionHoop2() 

        this.collision2Support() 
        this.collision2Hoop1()
        this.collision2Hoop2()
          
        this.DoingPoint()  
        
        this.draw()

        player.win = false

         }

         collisionWall(){
            if (this.position.x + this.width > wall.position.x &&
                this.position.x < wall.position.x + wall.width &&
                this.position.y + this.height > wall.position.y &&
                this.position.y < wall.position.y + wall.height) { 
    
    
                    
                    if(this.position.y < wall.position.y ){
                        this.Ground = false
                     }
                     else if(!(this.position.y < support.position.y )
                    // && ((this.position.y + this.height)< support.position.y + support.height)
                     ){
                        this.Ground = true
                    }

                    
    
                        if (this.velocity.x > 0 && this.Ground) {
                          
                        this.velocity.x *= -this.bounce.x;
                        this.position.x = wall.position.x - this.width
                    }
    
                      else if (this.velocity.x < 0 && this.Ground) {
                    
                          
                        this.velocity.x *= -this.bounce.x;
                        this.position.x = wall.position.x + wall.width  +0.01
    
                      }
                    
                        else if (this.velocity.y > 0 && !this.Ground) { 
    
                          
            
                        this.onGround = true;
                    
                        this.velocity.y *= -this.bounce.x;
                    
                        this.position.y = wall.position.y - this.height   
                               
                        }
                        // else if(this.velocity.y < 0 && this.Ground) {}
        
                        // this.onGround = true;
                    
                        // this.velocity.y *= -this.bounce.x;
                    
                        // this.position.y = wall.position.y + wall.height
                        //   

                   
                }
        }

        
    collisionSupport(){
        if (this.position.x + this.width > support.position.x &&
            this.position.x < support.position.x + support.width &&
            this.position.y + this.height > support.position.y &&
            this.position.y < support.position.y + support.height) { 


                
                if(this.position.y< support.position.y ){
                    this.Ground = false
                 }
                 else if(!(this.position.y < support.position.y )){
                    this.Ground = true

                 
                }

            
                //  (player.position.y  + " player situação false")
                //  (support.position.y + " suporte situação false")
                //  ((((this.position.y - support.height) + support.height) + this.height)+(support.height +support.position.y)  + " suporte situação true")
                //  ( (this.position.y + this.height)   + " player situação true")



                    if (this.velocity.x > 0 && this.Ground) {
                      
                    this.velocity.x *= -this.bounce.x;
                    this.position.x = support.position.x - this.width
                }

                  else if (this.velocity.x < 0 && this.Ground) {
                
                      
                    this.velocity.x *= -this.bounce.x;
                    this.position.x = support.position.x + support.width  +0.01

                  }
                
                    else if (this.velocity.y > 0 && !this.Ground) { 

                      
        
                    this.onGround = true;
                
                    this.velocity.y *= -this.bounce.x;
                
                    this.position.y = support.position.y - this.height   
                           
                    }
               
            }
    }

    
    collision2Support(){
        if (this.position.x + this.width > support2.position.x &&
            this.position.x < support2.position.x + support2.width &&
            this.position.y + this.height > support2.position.y &&
            this.position.y < support2.position.y + support2.height) { 


                
                if(this.position.y< support2.position.y ){
                    this.Ground = false
                 }
                 else if(!(this.position.y < support2.position.y )){
                    this.Ground = true

                 
                }

                //  (this.Ground)
                // //  (player.position.y  + " player situação false")
                // //  (support2.position.y + " suporte situação false")
                //  ((((this.position.y - support2.height) + support2.height) + this.height)+(support2.height +support2.position.y)  + " suporte situação true")
                //  ( (this.position.y + this.height)   + " player situação true")



                    if (this.velocity.x > 0 && this.Ground) {
                      
                    this.velocity.x *= -this.bounce.x;
                    this.position.x = support2.position.x - this.width
                }

                  else if (this.velocity.x < 0 && this.Ground) {
                
                      
                    this.velocity.x *= -this.bounce.x;
                    this.position.x = support2.position.x + support2.width  +0.01

                  }
                
                    else if (this.velocity.y > 0 && !this.Ground) { 

                      
        
                    this.onGround = true;
                
                    this.velocity.y *= -this.bounce.x;
                
                    this.position.y = support2.position.y - this.height   
                           
                    }
               
            }
    }

    collisionHoop1(){
        if (this.position.x + this.width > hoop.hitBox3.position.x &&
            this.position.x < hoop.hitBox3.position.x + hoop.hitBox3.width &&
            this.position.y + this.height > hoop.hitBox3.position.y &&
            this.position.y < hoop.hitBox3.position.y + hoop.hitBox3.height) { 


                
                if(this.position.y< hoop.hitBox3.position.y ){
                    this.Ground = false
                 }
                else{
                    this.Ground = true
                }

                    if (this.velocity.x > 0 && this.Ground) {
                      
                    this.velocity.x *= -this.bounce.x;
                    this.position.x = hoop.hitBox3.position.x - this.width
                }

                  else if (this.velocity.x < 0 && this.Ground) {
                
                      
                    this.velocity.x *= -this.bounce.x;
                    this.position.x = hoop.hitBox3.position.x + hoop.hitBox3.width  +0.01

                  }
                
                    else if (this.velocity.y > 0 && !this.Ground) { 

                      
        
                    this.onGround = true;
                
                    this.velocity.y *= -this.bounce.x;
                
                    this.position.y = hoop.hitBox3.position.y - this.height   
                           
                    }

                     else if(this.velocity.y < 0 && this.Ground) {
                        this.onGround = true;
                    
                        this.velocity.y *= -this.bounce.x;
                    
                        this.position.y = hoop.hitBox3.position.y + hoop.hitBox3.height
                          
               
                     }
        
                       
            }
        }

    collision2Hoop1(){
        if (this.position.x + this.width > hoop2.hitBox3.position.x &&
            this.position.x < hoop2.hitBox3.position.x + hoop2.hitBox3.width &&
            this.position.y + this.height > hoop2.hitBox3.position.y &&
            this.position.y < hoop2.hitBox3.position.y + hoop2.hitBox3.height) { 


                
                if(this.position.y< hoop2.hitBox3.position.y ){
                    this.Ground = false
                 }
                else{
                    this.Ground = true
                }

                    if (this.velocity.x > 0 && this.Ground) {
                      
                    this.velocity.x *= -this.bounce.x;
                    this.position.x = hoop2.hitBox3.position.x - this.width
                }

                  else if (this.velocity.x < 0 && this.Ground) {
                
                      
                    this.velocity.x *= -this.bounce.x;
                    this.position.x = hoop2.hitBox3.position.x + hoop2.hitBox3.width  +0.01

                  }
                
                    else if (this.velocity.y > 0 && !this.Ground) { 

                      
        
                    this.onGround = true;
                
                    this.velocity.y *= -this.bounce.x;
                
                    this.position.y = hoop2.hitBox3.position.y - this.height   
                           
                    }

                     else if(this.velocity.y < 0 && this.Ground) {
                        this.onGround = true;
                    
                        this.velocity.y *= -this.bounce.x;
                    
                        this.position.y = hoop2.hitBox3.position.y + hoop2.hitBox3.height
                          
               
                     }
        
                       
            }
        }  


    collisionHoop2(){
        if (this.position.x + this.width > hoop.hitBox4.position.x &&
            this.position.x < hoop.hitBox4.position.x + hoop.hitBox4.width &&
            this.position.y + this.height > hoop.hitBox4.position.y &&
            this.position.y < hoop.hitBox4.position.y + hoop.hitBox4.height) { 


                
                if(this.position.y< hoop.hitBox4.position.y ){
                    this.Ground = false
                 }
                else{
                    this.Ground = true
                }

                    if (this.velocity.x > 0 && this.Ground) {
                      
                    this.velocity.x *= -this.bounce.x;
                    this.position.x = hoop.hitBox4.position.x - this.width
                }

                  else if (this.velocity.x < 0 && this.Ground) {
                
                      
                    this.velocity.x *= -this.bounce.x;
                    this.position.x = hoop.hitBox4.position.x + hoop.hitBox4.width  +0.01

                  }
                
                    else if (this.velocity.y > 0 && !this.Ground) { 

                      
        
                    this.onGround = true;
                
                    this.velocity.y *= -this.bounce.x;
                
                    this.position.y = hoop.hitBox4.position.y - this.height   
                           
                    }

                     else if(this.velocity.y < 0 && this.Ground) {
                        this.onGround = true;
                    
                        this.velocity.y *= -this.bounce.x;
                    
                        this.position.y = hoop.hitBox4.position.y + hoop.hitBox4.height
                          
               
                     }
        
                       
            
        }

}

    collision2Hoop2(){
        if (this.position.x + this.width > hoop2.hitBox4.position.x &&
            this.position.x < hoop2.hitBox4.position.x + hoop2.hitBox4.width &&
            this.position.y + this.height > hoop2.hitBox4.position.y &&
            this.position.y < hoop2.hitBox4.position.y + hoop2.hitBox4.height) { 


                
                if(this.position.y< hoop2.hitBox4.position.y ){
                    this.Ground = false
                 }
                else{
                    this.Ground = true
                }

                    if (this.velocity.x > 0 && this.Ground) {
                      
                    this.velocity.x *= -this.bounce.x;
                    this.position.x = hoop2.hitBox4.position.x - this.width
                }

                  else if (this.velocity.x < 0 && this.Ground) {
                
                      
                    this.velocity.x *= -this.bounce.x;
                    this.position.x = hoop2.hitBox4.position.x + hoop2.hitBox4.width  +0.01

                  }
                
                    else if (this.velocity.y > 0 && !this.Ground) { 

                      
        
                    this.onGround = true;
                
                    this.velocity.y *= -this.bounce.x;
                
                    this.position.y = hoop2.hitBox4.position.y - this.height   
                           
                    }

                     else if(this.velocity.y < 0 && this.Ground) {
                        this.onGround = true;
                    
                        this.velocity.y *= -this.bounce.x;
                    
                        this.position.y = hoop2.hitBox4.position.y + hoop2.hitBox4.height
                          
               
                     }
        
                       
            
        }

}
 DoingPoint(){
    if (
        basketBall.position.x < hoop.hitBox.position.x + hoop.hitBox.width &&
        basketBall.position.x + basketBall.width > hoop.hitBox.position.x &&
        basketBall.position.y < hoop.hitBox.position.y + hoop.hitBox.height  &&
        basketBall.position.y + basketBall.height > hoop.hitBox.position.y
      ) {
     
         console.log("foi1")
           
         if (player.points <= 2) {
            if ((player.points > player.beforePoints)) {
                player.points = player.points
             }else if(!(player.points > player.beforePoints)){
                player.points = player.points+1 
                
                
             }
             if((player.points == player.totalPoints)){

                

                player.beforePoints++
                player.totalPoints++

                player.position.x = 400
                player.position.y = 300
                player.velocity.x = 0
                player.velocity.y = 0
    
                player2.position.x = 1372
                player2.position.y = 300
                player2.velocity.x = 0
                player2.velocity.y = 0
    
                basketBall.position.x = 900
                basketBall.position.y = 300
                basketBall.velocity.x = 0
                basketBall.velocity.y = 0
        
                
        
             }
          }else {
            player.end = true
         }
         }


         if (
            basketBall.position.x < hoop2.hitBox.position.x + hoop2.hitBox.width &&
            basketBall.position.x + basketBall.width > hoop2.hitBox.position.x &&
            basketBall.position.y < hoop2.hitBox.position.y + hoop2.hitBox.height  &&
            basketBall.position.y + basketBall.height > hoop2.hitBox.position.y
          ) {


            if (player2.points <= 2) {
                if ((player2.points > player2.beforePoints)) {
                    player2.points = player2.points
                 }else if(!(player2.points > player2.beforePoints)){
                    player2.points = player2.points+1 
                    
                    
                 }
                 if((player2.points == player2.totalPoints)){

                    

                    player2.beforePoints++
                    player2.totalPoints++
    
                    player.position.x = 400
                    player.position.y = 300
                    player.velocity.x = 0
                    player.velocity.y = 0
        
                    player2.position.x = 1372
                    player2.position.y = 300
                    player2.velocity.x = 0
                    player2.velocity.y = 0
        
                    basketBall.position.x = 900
                    basketBall.position.y = 300
                    basketBall.velocity.x = 0
                    basketBall.velocity.y = 0

                    this.end = true
                 }
              }
          }     
        
    
 }


    
    

    jump(){
        if(!this.onGround) return
        this.velocity.y = - 30
    }
}

class Scenario extends Sprite{
    constructor({
        position,
        dimensions,
        color,
        offset = {x: 0, y:0},
        hitBox = {offset:{}, width: undefined, height: undefined},
        hitBox3 = {offset:{}, width: undefined, height: undefined},
        hitBox4 = {offset:{}, width: undefined, height: undefined},
        
    }){
        super({
            position,
            dimensions
        })
        this.width = dimensions.width
        this.height = dimensions.height
        this.color = color
        this.hitBox = {
            position:{
                x: this.position.x,
                y: this.position.y
            }, 
            offset: hitBox.offset,
            width: hitBox.width,
            height: hitBox.height
        }
        this.hitBox3 = {
            position:{
                x: this.position.x,
                y: this.position.y
            }, 
            offset: hitBox3.offset,
            width: hitBox3.width,
            height: hitBox3.height
        }
        this.hitBox4 = {
            position:{
                x: this.position.x,
                y: this.position.y
            }, 
            offset: hitBox4.offset,
            width: hitBox4.width,
            height: hitBox4.height
        }

       
    }

    update(){


         
          this.hitBox.position.x = this.position.x + this.hitBox.offset.x
          this.hitBox.position.y = this.position.y + this.hitBox.offset.y

          this.hitBox3.position.x = this.position.x + this.hitBox3.offset.x
          this.hitBox3.position.y = this.position.y + this.hitBox3.offset.y

          this.hitBox4.position.x = this.position.x + this.hitBox4.offset.x
          this.hitBox4.position.y = this.position.y + this.hitBox4.offset.y
        
        ctx.fillStyle = "red"
          ctx.fillRect(
            this.hitBox.position.x,
            this.hitBox.position.y,
            this.hitBox.width,
            this.hitBox.height
          )

          ctx.fillStyle = "gray"
          ctx.fillRect(
            this.hitBox3.position.x,
            this.hitBox3.position.y,
            this.hitBox3.width,
            this.hitBox3.height
          )


          ctx.fillStyle = "brown"
          ctx.fillRect(
            this.hitBox4.position.x,
            this.hitBox4.position.y,
            this.hitBox4.width,
            this.hitBox4.height
          )
    
        this.draw();
    }

}


const player = new Actor({
    position:{
        x: 400,
        y: (800 - 500)
    },
    velocity:{
        x:0,
        y:0
    },
    dimensions:{
        width:50,
        height:150
    },
    color:{
        color : "white"
    },
    bounce:{
        x:0,
        y:0
    },
    offset:{
        x: 400,
        y: 300
    }
})

const player2 = new Actor({
    position:{
        x: (1824 - 450),
        y: (800 - 500)
    },
    velocity:{
        x:0,
        y:0
    },
    dimensions:{
        width:50,
        height:150
    },
    color:{
        color : "red"
    },
    bounce:{
        x:0,
        y:0
    },
    offset:{
        x: 1372,
        y: 300
    }
})

const basketBall = new Actor({
    position:{
        x: 900,
        y: 300
    },
    velocity:{
        x:0,
        y:0
    },
    dimensions:{
        width:50,
        height:50
    },
    color:{
        color : "green"
    },
    bounce:{
        x:0.8,
        y:0.8
    },
    offset:{
        x: 900,
        y: 300
    }
});

const hoop = new Scenario({
    position:{
        x: 1464,
        y: 250
    },
    dimensions:{
        width:0,
        height:0
    },
    color:{
        color : "purple"
    },
    hitBox4:{
        offset:{
            x: 170,
            y: 0,
    
        },
        width:50,
        height:60

    },
    hitBox3:{
        offset:{
            x: 0,
            y: 0,
    
        },
        width:50,
        height:60

    },
    hitBox:{
        offset:{
            x: 50,
            y: 20,
    
        },
        width:120,
        height:30

    },   
});

const support = new Scenario({
    position:{
        x: hoop.hitBox4.position.x + (hoop.hitBox4.width*4.41),
        y: hoop.hitBox4.position.y - 100
    },
    dimensions:{
        width:40,
        height: 700
    },
    color:{
        color : "cyan"
    },
    
    

});

const wall = new Scenario({
    position:{
        x: 900,
        y: 500
    },
    dimensions:{
        width:400,
        height:300
    },
    color:{
        color : "orange"
    }, 
    

});

const hoop2 = new Scenario({
    position:{
        x: 140,
        y: 250
    },
    dimensions:{
        width:0,
        height:0
    },
    color:{
        color : "purple"
    },
    hitBox4:{
        offset:{
            x: 170,
            y: 0,
    
        },
        width:50,
        height:60

    },
    hitBox3:{
        offset:{
            x: 0,
            y: 0,
    
        },
        width:50,
        height:60

    },
    hitBox:{
        offset:{
            x: 50,
            y: 20,
    
        },
        width:120,
        height:30

    },   
});

const support2 = new Scenario({
    position:{
        x: hoop2.hitBox4.position.x - (hoop2.hitBox3.width) + 10,
        y: hoop2.hitBox4.position.y - 100
    },
    dimensions:{
        width:40,
        height: 700
    },
    color:{
        color : "cyan"
    },
    
    

});



