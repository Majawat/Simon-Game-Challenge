var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern= [];


function nextSequence(){
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    
    gamePattern.push(randomChosenColor);

    $("."+randomChosenColor).fadeOut().fadeIn();

    var audio = new Audio("sounds/"+randomChosenColor+".mp3");
    audio.play();
}

$(".btn").on("click",function(){
    var userChosenColor = this.id;
    console.log("clicked ID: "+userChosenColor);
})