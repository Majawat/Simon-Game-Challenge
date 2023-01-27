var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern= [];
var userClickedPattern = [];
var level = 0

//--Start Game--\\
$(document).keydown(function(){
    if(level===0){
        $("h1").text("Level "+level);
        nextSequence();
    }
});


//--Game Logic--\\
//User actions
function enableButtons(){
    $(".btn").on("click",function(){
        var userChosenColor = this.id;

        userClickedPattern.push(userChosenColor);

        checkAnswer(userClickedPattern.length-1);

        playSound(userChosenColor);
        animatePress(userChosenColor);
    })
}

function disableButtons(){
    $(".btn").off("click");
}

//Create sequence
function nextSequence(){
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    
    gamePattern.push(randomChosenColor);

    $("."+randomChosenColor).fadeOut().fadeIn();

    //IDEA: Play back full sequence, maybe an option?
    disableButtons();
    playSound(randomChosenColor);
    animatePress(randomChosenColor);
    enableButtons();


    level++;
    $("h1").text("Level "+level);
}

//Check answer
function checkAnswer(currentLevel){
    console.log("game:"+ gamePattern+"\nuser:"+userClickedPattern);
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        //rightAnswer
        console.log("right");
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
                userClickedPattern = [];
            },1000);
        }
    }else{
        //wrongAnswer
        console.log("wrong");
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver(){
    level = 0
    gamePattern = [];
    userClickedPattern=[];
}

//--Visuals--\\
function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("."+currentColor).addClass("pressed");
    setTimeout( function(){
        $("."+currentColor).removeClass("pressed");
    },100);
}