#!/bin/bash

export NMAP_PRIVILEGED=""
nohup amixer set PCM 50% > /dev/null 2>&1 &

cd ~/stereopi
PHONE_ID=$(<phone.conf)

# API server for music controls
nohup node server.js > /dev/null 2>&1 &

# static server for client web UI
nohup python3 -m http.server > /dev/null 2>&1 &

# script periodically checking for phone
nohup ./check_phone.sh $PHONE_ID ON > /dev/null 2>&1 &
