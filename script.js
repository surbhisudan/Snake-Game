const playboard=document.querySelector(".play-board");
const score=document.querySelector(".score");
const highscore=document.querySelector(".h-score");
const controls=document.querySelectorAll(".controls i");

let gameOver=false;
let foodX,foodY;
let x=0,y=0;
let snakeX=5,snakeY=5;
let snakebody=[];
let setIntervalId;
let scores=0;

// Getting high score form storage
 let highscoreelemnt=localStorage.getItem("h-score")|| 0;
 highscore.innerText= `High Score: ${highscoreelemnt}`

 const updateFoodPosition=()=>{

    foodX=Math.floor(Math.random()*30)+1;
    foodY=Math.floor(Math.random()*30)+1;


 }
 const handleGameOver=()=>{
//  after game over reload the page and clear timer
    clearInterval(setIntervalId);
    alert("Game Over! Press OK to replay!");
    location.reload();
 }

const changeDirection=(e)=>{

    if(e.key=="up" && y!=1){
        x=0;
        y=-1;
    }
    else if(e.key==="left" && x!==1){
        x=-1;
        y=0;
    }
    else if(e.key==="right" && x!==-1){
        x=1;
        y=0
    }else if(e.key==="down"&& y!==-1){
        x=0;
        y=1;
    }
} 
controls.forEach(button=>button.addEventListener("click",()=>changeDirection({
    key:button.dataset.key})));

const initGame=()=>{
    if(gameOver) return handleGameOver();
    let html=`<div class="food" style="grid-area:${foodY}/${foodX}"></div>`

    // checking if the snake hit the food
    if(snakeX===foodX && snakeY===foodY){
        updateFoodPosition();
        snakebody.push([foodY,foodX]);
        scores++;
        highscoreelemnt=scores>=highscoreelemnt? scores:highscoreelemnt;
        localStorage.setItem("h-score",highscoreelemnt);
        score.innerText=`Score:${scores}`;
        highscore.innerText=`High Score:${highscoreelemnt}`;
    }

    snakeX+=x;
    snakeY+=y;

    for(let i=snakebody.length-1;i>0;i--){
        snakebody[i]=snakebody[i-1];
    }
    snakebody[0]=[snakeX,snakeY];

    if(snakeX<=0||snakeX>30||snakeY<=0||snakeY>30){
         return gameOver=true;

  }
  for(let i=0;i<snakebody.length;i++){
   html+=`<div class="snake" style="grid-area:${snakebody[i][1]}/${snakebody[i][0]}"></div>`
  

    if(i!==0 && snakebody[0][1]===snakebody[i][1] && snakebody[0][0]===snakebody[i][0]){
        gameOver=true;
           
       }
      
    }
    playboard.innerHTML=html;
}

updateFoodPosition();
setIntervalId=setInterval(initGame,100);
document.addEventListener("keyup",changeDirection);
