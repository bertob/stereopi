#!/bin/bash

echo "$1" >> /home/pi/wifi-controls.log

if nmap -sP -sn 172.24.1.0/24 | grep -q --line-buffered $1
then
  echo "Phone present :D"
  echo "UNPAUSING" >> /home/pi/wifi-controls.log
  curl -X POST http://localhost:1337/play
else
  echo "Phone absent :("
fi

sleep 1
./check_phone.sh $1
