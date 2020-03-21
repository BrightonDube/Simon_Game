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

onButton.on("click", (event) => { 
    if ($(onButton).is(":checked")){
        on = true;
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
        strictButton.css("backgroundColor", "blue");
    }else strict = false;
});

startButton.click(() => {
if (on || win){
    play();
    console.log("on"); 
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
        colorChoice = Math.round(Math.random()* 3);
        order.push(colorChoice);
    }
    compTurn = true;
    intervalID = setInterval(gameTurn, 800);
}

function clearColor(){
    topLeft.addClass("topleft");
    topRight.addClass("topright");
    bottomLeft.addClass("bottomleft");
    bottomRight.addClass("bottomright");
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
        }, 200);
    }
}
function one() {
    if (noise){
        let audio = $("#clip1");
        audio.play();
    }
    noise = true;
    topLeft.addClass("topLeft");    
}

function two() {
    if (noise){
        let audio = $("#clip2");
        audio.play();
    }
    noise = true;
    topLeft.addClass("topRight");    
}

function three() {
    if (noise){
        let audio = $("#clip3");
        audio.play();
    }
    noise = true;
    topLeft.addClass("bottomLeft");    
}
function four() {
    if (noise){
        let audio = $("#clip4");
        audio.play();
    }
    noise = true;
    topLeft.addClass("bottomRight");    
}