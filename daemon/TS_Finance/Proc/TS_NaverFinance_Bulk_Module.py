#!/usr/bin/python3
# -*- coding: euc-kr -*-

import json
import multiprocessing
import string
import sys
import configparser

from Utill import TS_Utill
from Utill import TS_Scraper

class TS_NaverFinance_Bulk():
    global m_CS_Url
    global m_SS_Url
    global TS_Crawl
    global m_CodeList

    TS_Utill=TS_Utill

    def __init__(self,_Argv):
        #print("Func#%s" % (sys._getframe(0).f_code.co_name))
        # os check
        self.os_Type = self.TS_Utill.get_platform()
        self.currentPath = self.TS_Utill.getcwd()

        # loadconfig
        self.loadConfig()
        #self.m_CodeList=[x.strip() for x in my_string.split(',')]_Argv
        #print(self.m_CodeList)
        self.codeListParsing(_Argv[2])
        #pass

    def loadConfig(self):
        #print("Func#%s" %(sys._getframe(0).f_code.co_name))
        ts_Config = configparser.ConfigParser()
        ts_Conf_Path=""
        if str(self.os_Type) == "Windows":
            ts_Conf_Path = self.currentPath+".\\Conf\\TS_JsInvest.ini"
        elif str(self.os_Type) == "Linux":
            ts_Conf_Path = "/usr/local/TS_TEST/Conf/TS_JsInvest.ini"
        else:
            print("not support")
            exit(0)
        #print("#####" + ts_Conf_Path)
        ts_Config.read(ts_Conf_Path, encoding='utf-8')
        ts_Config.sections()
        self.m_CS_Url=ts_Config["FINANCE"]["CODE_SEARCH_URL"]
        self.m_SS_Url=ts_Config["FINANCE"]["STRING_SEARCH_URL"]

        #print("code_url=%s\nstring_url=%s" %(self.m_CS_Url,self.m_SS_Url))
    def codeListParsing(self,_CodeList):
        self.m_CodeList = [x.strip() for x in _CodeList.split(',')]

    def start(self):
    #1. argv parser, sep comma
        resultList=[]
        self.TS_Crawl = TS_Scraper.TsUrlScrapper(self.m_CS_Url,self.m_SS_Url)

        for keyWord in self.m_CodeList:
            #result=self.TS_Crawl.stockCodeBaseCrawling(self,keyWord)
            _title, _keyWord, _current_price = self.TS_Crawl.stockCodeBaseCrawling('m',keyWord)
            resultList.append({"stockName": _title, "stockCode": _keyWord, "currentPrice": _current_price})

        print(json.dumps(resultList, ensure_ascii=False))  # ident=4

        # for i in self.m_CodeList:
        #     print("##"+i)
    #2. loop, get current price

    #3. json result

        pass

