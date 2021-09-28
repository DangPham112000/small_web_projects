const passwordEle = document.getElementById('password');
const btnCopyEle = document.getElementById('btn-copy');
const btnGenerateEle = document.getElementById('btn-generate');
const lenEle = document.getElementById('len');
const upperEle = document.getElementById('upper');
const lowerEle = document.getElementById('lower');
const numEle = document.getElementById('num');
const symEle = document.getElementById('sym');

const upperLetters = "QWERTYUIOPASDFGHJKLZXCVBNM";
const lowerLetters = "qwertyuiopasdfghjklzxcvbnm";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_+-=";

function getUppercase() {
    return Math.floor(Math.random() * upperLetters.length);
}

function getLowercase() {
    return Math.floor(Math.random() * lowerLetters.length);
}

function getNumber() {
    return Math.floor(Math.random() * numbers.length);
}

function getSymbol() {
    return Math.floor(Math.random() * symbols.length);
}

function generatePassword() {
    const len = lenEle.value;

    let pass = '';

    for (let i=0; i<len; i++) {
        const word = randomWord();
        pass += word;
    }

    passwordEle.innerText = pass;
}

function randomWord() {
    const todayWords = [];

    if (upperEle.checked) {
        todayWords.push(upperLetters[getUppercase()]);
    }
    if (lowerEle.checked) {
        todayWords.push(lowerLetters[getLowercase()]);
    }
    if (numEle.checked) {
        todayWords.push(numbers[getNumber()]);
    }
    if (symEle.checked) {
        todayWords.push(symbols[getSymbol()]);
    }

    if (todayWords[0]) {
        return todayWords[Math.floor(Math.random() * todayWords.length)];
    }
    
    return '';
}

btnGenerateEle.addEventListener('click', generatePassword);

btnCopyEle.addEventListener('click', () => {
    const textarea = document.createElement('textarea');

    const pass = passwordEle.innerText;

    if (!pass) {
        return;
    }

    textarea.value = pass;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert("Password copied to your clipboard");

});