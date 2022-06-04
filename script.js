let userName=document.getElementById("username");
let gridItems=document.querySelectorAll(".griditems");
let start=document.getElementById("start");
let restart=document.getElementById("restart");
let playagn=document.getElementById("playagain");
let score=document.getElementById("scoreval");
let finalscore=document.getElementById("finalscore")
let scoretracker=[0];
let tiletracker;
start.addEventListener("click",startgame);
restart.addEventListener("click",restartgame);
playagn.addEventListener("click",playagain);

let lit_up_tiles=[];
var wrongaudio=new Audio("wrongclick.mp3");
var correctaudio=new Audio("correctclick.mp3");
var gamemusic=new Audio("gamemusic.mp3")
let lay1=document.querySelector(".sec1")//useername screen
let lay2=document.querySelector(".sec2")//game screen
let lay3=document.querySelector(".sec3");//gameover
let lay4=document.querySelector(".sec4")//leaderboard
let layout=document.querySelector(".body")

// STOPWATCH
var seconds = 00; 
var tens = 00; 
var appendTens = document.getElementById("tens")
var appendSeconds = document.getElementById("seconds")

var Interval ;
//
let highScores=JSON.parse(localStorage.getItem("highScores")) || [];
let highscoreList=document.getElementById("highscorelist");


lay2.parentNode.removeChild(lay2)//Removes the game screen..username only will be there
lay3.parentNode.removeChild(lay3)
lay4.parentNode.removeChild(lay4)



for(let i=0;i<16;i++){
    let j=i+1;
    gridItems[i].classList.add(`tile${j}`)
    
}
let randarr=[];
for(let i=0;i<16;i++){
    randarr.push(i);
}
function time(ms){
    return new Promise((resolve,reject)=>{
        setTimeout(resolve,ms);
    })
}

async function startgame(){
    clearInterval(Interval);
    Interval = setInterval(startTimer, 10);//calls the start tier every 10 ms
    gamemusic.loop=true;
    gamemusic.play();
    
    await time(1000);
    window.requestAnimationFrame(gameloop);
   
    
}
function restartgame(){
    window.location.reload();
}
function randgen(){//returns unique integers from 0-15 everytime
    let rand=randarr[Math.floor(Math.random()*(randarr.length))]
    let ind=randarr.indexOf(rand);
    randarr.splice(ind,1);
    return rand;
}

async function gameloop(){
    
    
    lightup();
    await time(100);
    window.requestAnimationFrame(clicktile);
}
async function lightup(){
    let randm=randgen();
    lit_up_tiles.push(randm);
    
    for(let a=0;a<lit_up_tiles.length;a++){
        gridItems[lit_up_tiles[a]].classList.add("tilelightup");
        setTimeout(function (){gridItems[lit_up_tiles[a]].classList.remove("tilelightup")},150);
        await time(750);
        
    }
}

function clicktile(){
    let max_noof_clicks=lit_up_tiles.length;
    let no_of_clicks=0;
    
    for(let i=0;i<16;i++){
        gridItems[i].addEventListener("click",function kpo(){
            
                
                tiletracker=i;
                no_of_clicks++;
                gridItems[i].removeEventListener("click",kpo);
                checktile(max_noof_clicks,no_of_clicks);

            })
    }
}

async function checktile(max_noof_clicks,no_of_clicks){
    if(no_of_clicks<=max_noof_clicks){
        
        if(lit_up_tiles.includes(tiletracker)){
            gridItems[tiletracker].classList.add("correctclick");
            score.innerHTML=scoreupdate(scoretracker);
            correctaudio.play();
            setTimeout(function (){gridItems[tiletracker].classList.remove("correctclick")},200);

        }
        else{
            gridItems[tiletracker].classList.add("wrongclick");
            wrongclickact();
            setTimeout(function (){gridItems[tiletracker].classList.remove("wrongclick")},200);
            await time(300);
            lay2.parentNode.removeChild(lay2)
            layout.appendChild(lay3);
            finalscore.innerHTML=scoretracker[0];

        }
    }
    if(no_of_clicks==max_noof_clicks){
        
        await time(500);
        window.requestAnimationFrame(gameloop);
        
    }
    else{
        return;
    }
    
    
}
function gameover(){
   
}
function readybtn(){
    
    lay1.parentNode.removeChild(lay1);
    layout.appendChild(lay2)
}
function wrongclickact(){

    gamemusic.pause();
    gamemusic.currentTime=0;
    wrongaudio.play();
    stoptimer();
    resetimer();
    score.innerHTML="00"
    
}       
        


  


function s() {
  
  clearInterval(Interval);
   Interval = setInterval(startTimer, 10);//calls the start tier every 10 ms
   
}

function stoptimer() {
     clearInterval(Interval);
}


function resetimer() {
   clearInterval(Interval);
   tens = "00";
   seconds = "00";
   appendTens.innerHTML = tens;
   appendSeconds.innerHTML = seconds;
}

 
function startTimer(){
    tens++; 
  
    if(tens <= 9){
        appendTens.innerHTML = "0" + tens;
    }
  
    if (tens > 9){
        appendTens.innerHTML = tens;
   
    } 
  
    if (tens > 99) {
        
        seconds++;
        appendSeconds.innerHTML = "0" + seconds;
        tens = 0;
        appendTens.innerHTML = "0" + 0;
    }

    if (seconds > 9){
        appendSeconds.innerHTML = seconds;
    }

}

function playagain(){
    window.location.reload();
}
function leadbtn(){
    lay3.parentNode.removeChild(lay3);
    layout.appendChild(lay4);
    savehighscore();
    displead();
}

function scoreupdate(scoretracker){
    scoretracker[0]+=10;
    let a=`${scoretracker}`
    return a;
}

function savehighscore(){
    let ind={
        Username:userName.value,
        Points:scoretracker[0]
    }
    highScores.push(ind);
    highScores.sort((a,b)=> b.Points-a.Points);
    highScores.splice(5);
    localStorage.setItem("highScores",JSON.stringify(highScores));
}
//display leaderboard
function displead(){
    highscoreList.innerHTML=highScores.map(ind=>{
        return `<li class="lihighscore">${ind.Username} ${ind.Points}<li>`
    }).join("")
}
