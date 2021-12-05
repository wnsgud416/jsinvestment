
import datetime
import requests
from bs4 import BeautifulSoup
from os.path import getsize
import configparser
import Utill.TS_Utill
import sys
from urllib import parse

class TS_Stock_Infio():
    global StockCode        #주식 코드명
    global StockName_KR     #주식 명
    global CurrentPrice     #현재가
    global TradingVloume    #거래량량

class TS_Naver_Finance_Crawling():
    # global
    global os_Type
    global currentPath
    global m_CS_Url
    global m_SS_Url
    global m_stock_code
    TS_Utill = Utill.TS_Utill

    #init
    def __init__(self,_Argv):
        print("Func#%s" % (sys._getframe(0).f_code.co_name))
        #os check
        self.os_Type=self.TS_Utill.get_platform()
        self.currentPath=self.TS_Utill.getcwd()

        #loadconfig
        self.loadConfig()

        #argv parse~~
        self.m_stock_code=_Argv[1]
        pass

    #funciton
    def loadConfig(self):
        print("Func#%s" %(sys._getframe(0).f_code.co_name))
        ts_Config = configparser.ConfigParser()
        ts_Conf_Path=""
        if self.os_Type == "Windows":
            #print(self.os_Type)
            ts_Conf_Path = self.currentPath+".\\Conf\\TS_JsInvest.ini"
        elif self.os_Type == "Linux":
            #print(self.os_Type)
            ts_Conf_Path = self.currentPath + "./Conf/TS_JsInvest.ini"
        else :
            print("not support")
            exit(0)
        ts_Config.read(ts_Conf_Path, encoding='utf-8')
        ts_Config.sections()
        self.m_CS_Url=ts_Config['FINANCE']['CODE_SEARCH_URL']
        self.m_SS_Url=ts_Config['FINANCE']['STRING_SEARCH_URL']
        print("code_url=%s\nstring_url=%s" %(self.m_CS_Url,self.m_SS_Url))

    def start(self):
        if self.m_stock_code.isalpha():
            self.stockNameBaseCrawling(self.m_SS_Url,self.m_stock_code)
        else :
            self.stockCodeBaseCrawling(self.m_CS_Url,self.m_stock_code)

    def findStockCode(self,_tag):
        tag=str(_tag)
        #print("TAG:%s" % (tag))
        str_s_pointer=tag.find("code")+5
        str_e_pointer=str_s_pointer+6
        #print(tag[str_s_pointer:str_e_pointer])
        return tag[str_s_pointer:str_e_pointer]

    def stockNameBaseCrawling(self, _url, _keyWord):
        encode_Keyword_Parse = parse.quote(_keyWord, encoding='EUC-KR')
        tag = self.getHtml(_url, encode_Keyword_Parse)
        soup = BeautifulSoup(tag, 'html.parser')
        stockCode=""
        #print(soup)
        response=""
        try:
            response = soup.select_one('#content > div.section_search').find('td').find('a')
            stockCode = self.findStockCode(response)
            self.stockCodeBaseCrawling(self.m_CS_Url,stockCode)
            #print(soup.find_all(attrs={'class':'tit'})) #TODO.K 검색리스트 가져옴, 현재 선택적 코드 검색이 불가능함으로 보류
            #return title
        except:
            return "None", "None"

    def stockCodeBaseCrawling(self,_url,_keyWord):
        #print(_url)
        tag = self.getHtml(_url, _keyWord)
        soup = BeautifulSoup(tag, 'html.parser')
        # print(soup)
        try:
            #title = soup.find('meta', property="og:title")
            # print(kakao_opentalk_title["content"])
            #hashtag = soup.find('meta', property="og:description")
            title=soup.select_one('#middle > div.h_company > div.wrap_company > h2 > a')
            currnet_volume=soup.select_one('#chart_area > div.rate_info > div > p.no_today > em').find('span')
           # 시총=soup.select_one('#_market_sum')
            print("주식명,주식코드,현재가")
            print("%s,%s,%s"%(title.get_text(),_keyWord,currnet_volume.get_text().replace(",","")))
            return title
        except:
            return "None", "None"

    def getHtml(self,_url,_keyWord):
        html = ""
        resp = requests.get(_url+_keyWord)
        if resp.status_code == 200:
            html = resp.text
        #print(html)
        return html

    def getUriInfo(self,_url,_keyWord):
        print(_url)
        tag = self.getHtml(_url,_keyWord)
        soup = BeautifulSoup(tag, 'html.parser')
        # print(soup)
        try:
            title = soup.find('meta', property="og:title")
            # print(kakao_opentalk_title["content"])
            hashtag = soup.find('meta', property="og:description")
            print("################################")
            print(title["content"]+ hashtag["content"])
            return title["content"], hashtag["content"]
        except:
            return "None", "None"

