let order = [];
let playerOrder = [];
let flash;
let turn;
let good;
let compTurn;
let intervalID;
let strict = false;
let noise  = true;
let on = false;
let win = false;

const turnCounter = $('#turn');
const topLeft = $("#topleft");
const topRight = $("#topright");
const bottomLeft = $("#bottomleft");
const bottomRight = $("#bottomright");
const onButton = $("#on");
const strictButton = $("#strict");
const startButton = $("#start");

//this turns of the light of the clicked button;
function clearColor(){
    topLeft.removeClass("topLeft");
    topRight.removeClass("topRight");
    bottomLeft.removeClass("bottomLeft");
    bottomRight.removeClass("bottomRight");
}
function flashColor() {    
    topLeft.addClass("topLeft");
    topRight.addClass("topRight");
    bottomLeft.addClass("bottomLeft");
    bottomRight.addClass("bottomRight");    
}

onButton.on("click", (event) => { 
    if (onButton.is(":checked")){
        on = true;
        onButton.css("background-color", "blue")
        turnCounter.html("-");
    } else {
        on = false;
        turnCounter.html("");
        clearColor();
        clearInterval(intervalID);
        }
    });

strictButton.click(function(){
    if($(strictButton).is(":checked")){
        strict = true;
        strictButton.css("background-color", "blue");
    }else strict = false;
});

startButton.click(() => {
if (on || win){
    play();    
}
});
function play() {
    win = false;
    order = [];
    playerOrder = [];
    flash = 0;
    intervalID = 0;
    turn = 1;
    turnCounter.html("1");
    good = true;
    let colorChoice; 
    for(let i = 0; i < 20; i++){
        colorChoice = Math.round(Math.random()* 3 + 1);
        order.push(colorChoice);
    }
    compTurn = true;
    intervalID = setInterval(gameTurn, 800);
}



function gameTurn() {
    on = false;
    if (flash === turn){
        clearInterval(intervalID);
        compTurn = false;
        clearColor();
        on = true;
    }
    if (compTurn) {
        clearColor();
        setTimeout(() => {
            if(order[flash] == 1) one();
            if(order[flash] == 2) two();
            if(order[flash] == 3) three();
            if(order[flash] == 4) four();
            flash++;
        }, 200);
    }
}
function one() {
    if (noise){
        $("#clip1")[0].play();
    }
    noise = true;
    topLeft.addClass("topLeft");    
}

function two() {
    if (noise){
        $("#clip2")[0].play();
    }
    noise = true;
    topRight.addClass("topRight");    
}

function three() {
    if (noise){
        $("#clip3")[0].play();
    }
    noise = true;
    bottomLeft.addClass("bottomLeft");    
}
function four() {
    if (noise){
        $("#clip4")[0].play();
    }
    noise = true;
    bottomRight.addClass("bottomRight");    
}

topLeft.click(() => { 
  if (on) {
      playerOrder.push(1);
      check();
      one();
      if(!win){
          setTimeout(() => {
            clearColor();
          }, 300);
      }
  }  
    
});

topRight.click(() => { 
    if (on) {
        playerOrder.push(2);
        check();
        two();
        if(!win){
            setTimeout(() => {
              clearColor();
            }, 300);
        }
    }  
      
  });

bottomLeft.click(() => { 
    if (on) {
        playerOrder.push(3);
        check();
        three();
        if(!win){
            setTimeout(() => {
              clearColor();
            }, 300);
        }
    }  
      
});

bottomRight.click(() => { 
    
    if (on) {
        playerOrder.push(4);
        check();
        four();
        if(!win){
            setTimeout(() => {
              clearColor();
            }, 300);
        }
    }  
      
});

function check() {
    let lastOrder = playerOrder.length - 1;

    if (playerOrder[lastOrder] !== order[lastOrder]) good = false;
    
    if (lastOrder == 1 && good) winGame();

    if (good == false){
        flashColor();
        turnCounter.html("NO!");
        setTimeout(() => {
            turnCounter.html(turn);
            clearColor();

            if (strict) play();
            else {
                reset();                
                good = true;
                intervalID = setInterval(gameTurn, 800);
            }
        },800);

    noise = false;
    }

    if (turn == lastOrder && good && !win) {
        turn++;
        reset();
        turnCounter.html(turn);
    }
    
}

function reset() {
    compTurn = true;
    flash = 0;
    playerOrder = [];    
}

function winGame() {
    flashColor();
    setTimeout(() => {
       clearColor(); 
    }, 500);
    turnCounter.html("WIN!");
    on = false;
    win = true;
}



