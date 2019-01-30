function dieRoll() {
  var dieRoll = Math.floor(Math.random() * 6) + 1
  return dieRoll;
}





$(document).ready(function() {
  $("#rollDice").click(function() {
    $("#result").text(dieRoll());
  });
  $("#rollDice2").click(function() {
    $("#result2").text(dieRoll());
  });
});
