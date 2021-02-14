const funcoesTratamento = require('./funcoesTratamento.js')
const ObjectsToCsv = require('objects-to-csv')

dirA = './tweets_json/americanas/'
arqA = 'tweetsAmericanas_jul_'
arrayA = funcoesTratamento.importarTweetsJson(dirA, arqA)

dirS = './tweets_json/salon_line/'
arqS = 'tweetsSalon_jul_'
arrayS = funcoesTratamento.importarTweetsJson(dirS, arqS)

dirC = './tweets_json/coca-cola/'
arqC = 'tweetsCoca_jul_'
arrayC = funcoesTratamento.importarTweetsJson(dirC, arqC)

arrayGeral = [...arrayA, ...arrayC, ...arrayS]

dadosGerais = funcoesTratamento.dadosTweets(arrayGeral)

new ObjectsToCsv(dadosGerais).toDisk('./csvs/dadosGerais.csv');

gifsGerais = funcoesTratamento.filtrarGifs(arrayGeral)

dadosGifs = funcoesTratamento.dadosTweets(gifsGerais)

new ObjectsToCsv(dadosGifs).toDisk('./csvs/dadosGifsGerais.csv');

console.log('Processo finalizado.')




