#!/usr/bin/python3
# -*- coding: euc-kr -*-

from Proc import TS_NaverFinance_Crawling_Module
from Proc import TS_NaverFinance_Bulk_Module
import sys

def Useage() :
    print("#############################")
    print("param 1 is stock name or code")
    print("/[module] [Action Type] [Param]")
    print("[Action Type]: S(Single Mode), M(Multi Mode)")
    print("[Param]: stock code or name (Single Mode)")
    print("[Param]: stock code, separate is comma ex)\"005930,950130,048410\" (Multi Mode)")
    print("#############################")

#param [0]Module [1]Action Type [2]주식명/코드명
Argv=sys.argv

if len(Argv) < 2:
    Useage()
    exit(0)
elif str(Argv[1]) =="-help" and len(Argv) == 2:
    Useage()
    exit(0)
else:
    #print("System Arguments%s"%(Argv))
    pass

#Main
if str(Argv[1]) == '-S' or str(Argv[1]) == '-s':
    TS_Finance_Module = TS_NaverFinance_Crawling_Module.TS_Naver_Finance_Crawling(Argv[2])
    TS_Finance_Module.start()
elif str(Argv[1]) == '-M' or str(Argv[1]) == '-m':
    TS_Finance_Module = TS_NaverFinance_Bulk_Module.TS_NaverFinance_Bulk(Argv)
    TS_Finance_Module.start()
    pass
else :
    print("Error, Not support")


#print("END")
#TS_Finance_Module.get_opentalk_info("https://open.kakao.com/o/","gMAPF1Vc")