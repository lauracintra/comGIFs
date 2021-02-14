const fs = require('fs')
const funcoesTratamento = {
    importarTweetsJson: (dir, arq) => {
        var arrayFinal = []
        var n = fs.readdirSync(dir).length
        for (var i = 1; i <= n; i++) {
            dirArq = dir + arq + i + '.json'
            req = require(dirArq)
            for (var e = 0; e < req.results.length; e++){
                arrayFinal.push(req.results[e])
            }
        }
        return arrayFinal    
    },
    dadosTweets: (array) => {
        arrayFinal = []
        for (let i = 0; i < array.length; i++){
            obj = {}
            obj.perfil = array[i].user.name
            obj.data = array[i].created_at
            if (array[i].hasOwnProperty('extended_tweet') === true) {
                obj.texto = array[i].extended_tweet.full_text
            }
            else {
                obj.texto = array[i].text
            }
            if (array[i].in_reply_to_status_id === null) {
                obj.reply_ou_original = 'original'
            }
            else {
                obj.reply_ou_original = 'reply'
            }
            obj.tem_midia = 'não'
            obj.tipo_midia = 'nenhum'
            if (array[i].hasOwnProperty('extended_tweet') === true) {
                if(array[i].extended_tweet.hasOwnProperty('entities') === true) {
                    if(array[i].extended_tweet.entities.hasOwnProperty('media') === true) {
                        obj.tem_midia = 'sim'
                        obj.tipo_midia = array[i].extended_tweet.entities.media[0].type
                    }
                }
            }
            if (array[i].hasOwnProperty('extended_entities') === true) {
                if (array[i].extended_entities.hasOwnProperty('media')) {
                    obj.tem_midia = 'sim'
                    obj.tipo_midia = array[i].extended_entities.media[0].type
                }
            }
            obj.quotes = array[i].quote_count
            obj.replies = array[i].reply_count
            obj.retweets = array[i].retweet_count 
            obj.likes = array[i].favorite_count 
            obj.media_interacoes = (array[i].quote_count + array[i].reply_count + array[i].retweet_count + array[i].favorite_count) / 4
            obj.link = 'https://www.twitter.com/'+ array[i].user.screen_name + '/status/' + array[i].id_str
            arrayFinal.push(obj)
        }
        return arrayFinal
    },
    filtrarTweetsOriginais: (array) => {
        arrayFinal = []
        for (var i = 0; i < array.length; i++) {
            if (array[i].in_reply_to_status_id === null) {
                arrayFinal.push(array[i])
            }
        }
        return arrayFinal
    },    
    filtrarTweetsReplies: (array) => {
        arrayFinal = []
        for (var i = 0; i < array.length; i++) {
            if (array[i].in_reply_to_status_id !== null) {
                arrayFinal.push(array[i])
            }
        }
        return arrayFinal
    },
    filtrarMedia: (array) => {
        arrayFinal = []
        for (var i = 0 ; i < array.length; i++) {
            if (array[i].hasOwnProperty('extended_tweet') === true) {
                if (array[i].extended_tweet.hasOwnProperty('entities') === true) {
                    if (array[i].extended_tweet.entities.hasOwnProperty('media') === true){
                        arrayFinal.push(array[i])
                    }
                }
            }
            if (array[i].hasOwnProperty('extended_entities') === true) {
                if (array[i].extended_entities.hasOwnProperty('media') === true) {
                    arrayFinal.push(array[i])
                }
            }
        }
        return arrayFinal
    },
    filtrarGifs: (array) => {
        arrayFinal = []
        for (var i = 0; i < array.length; i++) {
            if (array[i].hasOwnProperty('extended_tweet') === true) {
                if (array[i].extended_tweet.hasOwnProperty('entities') === true) {
                    if (array[i].extended_tweet.entities.hasOwnProperty('media') === true) {
                        if (array[i].extended_tweet.entities.media[0].type === 'animated_gif') {
                            arrayFinal.push(array[i]) 
                        }
                    }
                }        
            }
            if (array[i].hasOwnProperty('extended_entities') === true) {
                if (array[i].extended_entities.hasOwnProperty('media') === true) {
                    if (array[i].extended_entities.media[0].type === 'animated_gif') {
                        arrayFinal.push(array[i])                    
                    }
                }
            }
        }
        return arrayFinal
    },
    filtrarFotos: (array) => {
        arrayFinal = []
        for (var i = 0; i < array.length; i++) {
            if (array[i].hasOwnProperty('extended_tweet') === true) {
                if (array[i].extended_tweet.hasOwnProperty('entities') === true) {
                    if (array[i].extended_tweet.entities.hasOwnProperty('media') === true) {
                        if (array[i].extended_tweet.entities.media[0].type === 'photo') {
                            arrayFinal.push(array[i])
                        }
                    }
                }        
            }
            if (array[i].hasOwnProperty('extended_entities') === true) {
                if (array[i].extended_entities.hasOwnProperty('media') === true) {
                    if (array[i].extended_entities.media[0].type === 'photo') {
                        arrayFinal.push(array[i])                   
                    }
                }
            }
        }
        return arrayFinal
    },
    filtrarVideos: (array) => {
        arrayFinal = []
        for (var i = 0; i < array.length; i++) {
            if (array[i].hasOwnProperty('extended_tweet') === true) {
                if (array[i].extended_tweet.hasOwnProperty('entities') === true) {
                    if (array[i].extended_tweet.entities.hasOwnProperty('media') === true) {
                        if (array[i].extended_tweet.entities.media[0].type === 'video') {
                            arrayFinal.push(array[i])  
                        }
                    }
                }        
            }
            if (array[i].hasOwnProperty('extended_entities') === true) {
                if (array[i].extended_entities.hasOwnProperty('media') === true) {
                    if (array[i].extended_entities.media[0].type === 'video') {
                        arrayFinal.push(array[i])                     
                    }
                }
            }
        }
        return arrayFinal
    }
}

module.exports = funcoesTratamento
