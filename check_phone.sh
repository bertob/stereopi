#!/bin/bash

status=$2
echo "$2 $1" >> /home/pi/wifi-controls.log

if nmap -sP -sn 172.24.1.0/24 | grep -q --line-buffered $1
then
  echo "Phone present :D"
  if [ "$status" = "OFF" ]
  then
    echo "UNPAUSING" >> /home/pi/wifi-controls.log
    curl -X POST http://localhost:1337/pause
    # amixer set PCM 100%
  fi
  status="ON"
else
  echo "Phone absent :("
  if [ "$status" = "ON" ]
  then
  	echo "PAUSING" >> /home/pi/wifi-controls.log
    curl -X POST http://localhost:1337/pause
  	# amixer set PCM 0%
  	#killall -9 mplayer
  fi
  status="OFF"
fi

sleep 1
./check_phone.sh $1 $status
