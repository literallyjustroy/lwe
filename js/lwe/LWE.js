$(document).ready(function(){
    $("#inputBox").on('input', function() {
        let inputText = $("#inputBox").val();
        const frequencies = getLetterFrequencies(inputText);
        for (let i = 0; i < alphabet.length; i++) {
            myChart.data.datasets[0].data[i] = frequencies[alphabet[i]];
        }
        myChart.update();
    });
});

function getLetterFrequencies(myText){
    let frequencies = {};
    for (let i = 0; i < alphabet.length; i++) {
        frequencies[alphabet[i]] = 0;	// Initialize each letter to 0
    }
    for (let i = 0; i < myText.length; i++) {
        frequencies[myText[i].toLowerCase()]++;
    }
    return frequencies;
}

function LWEEncrypt() {
    let inputText = $("#inputBox").val();
    let encodedMessage = encode(inputText);
}

function generateOptions() { // TODO: Add seperate menu for generating options
    let n = $("#securityInput").val();               // the security parameter
    let q = getPrime(n);                             // a random prime between n^2 and 2n^2
    let m = Math.floor(1.1 * n * Math.log10(q));  // number of equations
    let errors = getErrors(m);
    let keyA = getPublicKeyA(m, q);
    // TODO: Set each of these in the menu
}

function encode(inputText) {
    let outputArray = [];
    for (let i = 0; i < inputText.length; i++) {
        outputArray.push(inputText[i].charCodeAt(0).toString(2));
    }
    let q = getPrime(n);
    let m = Math.floor(1.1 * n * Math.log10(q));
    let errors = getErrors(m);
    let keyA = getPublicKeyA(m, q);
    let keyB = getPublicKeyB(keyA, q, secret, e)
    alert(keyA);
    encryptBit(outputArray[0][0], keyA, keyB, n, m, q, e)
}

function encryptBit(inputBit, keyA, keyB, n, m, q, e) {
    let alpha = 1 / (Math.sqrt(n) * Math.log10(n) ^ 2);
    alert("n: " + n + " q: " + q + " m: " + m + " alpha: " + alpha);
}

function getPrime(n) {
    let maxTries = 1000;
    for(let i = 0; i < maxTries; i++) {
        let randInt = getRandomInteger(n ^ 2, 2 * (n ^ 2));
        if (isPrime(randInt))
            return randInt;
    }
    throw "Failed to get prime in maxTries: " + maxTries;
}

function getPublicKeyA(numEqns, prime) {
    let keyA = [];
    for (let i = 0; i < numEqns; i++) {
        keyA.push(getRandomInteger(1, prime))
    }
    return keyA;
}

function getPublicKeyB(keyA, prime, secret, errors) {
    let keyB = [];
    for (let i = 0; i < keyA.length; i++) {
        keyB.push((keyA[i] * secret + errors[i]) % prime)
    }
    return keyB;
}

function getErrors(num) {
    let errors = [];
    for (let i =  0; i < num; i++) {
        errors.push(getRandomInteger(1, 5))
    }
    return errors;
}

function isPrime(num)  {
    let sqrt = Math.sqrt(num);
    for (let i = 2; i <= sqrt; i++)
        if (num % i === 0)
            return false;
    return num > 1;
}

// get random integers min(inclusive) and max(exclusive)
function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}
