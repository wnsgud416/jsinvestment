#!/usr/bin/python3
# -*- coding: euc-kr -*-

import telegram
import configparser
import sys
import os

class TelegramBot(object):
    global m_BotTocken
    global m_ChatId
    global m_WebUrl

    def __init__(self):
        self.os_Type = self.get_platform()
        self.currentPath = self.getcwd()
        pass

    def getcwd(self):
        return os.getcwd()

    def get_platform(self):
        platforms = {
            'linux': 'Linux',
            'linux1': 'Linux',
            'linux2': 'Linux',
            'darwin': 'OS X',  # not support
            'win32': 'Windows'
        }
        if sys.platform not in platforms:
            return sys.platform
        return platforms[sys.platform]

    def loadConfig(self):
        ts_Config = configparser.ConfigParser()
        ts_Conf_Path = ""
        if str(self.os_Type) == "Windows":
            ts_Conf_Path = self.currentPath + ".\\Conf\\Telegram.ini"
        elif str(self.os_Type) == "Linux":
            # ts_Conf_Path = self.currentPath + "/Conf/TS_JsInvest.ini"
            ts_Conf_Path = "./Conf/Telegram.ini"
        else:
            print("not support")
            exit(0)
        # print("#####" + ts_Conf_Path)
        ts_Config.read(ts_Conf_Path, encoding='utf-8')
        ts_Config.sections()
        self.m_BotTocken = ts_Config["TELEGRAM"]["BOT_TOCKEN"]
        self.m_ChatId = ts_Config["TELEGRAM"]["CHAT_ID"]
        self.m_WebUrl =ts_Config["TELEGRAM"]["WEB_URL"]
        #print("##Tocken:"+self.m_BotTocken)
        #print("##Chat ID:"+self.m_ChatId )

    def SendMessage(self,_strMessage):
        chat_token = "HTTP API"
        Message=_strMessage + "\n" + self.m_WebUrl
        bot = telegram.Bot(token=str(self.m_BotTocken))
        bot.sendMessage(chat_id=self.m_ChatId, text=Message)

# pip install python-telegram-bot --upgrade
# telegram - BotFather

#yum install gcc openssl-devel bzip2-devel libffi-devel
#wget https://www.python.org/ftp/python/3.8.1/Python-3.8.1.tgz
#> cd Python-3.8.1
#> ./configure --enable-optimizations
#> make altinstall