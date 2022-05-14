
var buttonColours = ["blue", "green", "red", "yellow"];
var gamePattern = [];
var userPattern = [];

var started = false;

var level = 0;

$(document).keypress(function(){
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function(){

  var userChosenColours = $(this).attr("id");
  userPattern.push(userChosenColours);

  playSound(userChosenColours);
  pressAnimate(userChosenColours);


  checkAnswer(userPattern.length);
});

function checkAnswer(currentLevel) {
  if (currentLevel == gamePattern.length) {
    if (userPattern[currentLevel-1] == gamePattern[currentLevel-1]) {
      userPattern = [];
      setTimeout(function(){
        nextSequence();
      },500)
    }
  }
  else if (userPattern[currentLevel-1] != gamePattern[currentLevel-1]) {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200)
    $("#level-title").text("Game Over, Press Any Key to Restart");
    started = false;
    level = 0;
    userPattern = [];
    gamePattern = [];
  }
}


function pressAnimate(press) {
  $("#" + press).addClass("pressed");
  setTimeout(function(){
    $("#" + press).removeClass("pressed");
  },100)
}

function nextSequence() {
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomColours = buttonColours[randomNumber];
  gamePattern.push(randomColours);

  $("#" + randomColours).fadeOut(250).fadeIn(250);
  playSound(randomColours);

}

function playSound(audioName) {
  var sound = new Audio("sounds/" + audioName + ".mp3");
  sound.play();
}
