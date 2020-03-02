$(document).ready(function(){
    $("#inputBox").on('input', function() {
        updateChart();
    });

    // Catches enter key presses on forms and acts like "tab" was pressed if it's on a text form
    $('input').keydown( function(e) {
        let key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if(key === 13) {
            e.preventDefault();
            let inputs = $(this).closest('form').find(':input:visible');
            inputs.eq( inputs.index(this)+ 1 ).focus();
        }
    });
});

// Updates the letter frequency chart
function updateChart() {
    let inputText = $("#inputBox").val();
    const frequencies = getLetterFrequencies(inputText);
    for (let i = 0; i < alphabet.length; i++) {
        myChart.data.datasets[0].data[i] = frequencies[alphabet[i]];
    }
    myChart.update();
}

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

function swapIO() {
    let inputBox = $("#inputBox");
    let outputBox = $("#outputBox");
    let temp = outputBox.val();
    outputBox.val(inputBox.val());
    inputBox.val(temp);
    updateChart();
}

function LWEEncrypt() {
    let inputText = $("#inputBox").val();
    let q = parseInt($("#modulusInput").val());
    let keyA = toIntArray($("#publicKeyAInput").val());
    let keyB = toIntArray($("#publicKeyBInput").val());
    let outputBox = $("#outputBox");

    if ($.isNumeric(q) && keyA !== '' && keyB !== '') {
        let encodedMessage = encode(inputText);
        let encrypted = [];
        encodedMessage.forEach(bit => {
                encrypted.push(encryptBit(bit, keyA, keyB, q));
                encrypted.push("\n");
            });
        encrypted.pop(); // Removes the last \n
        outputBox.val("");
        encrypted.forEach(uvPair => {
            outputBox.val(outputBox.val() + uvPair);
        });
    } else {
        alert('Encryption requires a Modulus, Public Key (A), and Public Key (B)');
    }
}

function LWEDecrypt() {
    let inputText = $("#inputBox").val();
    let q = parseInt($("#modulusInput").val());
    let secret = parseInt($("#optionSecretInput").val());
    let outputBox = $("#outputBox");

    if ($.isNumeric(parseInt(inputText)) && $.isNumeric(q) && $.isNumeric(secret)) {
        let encrypted = parseInput(inputText);
        let outputMessage = "";

        // Creates an output message of decrypted bits in binary
        encrypted.forEach(uvPair => {
            outputMessage += getBitFromUV(uvPair, secret, q);
        });

        outputBox.val(decode(outputMessage));
    } else {
        alert('Decryption requires a Secret, Modulus, and correctly formatted input text');
    }
}

function generateOptions() {
    let n = $("#securityInput").val();                // the security parameter
    if ($.isNumeric(n) && n < 100000) {
        let q = getPrime(n);                          // a random prime between n^2 and 2n^2
        let secret = getRandomInteger(2, q);
        let m = Math.floor(1.1 * n * Math.log10(q));  // number of equations
        let alpha = 1 / (Math.sqrt(n) * Math.pow(Math.log10(n), 2)); // Could be used to generate distributed errors
        let errors = getErrors(m);
        let keyA = getPublicKeyA(m, q);
        let keyB = getPublicKeyB(keyA, q, secret, errors);
        $("#optionSecretInput").val(secret);
        $("#modulusInput").val(q);
        document.getElementById("publicKeyAInput").value = keyA;
        document.getElementById("errorsInput").value = errors;
        document.getElementById("publicKeyBInput").value = keyB;
    } else {
        alert("Error: Security Parameter required as integer below 100000");
    }

}

function generateKeyB() {
    let secret = parseInt($("#optionSecretInput").val());
    let q = parseInt($("#modulusInput").val());
    let keyA = toIntArray($("#publicKeyAInput").val());
    let errors = toIntArray($("#errorsInput").val());
    let keyB = getPublicKeyB(keyA, q, secret, errors);

    if (keyB.toString() === "NaN")
        alert("Error: Secret, Modulus, Public Key (A), and Errors required to generate Public Key (B)");
    else
        document.getElementById("publicKeyBInput").value = keyB;
}

// turns text into an array of bits (as numbers)
function encode(inputText) {
    let output = "";
    let bits;
    for (let i = 0; i < inputText.length; i++) {
        bits = inputText[i].charCodeAt(0).toString(2);
        while (bits.length < 8)
            bits = "0" + bits;
        output += bits;
    }
    return Array.from(output).map(Number);
}

function decode(inputText) {
    let outputText = "";
    let binaryCharsArray = splitArray(inputText.split(''), 8);
    binaryCharsArray.forEach(bitArray => {
        let bitString = bitArray.join('');
        outputText += String.fromCharCode(parseInt(bitString,2));
    });
    return outputText;
}

function encryptBit(inputBit, keyA, keyB, prime) {
    let sampleA = [];
    let sampleB = [];
    let sampleIndexes = _.sample(_.range(keyA.length), Math.floor(keyA.length/4));
    for (let i = 0; i < sampleIndexes.length; i++) {
        sampleA.push(keyA[sampleIndexes[i]]);
        sampleB.push(keyB[sampleIndexes[i]]);
    }
    let u = mod(sumArray(sampleA), prime);
    let v = mod((sumArray(sampleB) + Math.floor((prime/2) * inputBit)), prime);
    return [u, v];
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
        keyB.push(mod((keyA[i] * secret + errors[i]), prime));
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

function getBitFromUV(uvPair, secret, q) {
    let u = uvPair[0];
    let v = uvPair[1];
    let dec = mod(v - secret * u, q);
    // alert ("u:" + u + " v:" + v + " dec:" + dec);
    if (dec < mod(dec - q / 2, q))
        return 0;
    else
        return 1;
}

function parseInput(inputText) {
    let inputMessage = [];
    inputText.split("\n").forEach(uvPair => {
        inputMessage.push(uvPair.split(","));
    });
    return inputMessage;
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

function splitArray(myArray, chunk_size){
    let results = [];

    while (myArray.length) {
        results.push(myArray.splice(0, chunk_size));
    }

    return results;
}

function sumArray(a) {
    let sum = 0;
    for (let i = 0; i < a.length; i++) {
        sum += a[i];
    }
    return sum;
}

// positive modulo
function mod(n, m) {
    return ((n % m) + m) % m;
}
