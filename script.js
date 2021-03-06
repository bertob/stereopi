var SERVER_IP = "172.24.1.1";
var PORT = 1337;

var playing = true;

$("#reset").on("touchend", function() {
	$("#pause").removeClass("play");
	callServer("reset");
});
$("#pause").on("touchend", function() {
	if (playing) {
		callServer("pause");
		$(this).removeClass("play");
		playing = false;
	}
	else {
		callServer("play");
		$(this).addClass("play");
		playing = true;
	}
});
$("#next").on("touchend", function() {
	callServer("next");
});
$("#volume").on("input change", function() {
		var vol = Math.round((parseInt(document.getElementById("volume").value) * 0.6) + 40);
		callServer("volume/" + vol);
});

function callServer(cmd) {
	// $("body").css("background-color", "#" + parseInt(Math.random()*899999 + 100000));
	console.log(SERVER_IP + ":" + PORT + "/" + cmd);
	$.post(
		"http://" + SERVER_IP + ":" + PORT + "/" + cmd
	);
}
