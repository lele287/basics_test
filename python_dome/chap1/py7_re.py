import re

# pat = re.compile('AA')              #用于校验其他字符
# data = pat.search("CBAA")          #被校验的字符
data = re.sub('a','A','agagwsrAFsefdag')                     #替换字符串
# print(re.findall("[A-Z]+","ASdsfFEDSF"))
print(data)