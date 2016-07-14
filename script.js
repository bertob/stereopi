var SERVER_IP = "172.24.1.1";
var PORT = 1337;

$("#reset").on("touchend", function() {
	callServer("reset");
});
$("#pause").on("touchend", function() {
	callServer("pause");
});
$("#next").on("touchend", function() {
	callServer("next");
});
var sendVolume = true;
$("#volume").on("touchmove", function() {
	if (sendVolume) {
		var vol = parseInt(document.getElementById("volume").value);
		callServer("volume/" + vol);
		sendVolume = false;
		setTimeout(function() {
			sendVolume = true;
		}, 300);
	}
});

function callServer(cmd) {
	$("body").css("background-color", "#" + parseInt(Math.random()*899999 + 100000));
	console.log(SERVER_IP + ":" + PORT + "/" + cmd);
	$.post(
		"http://" + SERVER_IP + ":" + PORT + "/" + cmd
	);
}
