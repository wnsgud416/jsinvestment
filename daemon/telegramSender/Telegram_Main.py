#!/usr/bin/python3
# -*- coding: euc-kr -*-

import Telegram_Sender
import sys

Argv=sys.argv

#print(Argv)
#print(len(Argv))
Message=""

#TODO.K config path param parsing �߰��ϱ�
for i in range(1, len(Argv)):
    Message=Message+Argv[i]+" "

#print(Message)

TelegramBot = Telegram_Sender.TelegramBot()
TelegramBot.loadConfig()
TelegramBot.SendMessage(Message)
print("End\n")


