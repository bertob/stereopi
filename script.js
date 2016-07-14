var SERVER_IP = "172.24.1.1";
var PORT = 1337;

$("#play").on("click touchend", function() {
	callServer("play");
});
$("#pause").on("click touchend", function() {
	callServer("pause");
});
$("#next").on("click touchend", function() {
	callServer("next");
});
$("#volume").on("click touchend", function() {
	var vol = document.getElementById("volume").value;
	callServer("volume/" + vol);
});

function callServer(cmd) {
  console.log(SERVER_IP + ":" + PORT + "/" + cmd);
  $.post(
    "http://" + SERVER_IP + ":" + PORT + "/" + cmd
  );
}
