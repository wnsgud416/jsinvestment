#!/bin/sh

#사전 설치
# pip3 install python-telegram-bot --upgrade
# telegram - BotFather

#yum install gcc openssl-devel bzip2-devel libffi-devel
#wget https://www.python.org/ftp/python/3.8.1/Python-3.8.1.tgz
#> cd Python-3.8.1
#> ./configure --enable-optimizations
#> make altinstall

DAEMON_NAME="Telegram_Main.py"
PYTHON="/usr/bin/python3"
MESSAGE=$@

$PYTHON $DAEMON_NAME $MESSAGE
