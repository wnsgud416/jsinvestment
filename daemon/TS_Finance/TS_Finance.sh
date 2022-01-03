#!/bin/sh

#사전 설치필요
#yum install epel-release
#yum isntall python3~
#pip3 install requests
#pip3 install BeautifulSoup4

#set env
export PYTHONPATH=$PYTHONPATH:/usr/local/TS_TEST/Proc:/usr/local/TS_TEST/Utill

DAEMON_PATH=/usr/local/TS_TEST/
DAEMON_NAME=TS_Main
INI_FILE=/usr/local/TS_TEST/Conf/TS_JsInvest.ini

ACTION_TYPE=$1
PARAM=$2
## 프로세스 체크
IFS=$'\n'
for l in `ps -ef|grep $DAEMON_NAME|grep -v tail|grep -v grep`; do
    #echo "Search="$l|awk '{print $3}'
    if [ `echo $l|awk '{print $3}'` -eq 1 ]; then
        PID=`echo $l|awk '{print $2}'`
        #echo "=>"$l|awk '{print $3}'
    fi
done

$DAEMON_PATH$DAEMON_NAME $INI_FILE $ACTION_TYPE $PARAM