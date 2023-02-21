function pasman() {
    const url = document.getElementById('website').value
    const email = document.getElementById('email').value
    const cypherCode = document.getElementById('cypher').value
    const special = document.querySelector('#specialChar').checked
    const debug = document.querySelector('#pasman-debug').checked

    const alphaLower = "abcdefghijklmnopqrstuvwxyz"
    const alphaUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const numbers = "1234567890"
    const symbols = "(~! @#$%^&*_-+=`|\\(){}[]:;\"'<>,.?/)"

    const woSymbols = alphaLower + alphaUpper + numbers
    const withSymbols = woSymbols + symbols

    let activeCharSet = ''

    if(special) {
        activeCharSet = withSymbols
    }
    else if(!special) {
        activeCharSet = woSymbols
    }
    if(debug) {
        document.getElementById('debug-set').innerHTML = activeCharSet
    }

    const activeCharMap = {}
    

    for(let i = 0; i < activeCharSet.length; i++) {
        activeCharMap[i] = activeCharSet[i]
    }
    if(debug) {
        document.getElementById('debug-map').innerHTML = getKey(activeCharMap, "a")
    }

    errorAlert(url, email, cypherCode)

    let sub_url = url.match(/\.(.*)\./)
    sub_url = sub_url[1]
    let sub_email = email.match(/(.*)@/)
    sub_email = sub_email[1]
    if(debug) {
        document.getElementById('debug-sub-url').innerHTML = sub_url
    }
    if(debug) {
        document.getElementById('debug-sub-email').innerHTML = sub_email
    }

    let cypherWordCode = cypherWord(cypherCode, activeCharMap)
    let cypherWordEmail = cypherWord(sub_email, activeCharMap)
    
    if(debug) {
        document.getElementById('debug-cypher-code').innerHTML = cypherWordCode
        document.getElementById('debug-cypher-email').innerHTML = cypherWordEmail
    }

    let cypher_seed = Math.round((cypherWordCode + cypherWordEmail)/13)
    while(cypher_seed.length < 10) {
        cypher_seed = (cypher_seed**2) + 2
    }
    
    
    while(cypher_seed > 10**13) {
        cypher_seed = cypher_seed/(cypherWordEmail[2]+2)
        if(cypher_seed < 10**13 & cypher_seed >= (10**11) - 1) {
            cypher_seed = Number(String(cypher_seed).substring(1,11))
        }
    }
    if(debug) {
        document.getElementById('debug-seed').innerHTML = cypher_seed
    }

    const url_array = getNumArray(sub_url, activeCharMap)
    const pass_array = []
    if(debug) {
        document.getElementById('debug-url-array').innerHTML = url_array
    }

    for(let i = 0; i < sub_email.length; i++) {
        url_array.push(sub_email[i])
    }

    for(let i = 0; i < url_array.length; i++) {
        let n = url_array[i]
        let m = 0
        if(m == 0) {
            m = (url_array[url_array.length-1]) * seed[2]
        }
        else {
            m = (url_array[i-1]) * seed[3]
        }
        let y = seed
        let z = ((y * n + m) % activeCharMap.length)
        pass_array.push(z)
    }

    passOut = numArrayToString(pass_array, activeCharMap)

    document.getElementById('passman-output-tex').innerHTML = passOut

}

function errorAlert(url, email, cypherCode) {
    let errorCheck = 0
    let errorUrl = ''
    let errorEmail = ''
    let errorCypher = ''
    if(url == '') {
        errorUrl = "Input URL Empty \n"
        errorCheck = 1
    }
    if(email == '') {
        errorEmail = "Input Email Empty \n"
        errorCheck = 1
    }
    if(cypherCode == '') {
        errorCypher = "Input Cypher Code Empty \n"
        errorCheck = 1
    }
    if (errorCheck != 0) {
        //alert(errorUrl)
        alert(errorUrl + errorEmail + errorCypher)
    }
}


function getKey(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

function getNumArray(keyword, charMap) {
    const numArray = []
    for(let i = 0; i < keyword.length; i++) {
        numArray.push(getKey(charMap, keyword[i]))
    }
    return numArray
}

function numArrayToString(keyArray, charMap) {
    let stringVal = ''
    for(let i = 0; i < keyArray.length; i++) {
        stringVal += charMap[keyArray[i]]
    }
    return stringVal
}

function cypherWord(keyword, charMap) {
    let cypherVal = ''
    for(let i = 0; i < keyword.length; i++) {
        cypherVal += getKey(charMap, keyword[i])
    }
    return Number(cypherVal)
}