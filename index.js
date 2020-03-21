let order = [];
let playOrder = [];
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

onButton.on("click", (event) => { 
    if ($(onButton).is(":checked")){
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
    playOrder = [];
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