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
    let secret = $("#optionSecretInput").val();
    let mod = $("#modulusInput").val();
    let keyA = toIntArray($("#publicKeyAInput").val());
    let errors = toIntArray($("#errorsInput").val());
    let keyB = toIntArray($("#publicKeyBInput").val());
    encryptBit(0, keyA, keyB)
}

function generateOptions() {
    let n = $("#securityInput").val();               // the security parameter
    let q = getPrime(n);                             // a random prime between n^2 and 2n^2
    let secret = getRandomInteger(2,q);
    let m = Math.floor(1.1 * n * Math.log10(q));  // number of equations
    let alpha = 1 / (Math.sqrt(n) * Math.pow(Math.log10(n), 2)); // TODO: Ask about this
    let errors = getErrors(m);
    let keyA = getPublicKeyA(m, q);
    let keyB = getPublicKeyB(keyA, q, secret, errors);
    $("#optionSecretInput").val(secret);
    $("#modulusInput").val(q);
    $("#publicKeyAInput").val(keyA);
    $("#errorsInput").val(errors);
    $("#publicKeyBInput").val(keyB);
}

function encode(inputText) {
    let outputArray = [];
    for (let i = 0; i < inputText.length; i++) {
        outputArray.push(inputText[i].charCodeAt(0).toString(2));
    }
    return outputArray
}

function encryptBit(inputBit, keyA, keyB) {
    let sampleA = [];
    let sampleB = [];
    //let sampleIndexes = _.sample(_.range(keyA.length), Math.floor(keyA.length/4));
    let sampleIndexes = [11, 12, 8, 17, 7];
    for (let i = 0; i < sampleIndexes.length; i++) {
        sampleA.push(keyA[sampleIndexes[i]]);
        sampleB.push(keyB[sampleIndexes[i]]);
    }
    alert(sampleA);
    alert(sampleB);
}

function getPrime(n) {
    let maxTries = 1000;
    let randInt = 0;
    let a = Math.pow(n, 2);
    let b = 2 * (Math.pow(n, 2));
    for(let i = 0; i < maxTries; i++) {
        randInt = getRandomInteger(a, b);
        if (isPrime(randInt))
            return randInt;
    }
    alert("Failed to get prime in maxTries: " + maxTries);
    throw "Failed to get prime in maxTries: " + maxTries; // TODO: Add error message
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

function toIntArray(inputString) {
    return inputString.split(',').map(Number)
}

function sumArray(a) {
    let sum = 0;
    for (let i = 0; i < a.length; i++) {
        sum += a[i];
    }
    return sum;
}
