#!/bin/sh

python3 setup.py build_ext --inplace

#! /bin/sh
# yum install python-pip
# pip3 install PyCrypto
# pip3 install cython
#! /bin/sh

TEST_PATH="Finance"

# 파이선 파일 설정
#PYTHON_PATH='test.py'
PYTHON_PATH='TS_Main.py'

if [ "$#" == "1" ] ; then
    PYTHON_PATH="$1"
fi

echo "# MAIN] Cut File Name"
PYTHON_TO_C_PATH=$PYTHON_PATH".c"
C_ELF_FILE=$(echo $PYTHON_PATH | rev | cut -d '.' -f2- | rev)
#C_ELF_FILE="test_1"

PYTHON_LIB_PATH="/usr/local/lib/"
PYTHONE_LIB="python3.6m"

PYTHON_HEADER_PATH="/usr/include/python3.6m/"
# /usr/local/include/python3.7m/
# "/root/ITNomads_OCRModule_v1.0/install/Python-3.7.4/Include/"
# "/usr/include/python2.7"
EXT_LIB="-lpthread -lm -lutil -ldl -export-dynamic"
USER_LIB_PATH="./"
#USER_LIB="-lArgParsor.cpython-37m-x86_64-linux-gnu.so "
COMPILER="gcc"

# 컴파일 
# cython --embed -o test.c test.py

echo "MAIN] cythone --embed -o $PYTHON_TO_C_PATH $PYTHON_PATH"
COMPILE_PYTHON_FILE=`cython --embed -o $PYTHON_TO_C_PATH $PYTHON_PATH`

if [ -e "$PYTHON_TO_C_PATH" ]; then
    #gcc -Os -I /usr/include/python2.7 -o test test.py.c -lpython2.7 -lpthread -lm -lutil -ldl
    #echo "gcc -Os -I /usr/local/include/python3.7m/ -o ArgParsor ArgParsor.c -L/usr/local/include/python3.7m/ -lpython3.7m -lpthread -lm -lutil -ldl"
    echo "$COMPILER -Os -I $PYTHON_HEADER_PATH -o $C_ELF_FILE $PYTHON_TO_C_PATH "-L"$PYTHON_LIB_PATH  "-l"$PYTHONE_LIB $EXT_LIB "-L"$USER_LIB_PATH"
    COMPILE_C_FILE=`$COMPILER -Os -I $PYTHON_HEADER_PATH -o $C_ELF_FILE $PYTHON_TO_C_PATH "-L"$PYTHON_LIB_PATH  "-l"$PYTHONE_LIB $EXT_LIB "-L"$USER_LIB_PATH `
    if [ -e "$C_ELF_FILE" ]; then
        echo "MAIN] C Complie Success("  $C_ELF_FILE") !!"
    else
        echo "MAIN] C Complie Fail("  $PYTHON_TO_C_PATH") !!"
    fi
else
    echo "MAIN] Python3.7 To C Fail ("  $PYTHON_PATH ") !!"
fi

# 복사
cp $C_ELF_FILE  $TEST_PATH

# 동작
echo ""
echo ""
cd $OCR_TEST_PATH
#echo "=======> Excute Test("$C_ELF_FILE ")"
#./$C_ELF_FILE ../test_img/idcard_01.jpg   "0" "120" "1" "ON" "300" "1.txt" "kor" "1" "1" "1" "./"
cd $CUR_DIR


