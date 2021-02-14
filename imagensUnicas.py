from PIL import Image 
import numpy
import os, os.path
import csv

dirA = 'E:/MESTRADO/MESTRADO 2021/comGIFs/gifs/americanas/'
arqA = 'gifA_('

dirC = 'E:/MESTRADO/MESTRADO 2021/comGIFs/gifs/coca-cola/'
arqC = 'gifC_('

dirS = 'E:/MESTRADO/MESTRADO 2021/comGIFs/gifs/salon_line/'
arqS = 'gifS_('

extG = ').gif'

def codificarImagem(dir, arq, ext):
    l = os.listdir(dir)
    lista = list()
    for i in range(1, len(l) + 1):
        nome = dir + arq + str(i) + ext
        nA = numpy.asarray(Image.open(nome)).tobytes()
        lista.append(nA)
    return lista


gifsA = codificarImagem(dirA, arqA, extG)
a = set(gifsA)

gifsC = codificarImagem(dirC, arqC, extG)
c = set(gifsC)

gifsS = codificarImagem(dirS, arqS, extG)
s = set(gifsS)

dados = [{'perfil': 'americanas', 'total_gifs': len(gifsA), 'gifs_unicos': len(a), 'variabilidade': round(len(a)/len(gifsA)*100,1)},
{'perfil': 'Coca-Cola Br', 'total_gifs': len(gifsC), 'gifs_unicos': len(c), 'variabilidade': round(len(c)/len(gifsC)*100,1)},
{'perfil': 'Salon Line', 'total_gifs': len(gifsS), 'gifs_unicos': len(s), 'variabilidade': round(len(s)/len(gifsS)*100,1)}
]

colunas = ['perfil', 'total_gifs', 'gifs_unicos', 'variabilidade']

try:
    with open('E:/MESTRADO/MESTRADO 2021/comGIFs/csvs/gifs_unicos.csv', 'w') as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=colunas)
        writer.writeheader()
        for data in dados:
            writer.writerow(data)
except IOError:
    print("I/O error")

print('Processo finalizado.')