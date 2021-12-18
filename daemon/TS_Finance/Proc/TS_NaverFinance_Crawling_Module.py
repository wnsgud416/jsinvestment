#!/usr/bin/python3
# -*- coding: euc-kr -*-

import datetime

import configparser
import json
import string

from Utill import TS_Utill
from Utill import TS_Scraper
import sys



#TODO.K 필요한 인자가 많다면 클래스형태 구조체로
class TS_Stock_Info():
    global StockCode        #주식 코드명
    global StockName_KR     #주식 명
    global CurrentPrice     #현재가
    global TradingVloume    #거래량

    def __init__(self):
        self.StockCode=""
        self.StockName_KR=""
        self.CurrentPrice=""
        self.TradingVloume=""

#######################################################
# class TS_Naver_Finance_Crawling()
# Naver finance scraping(crawling) class, Not used Selenium(extends)
#######################################################
class TS_Naver_Finance_Crawling():
    # global,
    global os_Type
    global currentPath
    global m_CS_Url
    global m_SS_Url
    global m_stock_code
    global TS_Crawl
    TS_Utill = TS_Utill

    #init
    def __init__(self,_stockCode):
        #print("Func#%s" % (sys._getframe(0).f_code.co_name))
        #os check
        self.os_Type=self.TS_Utill.get_platform()
        self.currentPath=self.TS_Utill.getcwd()

        #loadconfig
        self.loadConfig()

        #argv parse~~
        self.m_stock_code=_stockCode
        #pass

    #funciton
    def loadConfig(self):
        # TODO.K loadConfig는 모듈 확장시 main process 쪽으로 이동, 현재는 하나뿐이니 그대로쓰자...
        # TODO.K logger 처리해야되는데 추가하면 데몬 관리 포인트 늘어남 & 서버 스토리지 사용률 증가

        #print("Func#%s" %(sys._getframe(0).f_code.co_name))
        ts_Config = configparser.ConfigParser()
        ts_Conf_Path=""
        if str(self.os_Type) == "Windows":
            #print(self.os_Type)
            ts_Conf_Path = self.currentPath+".\\Conf\\TS_JsInvest.ini"
        elif str(self.os_Type) == "Linux":
            #print("##@#"+self.os_Type)
            ts_Conf_Path = self.currentPath + "/Conf/TS_JsInvest.ini"
        else:
            print("not support")
            exit(0)
        #print("#####" + ts_Conf_Path)
        ts_Config.read(ts_Conf_Path, encoding='utf-8')
        ts_Config.sections()
        self.m_CS_Url=ts_Config["FINANCE"]["CODE_SEARCH_URL"]
        self.m_SS_Url=ts_Config["FINANCE"]["STRING_SEARCH_URL"]

        #print("code_url=%s\nstring_url=%s" %(self.m_CS_Url,self.m_SS_Url))

    def start(self):
        resultList = []
        self.TS_Crawl = TS_Scraper.TsUrlScrapper(self.m_CS_Url,self.m_SS_Url)
        if self.m_stock_code.isalpha():
            _title, _keyWord, _current_price=self.TS_Crawl.stockNameBaseCrawling('s',self.m_stock_code)
        else :
            _title, _keyWord, _current_price=self.TS_Crawl.stockCodeBaseCrawling('s',self.m_stock_code)

        resultList.append({"stockName": _title, "stockCode": _keyWord, "currentPrice": _current_price})
        print("#TS_Finance Result#")
        print(json.dumps(resultList, ensure_ascii=False))  # ident=4
        print("#TS_Finance Result-END#")


