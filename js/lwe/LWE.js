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
    alert(inputText);
}