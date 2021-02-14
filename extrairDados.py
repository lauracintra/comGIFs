import requests
import json

endpoint = "https://api.twitter.com/1.1/tweets/search/30day/devmidia.json" 

autorizacao = {
    "Authorization":"Bearer AAAAAAAAAAAAAAAAAAAAAM8%2BFAEAAAAAWp9yy538PJlFMYErzA%2FzJLBZkSE%3DEzxi1Xzafk0feHOxHPk1QlpTt13myXJOBvfIk6I661hwHYQYN5", 
    "Content-Type": "application/json"
}  

infos = '{"query":"from:302185818", "maxResults": 100}'

diretorio = 'E:/MESTRADO/MESTRADO 2021/comGIFs/tweets_json/'

tweetsMarcas_mes_2 = requests.post(endpoint,data=infos,headers=autorizacao).json()


with open((diretorio+'tweetsMarcas_mes_2.json'), 'w') as outfile:
    json.dump(tweetsMarcas_mes_2, outfile)

print('Processo finalizado.')