var flkty;
var SERVER_IP = "172.24.1.1";
var PORT = 1337;

window.onload = function() {
  // callServer("stop"); // stop music when the application is opened
	flkty = new Flickity(".carousel", {
		initialIndex: 0
	});
  flkty.on( 'cellSelect', function() {
    console.log('Flickity select ' + flkty.selectedIndex);
    if (flkty.selectedIndex === 0) {
      callServer("stop");
    } else {
      callServer("start");
    }
  });
};


function callServer(cmd) {
  console.log(SERVER_IP + ":" + PORT + "/" + cmd);
  $.post(
    "http://" + SERVER_IP + ":" + PORT + "/" + cmd
  );
}
