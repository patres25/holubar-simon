
var buttonColours = ["red","blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;

function nextSequence () {
  userClickedPattern = [];
  level++;
  $("#level-title").html("Level " + level );
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);

}


$(document).one("keydown", function() {
  $("#level-title").html("Level"+ level);
  nextSequence();

});


$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  checkAnswer(userClickedPattern.lastIndexOf(userChosenColour));
});

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  var bingo = $(".btn").click(function(){
    $(this).addClass("pressed");
    setTimeout(function(){
      $(bingo).removeClass("pressed");
    },100);
  });
}
animatePress();

function checkAnswer(currentLevel) {
 if ( gamePattern[currentLevel]=== userClickedPattern[currentLevel]) {



 if (userClickedPattern.length===gamePattern.length) {
   setTimeout(function() {
     nextSequence();
     //userClickedPattern = [];
   }, 1000);
 }
}
 else {
   var wrong = new Audio("sounds/wrong.mp3");
   wrong.play();
   $("body").addClass("game-over");
   setTimeout(function(){
     $("body").removeClass("game-over");
   },200);
   $("h1").text("Game Over, Press Any Key to Restart.");
   startOver();
 }


}

function startOver() {
level = 0;
gamePattern = [];
//userClickedPattern=[];
$(document).one("keydown", function() {
  nextSequence();
});
}
