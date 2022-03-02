const score=document.querySelector(".Score");
const startscreen=document.querySelector(".Startscreen");
const gameArea=document.querySelector(".gameArea");
document.addEventListener("keydown",keyDown);
document.addEventListener("keyup",keyUp);
startscreen.addEventListener("click",start);
let player={speed:5,score:0};
let keys={
    ArrowUp:false,
    ArrowDown:false,
    ArrowLeft:false,
    ArrowRight:false,
}
function keyDown(e){
    e.preventDefault();
    keys[e.key]=true;
}
function keyUp(e){
    e.preventDefault();
    keys[e.key]=false;
}
function iscollision(a,b){
    arect=a.getBoundingClientRect();
    brect=b.getBoundingClientRect();
    return !((arect.top> brect.bottom)||(arect.bottom<brect.top)||(arect.right<brect.left)||(arect.left>brect.right))
}
function movelines(){
    let lines=document.querySelectorAll(".lines");
    lines.forEach(function(item){
        if(item.y>=700)
         {
             item.y-=750
         }
       item.y+=player.speed;
       item.style.top=item.y+"px"
    })
}
function endgame(){
    player.start=false;
    startscreen.classList.remove("hide");
}
function moveenemy(car){
    let enemy=document.querySelectorAll(".enemy");
    enemy.forEach(function(item){
        if(iscollision(car,item))
          {
              console.log("ayush");
              endgame();
          }
        if(item.y>=750)
         {
             item.y= -300;
            item.style.left=Math.floor(Math.random()*350)+"px";
         }
       item.y+=player.speed;
       item.style.top=item.y+"px"; 
    })
}
function Gameplay(){
    let car=document.querySelector(".car");
    let road=gameArea.getBoundingClientRect();
    // console.log(road)
    if(player.start)
    {
        movelines();
        moveenemy(car);
        if(keys.ArrowUp&&player.y>road.top+70)
              player.y-=player.speed;
          if(keys.ArrowDown && player.y<road.bottom-100)
             player.y+=player.speed;
            if(keys.ArrowLeft && player.x>0){
                player.x-=player.speed
            }
            if(keys.ArrowRight && player.x<(road.width-50)){
                 player.x+=player.speed
            }
       window.requestAnimationFrame(Gameplay);
       console.log(player.score++);
       player.score++;
       score.innerHTML="score:"+player.score;
    }
    car.style.top=player.y+"px";
    car.style.left=player.x+"px";
    // console.log("game started");
}
function start(){
    // gameArea.classList.remove("hide");
    startscreen.classList.add("hide");
    gameArea.innerHTML="";
    player.start=true;
    player.score=0;
    window.requestAnimationFrame(Gameplay);
    for(x=0;x<5;x++){
        let roadline=document.createElement("div");
    roadline.setAttribute("class","lines");
    roadline.y=x*150;
    roadline.style.top=roadline.y+"px";
    gameArea.appendChild(roadline);
    }
        
    let car =document.createElement("div");
    car.setAttribute("class","car");
    gameArea.appendChild(car);
    player.x=car.offsetLeft;
    player.y=car.offsetTop;
    for(x=0;x<3;x++){
    let enemycar=document.createElement("div");
    enemycar.setAttribute("class","enemy");
    enemycar.y=((x+1)*150);
    enemycar.style.top=enemycar.y+"px"; 
    enemycar.style.backgroundColor="blue";
    enemycar.style.left=Math.floor(Math.random()*350)+"px";
    gameArea.appendChild(enemycar);
    }
}