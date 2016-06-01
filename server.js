var http = require('http');
var url = require('url') ;
var sys = require('util');
var exec = require('child_process').exec;

var MUSIC_PATH = "/media/pi/A/music/*/*.mp3";
var SERVER_IP = "172.24.1.1";
var SERVER_PORT = "1337";

function puts(error, stdout, stderr) {
  sys.puts(stdout);
}

http.createServer(function(request, response) {
  var cmd = request.url.split("/")[1];
  console.log(cmd);
  if (cmd === "stop") {
    stopMusic();
  }
  else if (cmd === "start") {
    startMusic();
  }

  response.setHeader('Access-Control-Allow-Origin', SERVER_IP + ':' + SERVER_PORT);
  response.setHeader('Access-Control-Allow-Credentials', true);
  response.end();
}).listen(1337);

function startMusic() {
  console.log("starting!");
  exec('echo start >> /home/pi/music.log', puts);
  exec("killall mplayer", puts);
  exec("mplayer " + MUSIC_PATH + " -shuffle", puts);
}
function stopMusic() {
  console.log("stopping!");
  exec('echo stop >> /home/pi/music.log', puts);
  exec("killall mplayer", puts);
}
