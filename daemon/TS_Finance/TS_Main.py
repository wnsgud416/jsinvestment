import Proc.TS_NaverFinance_Crawling_Module
import sys

def Useage() :
    print("#############################")
    print("param 1 is stock name or code")
    print("/[module] [param]")
    print("#############################")

#param [1]주식명/코드명
Argv=sys.argv

if len(Argv) < 1:
    Useage()
    exit(0)
else :
    if Argv[1] == "-help":
        Useage()
        exit(0)
    print("System Arguments%s"%(Argv))

TS_Finance_Module = Proc.TS_NaverFinance_Crawling_Module.TS_Naver_Finance_Crawling(Argv)
TS_Finance_Module.start()
#print("END")
#TS_Finance_Module.get_opentalk_info("https://open.kakao.com/o/","gMAPF1Vc")