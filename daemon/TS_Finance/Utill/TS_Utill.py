#!/usr/bin/python3
# -*- coding: euc-kr -*-

import sys
import os

def get_platform():
    platforms = {
        'linux' : 'Linux',
        'linux1': 'Linux',
        'linux2': 'Linux',
        'darwin': 'OS X',  # not support
        'win32': 'Windows'
    }
    if sys.platform not in platforms:
        return sys.platform

    return platforms[sys.platform]

def getcwd():
    return os.getcwd()

