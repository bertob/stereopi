var flkty;
var SERVER_IP = "172.24.1.1";
var PORT = 1337;

window.onload = function() {
  // callServer("pause"); // stop music when the application is opened
};

$("#play").on("click touchstart", function() {
	callServer("pause");
});
$("#prev").on("click touchstart", function() {
	callServer("prev");
});
$("#next").on("click touchstart", function() {
	callServer("next");
});
$("#volume").on("click touchstart", function() {
	var vol = document.getElementById("volume").value;
	callServer("volume/" + vol);
	console.log("volume/" + vol);
});

function callServer(cmd) {
  console.log(SERVER_IP + ":" + PORT + "/" + cmd);
  $.post(
    "http://" + SERVER_IP + ":" + PORT + "/" + cmd
  );
}
