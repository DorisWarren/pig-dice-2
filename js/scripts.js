function PigDice() {
  this.players = [];
}

PigDice.prototype.addPlayers = function(player) {
  this.players.push(player);
}



function Players (name, turn=false) {
  this.name = name;
  this.totalPoints = 0;
  this.turnPoints = 0;
  this.turn = turn;
}

Players.prototype.endTurn = function() {
  this.turn = false;
  this.totalPoints += this.turnPoints;
  this.turnPoints = 0;
  console.log(player.playerTurnPoints)
}

Players.prototype.checkWinStatus = function() {
  if (this.totalPoints >= 100) {
    alert("you won!");
  }
}

Players.prototype.calculateTurnPoints= function(dieRoll) {
  if (dieRoll === 1 ){
    this.turnPoints = 0;
    this.turn = false;
  } else {
    this.turnPoints += dieRoll
  }
}


function dieRoll() {
  var dieRoll = Math.floor(Math.random() * 6 + 1);
  return dieRoll;
}


$(document).ready(function() {
  var pigDice = new PigDice();
  var player1Name;
  var player2Name;
  var player1;
  var player2;
  $("#player-form").submit(function(event) {
    event.preventDefault();
    player1Name = $("#player1Name").val();
    player2Name = $("#player2Name").val();


    player1 = new Players(player1Name, true);
    player2 = new Players(player2Name);
    pigDice.addPlayers(player1);
    pigDice.addPlayers(player2);


    pigDice.players.forEach(function(player){
      if (player.turn === true){
        $(".player1Name").text(player1Name);
      }
    });
    $("#player-form").hide();
    $("#game-hidden").show();
    $(".player1").append(player1Name)
    $(".player2").append(player2Name)
  });

  $("#rollDice").click(function() {
    var roll = dieRoll();
    $("#result").text(roll);
    pigDice.players.forEach(function(player) {
      if (player.turn === true) {
        player.calculateTurnPoints(roll);
        $(".player1TurnPoints").text(player.turnPoints);
        console.log(player.turnPoints);
        player.checkWinStatus();
      }
    });
  });

  $("#hold1").click(function() {
    pigDice.players.forEach(function(player) {
      if(player.turn === true ) {
        $(".player1TurnPoints").text(player.turnPoints);
        $(".player1TotalPoints").text(player.totalPoints);
        player.endTurn();
      }
    });
  });
  $("#endTurn1").click(function() {
    pigDice.players.forEach(function(player) {
      if (player.turn === false) {
        player.turn = true;
      }
      $(".player1TotalPoints").text(player.totalPoints);
      $(".player1TurnPoints").text(player.turnPoints);
    });
  });
  $("#rollDice2").click(function() {
    $("#result2").text(dieRoll());
  });
});
