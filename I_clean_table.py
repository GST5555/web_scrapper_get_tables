#This python executes the node web scrapper gets its response
#and clean it and re format it into a table

import sys
import subprocess
import pprint
from datetime import datetime
import json
import re

def cleanhtml(raw_html):
  cleanr = re.compile('<.*?>')
  cleantext = re.sub(cleanr, '', raw_html)
  return cleantext

output = subprocess.check_output([
    '/usr/bin/node',
    'I_get_table.js',
    "https://en.wikipedia.org/wiki/List_of_urban_areas_in_the_United_Kingdom",
])

# capture all the logged lines from the node process
result = output

result_ = result.decode('utf-8')
resultado_parseado = result_.replace('\'', '').replace(' ] ]\n', ',\n').split(',\n')
lista_de_tabla = []
for index in resultado_parseado:
    cleantext = cleanhtml(index)
    cleantext = cleantext.lstrip().replace("\\n","").strip("[]\\t").lstrip().strip("]\n").strip("[ ").rstrip().replace("\\n","")
    lista_de_tabla.append(cleantext)

tamanodesublista = 8
lista_de_tabla = [lista_de_tabla[x:x+tamanodesublista] for x in range(0, len(lista_de_tabla), tamanodesublista)]
print(lista_de_tabla)


