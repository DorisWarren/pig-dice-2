function PigDice() {
  this.players = [];
}

PigDice.prototype.addPlayers = function(player) {
  this.players.push(player);
}



function Players (name, turn=false) {
  this.name = name;
  this.turn = turn;
  this.totalPoints = 0;
  this.turnPoints = 0;
}



Players.prototype.checkWinStatus = function() {
  if (this.totalPoints >= 100) {
    alert("you won!");
  }
}

Players.prototype.calculateTurnPoints= function(dieRoll) {
  if (dieRoll === 1 ){
    this.turnPoints = 0;
    $("#hold1").addClass("disabled");
    $("#roll1").addClass("disabled");
  } else {
    this.turnPoints += dieRoll
  }
}
Players.prototype.hold = function(){
  $("#hold1").addClass("disabled");
  $("#roll1").addClass("disabled");
  this.totalPoints += this.turnPoints;
  this.turnPoints = 0;
}

function dieRoll() {
  var dieRoll = Math.floor(Math.random() * 6 + 1);
  return dieRoll;
}


$(document).ready(function() {
  var pigDice = new PigDice();
  var player1;
  var player2;
  $("#player-form").submit(function(event) {
    event.preventDefault();
    var player1Name = $("#player1Name").val();
    var player2Name = $("#player2Name").val();


    player1 = new Players(player1Name, true);
    player2 = new Players(player2Name);
    pigDice.addPlayers(player1);
    pigDice.addPlayers(player2);
    $("#player-form").hide();
    $("#game-hidden").show();
    $(".totalPoints1").text(player1.totalPoints);
    $(".totalPoints2").text(player2.totalPoints);


    pigDice.players.forEach(function(player){
      if (player.turn === true){
        $(".playerName").text(player1Name);
        $(".turnPoints").text(player.turnPoints);
      }
    });
  });

  $("#rollDice").click(function() {
    var roll = dieRoll();

    pigDice.players.forEach(function(player) {
      if (player.turn === true) {
        player.calculateTurnPoints(roll);
        $(".turnPoints").text(player.turnPoints);
      }
    });
  });

  $("#hold1").click(function() {
    pigDice.players.forEach(function(player) {
      if(player.turn === true ) {
        player.hold();
        $(".turnPoints").text(player.turnPoints);
        player.checkWinStatus();
      }
    });
    $(".totalPoints1").text(player1.totalPoints);
    $(".totalPoints2").text(player2.totalPoints);
  });

  $("#endTurn1").click(function() {
    $("#hold1").removeClass("disabled");
    $("#roll1").removeClass("disabled");

    var nextPlayer;
    pigDice.players.forEach(function(player) {
      if (player.turn === false) {
        nextPlayer = player.name;
      }
    });
    pigDice.players.forEach(function(player) {
      if (player.turn === true){
        player.turn = false;
      }
    });
    pigDice.players.forEach(function(player) {
      if (player.name === nextPlayer) {
        player.turn = true;
      }
    });
    pigDice.players.forEach(function(player) {
      if(player.turn === true) {
        $(".diceRoll").text("");
        $(".playerName").text(player.name);
        $(".turnPoints").text(player.turnPoints);
        $(".totalPoints").text(player.totalPoints);
      }
    });
  });
});
