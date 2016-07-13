#!/bin/bash

PHONE_MAC=""

amixer set PCM 100%

cd ~/stereopi

# API server for music controls
nohup node server.js > /dev/null 2>&1 &

# static server for client web UI
nohup python3 -m http.server > /dev/null 2>&1 &

# script periodically checking for phone
nohup sudo ./check_phone.sh $PHONE_MAC ON > /dev/null 2>&1 &