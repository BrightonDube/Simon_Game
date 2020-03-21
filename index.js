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
    intervalID = ;
}

function clearColor(){

}

function gameTurn() {
    on = false;
    
}