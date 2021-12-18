#!/usr/bin/python3
# -*- coding: euc-kr -*-

import datetime
import requests
from bs4 import BeautifulSoup
from os.path import getsize
from urllib import parse

class TsUrlScrapper(object):

    global m_CS_Url
    global m_SS_Url

    def __init__(self,_CS_Url,_SS_Url):
        self.m_CS_Url=_CS_Url
        self.m_SS_Url=_SS_Url

    def findStockCode(self, _tag):
        tag = str(_tag)
        # print("TAG:%s" % (tag))
        str_s_pointer = tag.find("code") + 5
        str_e_pointer = str_s_pointer + 6
        # print(tag[str_s_pointer:str_e_pointer])
        return tag[str_s_pointer:str_e_pointer]


    def stockNameBaseCrawling(self,_type, _keyWord):
        encode_Keyword_Parse = parse.quote(_keyWord, encoding='EUC-KR')
        tag = self.getHtml(self.m_SS_Url, encode_Keyword_Parse)
        if tag == False:
            return "None",_keyWord,"None"
        soup = BeautifulSoup(tag, 'html.parser')
        stockCode = ""
        # print(soup)
        response = ""
        try:
            response = soup.select_one('#content > div.section_search').find('td').find('a')
            stockCode = self.findStockCode(response)
            _title, _keyWord, _current_price=self.stockCodeBaseCrawling(_type,stockCode)
            # print(soup.find_all(attrs={'class':'tit'})) #TODO.K 검색리스트 가져옴, 현재 선택적 코드 검색이 불가능함으로 보류
            # return title
        except:
            return "None",_keyWord,"None"
        return _title, _keyWord, _current_price

    def stockCodeBaseCrawling(self,_type,_keyWord):
        #print(self.m_CS_Url)
        tag = self.getHtml(self.m_CS_Url, _keyWord)
        if tag == False:
            return "None",_keyWord,"None"
        soup = BeautifulSoup(tag, 'html.parser')
        # print(soup)
        try:
            # title = soup.find('meta', property="og:title")
            # print(kakao_opentalk_title["content"])
            # hashtag = soup.find('meta', property="og:description")
            # TODO.K html code path conf로 빼기
            title = soup.select_one('#middle > div.h_company > div.wrap_company > h2 > a')
            current_price = soup.select_one('#chart_area > div.rate_info > div > p.no_today > em').find('span')
            # 시총=soup.select_one('#_market_sum')
        except:
            return "None", _keyWord, "None"

        return self.resultJsonParse(title.get_text(), _keyWord, current_price.get_text().replace(",", ""),_type)

    # TODO.K Json Module 추가예정
    def resultJsonParse(self,_title,_keyWord,_current_price,_type):
        #추가내용 처리 필요시 사용
            return _title, _keyWord, _current_price

    def getHtml(self, _url, _keyWord):
        html = ""
        resp = requests.get(_url + _keyWord)
        if resp.status_code == 200:
            html = resp.text
        elif resp.status_code == 400:
            return False
        # print(html)
        return html
