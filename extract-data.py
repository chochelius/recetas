# import os and openpyxl modules
import pandas as pd
import numpy as np
import os
import glob

# set the path to the folder containing the excel files to current working directory glob
path = os.getcwd()

# create a list of all the excel files in the folder
files = glob.glob(path + "/*.xlsx")

# filter files
filtered_files = [file for file in files if "stock diario" in file.lower() and not file.startswith('~')]

# group files by name
array = [["t1"], ["t2"], ["t3"], ["t4"], ["t5"], ["t6"], ["t7"], ["T1"], ["T2"], ["T3"], ["T4"], ["T5"], ["T6"], ["T7"], ["TECLADOS 1"], ["TECLADOS 2"], ["TECLADOS 3"], ["TECLADOS 4"], ["TECLADOS 5"], ["TECLADOS 6"], ["TECLADOS 7"]]
for file in filtered_files:
    for i in range(len(array)):
        if array[i][0] in file:
            array[i].append(file)
            print(array[i])
