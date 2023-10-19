/**
 * 
 * @param {string} string String que terá o primeiro caractere convertido para maiúsculo
 * 
 * @return {string} Retorna uma nova string com o primeiro caractere maiúsculo
 * 
*/

const toUpperCaseFirst = (string) => {

    try {

        if(typeof string != 'string' || string == ''){

            throw new Error('Parameter type is not String or is empty')

        }

        return string.charAt(0).toUpperCase() + string.slice(1)

    } catch (Error) {

        console.log(Error.message)

    }
    
}

/**
 * 
 * @param {string} string String a ser convertida
 * @param {string} separator [opcional] Separador que vai ser usado para quebrar a string. O valor padrão será espaço em branco.
 * 
 * @return {string} String convertida para o formato camelCase
 * 
*/

const toCamelCase = function (string, separator = ' ') {

    try {

        if(Array.from(arguments).every((param) => {typeof param == 'string' && param != ''})){
    
            throw new Error('Parameters are invalid or empty')
    
        }
    
        return string.toLowerCase().replaceAll(/\s+/g, separator).split(separator).map((word, index) => {

            if(index > 0){

                word = toUpperCaseFirst(word)

            }
            
            return word

        }).join('')

    } catch (Error) {
    
        console.log(Error.message)
    
    }

}

/**
 * 
 * Converte uma string para um elemento HTML `ChildNode` ou `NodeList`, dependendo da estrutura.
 * 
 * @param {string} string String contendo uma estrutura HTML
 * @return {ChildNode | NodeList | Element} Retorna um `ChildNode` ou `NodeList`
 * 
*/

const toHTML = (string) => {

    try {
        
        const anyElement = document.createElement('div')
    
        anyElement.innerHTML = string.trim()
    
        if(!anyElement.querySelectorAll('*') || anyElement.querySelectorAll('*').length == 0){

            throw new Error('A string fornecida não contém elemento(s) HTML');

        }
    
        return anyElement.childElementCount == 1 ? anyElement.firstChild : anyElement.childNodes

    } catch (Error) {

        console.error(Error.message)

    }

}

/**
 * 
 * Formata uma url para uma estrutura adequada para se usar em um iframe
 * 
 * @param {string} url URL do arquivo/página/vídeo e etc, que vai ser formatado
 * @param {string} website Nome do site de origem da URL especificada, para que a mesma seja formatada de acordo com o padrão da plataforma informada.
 * 
 * @return {string} Retorna a URL especificada formatada. 
 * 
 * Antes: https://youtu.be/TV5faBBHfkw
 * 
 * Depois: https://www.youtube.com/embed/TV5faBBHfkw
 * 
*/

const toIframeSrc = (url, website) => {

    try {

        if(!url || !website){

            throw new Error('Forneça todos os parâmetros necessários')

        }

        const urls = {
            "youtube": `https://www.youtube.com/embed/:id`,
            "vimeo": `https://player.vimeo.com/video/:id?color=${SITE_THEME}`,
            "drive": `https://drive.google.com/file/d/:id/preview?usp=sharing&showinfo=0`,
            "direct": `${url}?showinfo=0`
        }

        const regexExpression = /(((http(s)?:\/\/)(www.|music.|m.)?(youtube.com|youtu.be)(\/){1}((watch(\/)?\?v=)|((v\/{1})|embed\/))?)|(((http(s)?:\/\/)((player.|www.)?vimeo.com)\/{1})(video\/)?)|((http(s)?:\/\/){1}(drive.google.com){1}(\/file\/d\/|\/file\/u\/0\/d\/){1}))|([&](.*)|([?](.*))|((\/){1}(view|preview)[?]?(.*)))/g;

        if(!(website in urls)){
            
            throw new Error("Não temos uma formatação para o website fornecido")
            
        }

        const videoId = url.replace(regexExpression, '');
        const formattedUrl = urls[website].replaceAll(':id', videoId)

        return formattedUrl

    } catch(Error) {
        
        console.error(Error.message)

    }

}

/**
 * 
 * @param {object} object Objeto que deseja fazer a busca
 * @param {string} searchValue Valor a ser pesquisado no objeto
 * 
 * @return Retorna o indice da primeira ocorrencia no objeto
 * 
*/

const objIndexOf = (object, searchValue) => {

    for (let property in object) {

        if((property in object) && object[property] == searchValue){

            return property

        }

    }

}

/**
 * 
 * @param {array} array Array que será bagunçado
 * 
 * @return Retorna uma nova versão do array, porém, bagunçado
 * 
*/

const shuffle = (array) => {

    try {

        if(!Array.isArray(array)){

            throw new Error('O parâmetro fornecido não é um array')

        }
    
        return array.sort(() => {
    
            return Math.random() - 0.5
    
        })

    } catch(Error) {
        
        console.error(Error.message)

    }
    
}

/**
 * 
 * @param {Number} time Tempo em milisegundos
 * 
 * Faz com que o fluxo do escopo em que a função foi executada parar por um periodo e depois continuar
 * 
*/

const sleep = async (time) => {

    return new Promise((stop) => setTimeout(() => stop(), time))

}

const rand = (min, max) => {

    return Math.floor(Math.random() * (max - min + 1) + min)

}

/**
 * 
 * @callback handler
 * @param {function} stop
 * 
*/

/**
 * 
 * Aguarda a finalização de uma operação assíncrona definida por um callback.
 *
 * @param {handler} handler - Um callback assíncrono que representa a operação a ser aguardada.
 *                            Deve ser uma função que aceita um parâmetro `stop`.
 *                            Essa função deve chamar `stop()` para indicar a conclusão da operação.
 *                            A função `stop` não precisa ser explicitamente passada, já que é injetada internamente.
 * @returns {Promise} Uma Promise que aguarda até que a operação no callback seja concluída.
 * @throws {Error} Se o `handler` não for uma função.
 *
 * @example
 * async function performAsyncOperation() {
 * 
 *     await waitFor(async (stop) => {
 * 
 *         // Código assíncrono a ser executado enquanto se aguarda.
 *         // Chame 'stop()' no final para indicar a conclusão da operação.
 * 
 *     })
 * 
 *     // O código após o 'await' será executado após a conclusão da operação assíncrona.
 * 
 * }
 */

const waitFor = async (handler) => {

    try {

        if(typeof handler != 'function'){

            throw new Error('O handler não é uma função')

        }

        await new Promise(handler)

    } catch(Error) {

        console.error(Error.message)

    }

}

/**
 * 
 * Retorna `true` caso o campo seja válido, ou seja, é vazio ou está com um valor não esperado. Caso contrário, retornará `false`
 * 
 * @param {Element | Node} field - Campo que será verificado.
 * @return {Boolean} Retorna um `Boolean`
 * 
 * @example
 * const input = document.querySelector('input')
 * input.value = ''
 * 
 * const inputValidity = fieldIsValid(input)
 * 
 * console.log(inputValidity) // retorna false, pois o input é vazio
 * 
*/

const fieldIsValid = (field) => {
    
    try {

        if(!(field instanceof Element)){
            
            throw new Error('O campo fornecido não é um Element|Node')
            
        }

        return !field.validity.valueMissing && (field.value != null && (typeof field.value == "string" && field.value.trim() != ""))

    } catch(Error) {

        console.error(Error.message)

    }

}

/**
 * 
 * @param {Number} size Tamanho original
 * @param {Number} sizeDesired Tamanho desejado com base no original
 * @return {Number} Retorna a escala proporsional desejada, ex: `58px` -> `64px` = `1.10344828` (equivale a 110.344828%). Esse recurso é util caso queira alterar a escala de um elemento que é muito grande/pequeno e você precisa manter uma proporção adequada, que no exemplo demostrado, a escala desejada era 64px, então a escala vai ser aumentada `+110%`.
 */

const getProportionalScale = (size, sizeDesired) => {

    return (((sizeDesired * 100) / size) / 100)
    
}

/**
 * 
 * Trunca o texto e adiciona reticências (...) se ultrapassar o comprimento máximo.
 * @param {string} text O texto a ser truncado.
 * @param {number} maxLength O comprimento máximo permitido.
 * @return {string} O texto truncado, com reticências se necessário.
 * 
*/

const textOverflowEllipsis = (text, maxLength) => {

    text = String(text)

    return text.substring(0, maxLength) + (text.length > maxLength ? '...' : '')

}

const shortName = (string) => {

    return string.split(' ', 3).map((name, index, nameComplete) => {
    
        return (index > 0 && index < nameComplete.length - 1) ? name.split('')[0].toUpperCase() + '.' : name

    }).join(' ')

}

export default {
    toIframeSrc,
    toUpperCaseFirst,
    toCamelCase,
    toHTML,
    objIndexOf,
    shuffle,
    sleep,
    rand,
    waitFor,
    fieldIsValid,
    getProportionalScale,
    textOverflowEllipsis,
    shortName
}