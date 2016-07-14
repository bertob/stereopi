#!/bin/bash

export NMAP_PRIVILEGED=""
nohup amixer set PCM 80% > /dev/null 2>&1 &

cd ~/stereopi
PHONE_ID=$(<phone.conf)

# static server for client web UI
nohup python3 -m http.server > /dev/null 2>&1 &

# API server for music controls
// Start music on boot
mkfifo /tmp/mplayer-control
sleep 3
nohup node server.js > /dev/null 2>&1 &

# script periodically checking for phone
# nohup ./check_phone.sh $PHONE_ID ON > /dev/null 2>&1 &
