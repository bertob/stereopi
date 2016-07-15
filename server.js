var http = require('http');
var url = require('url') ;
var sys = require('util');
var exec = require('child_process').exec;

var CONTROL_PATH = "/tmp/mplayer-control";
var MUSIC_PATH = "/media/pi/*/*.mp3 /media/pi/*/*/*.mp3 /media/pi/*/*/*/*.mp3";
// var MUSIC_PATH = "/home/tobi/Muziko/*/*/*.mp3";
var SERVER_IP = "172.24.1.1";
// var SERVER_IP = "172.24.1.121";
var SERVER_PORT = "1337";

// Start music on boot
// exec("mkfifo /tmp/mplayer-control", puts);
resetPlayer();

function resetPlayer() {
  console.log("reset");
  exec('killall mplayer', puts);
  exec("mplayer -slave -input file=" + CONTROL_PATH + " " + MUSIC_PATH + " -shuffle", puts);
  setTimeout(function() {
    resetPlayer();
  }, 8 * 60 * 1000);
}

http.createServer(function(request, response) {
  var cmd = request.url.split("/")[1];
  var param = request.url.split("/")[2];
  console.log(cmd);
  if (cmd === "reset") {
    resetPlayer();
  }
  if (cmd === "play") {
    exec('echo "set_property pause 0" > ' + CONTROL_PATH, puts);
  }
  if (cmd === "pause") {
    exec('echo "pausing_keep_force pause" > ' + CONTROL_PATH, puts);
  }
  else if (cmd === "next") {
    exec('echo "pt_step 1" > ' + CONTROL_PATH, puts);
  }
  else if (cmd === "volume") {
    var vol = parseFloat(param);
    exec("amixer set PCM " + vol + "%", puts);
  }

  response.setHeader('Access-Control-Allow-Origin', SERVER_IP + ':' + SERVER_PORT);
  response.setHeader('Access-Control-Allow-Credentials', true);
  response.end();
}).listen(1337);

function puts(error, stdout, stderr) {
  sys.puts(stdout);
}
