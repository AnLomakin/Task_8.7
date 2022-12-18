document.querySelector('#RowGameCard').classList.add("notOnScreen"); 

document.querySelector('#btnContinue').addEventListener('click', function () {
    minValue = parseInt(document.querySelector('#formInputMin').value);
    maxValue = parseInt(document.querySelector('#formInputMax').value);
    minValue = (minValue < -999) ? minValue = -999 : (minValue > 999) ? minValue = 999 : minValue;
    maxValue = (maxValue > 999) ? maxValue = 999 : (maxValue < -999) ? maxValue = -999 : maxValue;
    if (maxValue < minValue) {
        [maxValue, minValue] = [minValue, maxValue]; 
    }
    if (Number.isNaN(maxValue) || Number.isNaN(minValue)) {
        minValue = 0;
        maxValue = 100;
    }
    guessNumber.innerText = `Загадайте любое число в диапазоне от ${minValue} до ${maxValue},я его угадаю`;
})

document.querySelector('#btnPlay').addEventListener('click', function () { 
    document.querySelector('#greetings').classList.add("notOnScreen"); 
    document.querySelector('#RowGameCard').classList.remove("notOnScreen");


let answerNumber = Math.floor((minValue + maxValue) / 2); 
    let orderNumber = 1; 
    let gameRun = true;

    const orderNumberField = document.getElementById('orderNumberField'); // Вопрос №_
    const answerField = document.getElementById('answerField');

    let units = ['', 'один', 'два', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять'];
    let teens = ['', 'десять', 'одинадцать', 'двенадцать', 'тринадцать', 'четырнадцать', 'пятнадцать', 'шестнадцать', 'семнадцать', 'восемнадцать', 'девятнадцать'];
    let dozens = ['', 'двадцать', 'тридцать', 'сорок', 'пятьдесят', 'шестьдесят', 'семьдесят', 'восемьдесят', 'девяносто'];
    let hundreds = ['', 'сто', 'двести', 'триста', 'четыреста', 'пятьсот', 'шестьсот', 'семьсот', 'восемьсот', 'девятьсот'];

    function numberToText() { 
        let number = Math.abs(answerNumber);
        let text = '';

        if (number == 0) {
            text = 'ноль';
            return text;
        }

        if (number <= 9) {
            return units[Math.floor(Math.abs(number) / 1)];
        }

        if (number > 9 && number < 20) {
            return teens[Math.floor(number / 10 + number % 10)];
        }

        if (number >= 20 && number <= 99) {
            return dozens[(Math.floor(number / 10)) - 1] + " " + units[Math.floor(number % 10)];
        }

        if (number >= 100 && number <= 999) {
            return hundreds[Math.floor(number / 100)] + " " + numberToTextHundreds();
        }
    }

    function numberToTextHundreds() { 
        let unitsTeensDozens = Math.abs(answerNumber) % 100;

        if (unitsTeensDozens <= 9) {
            return units[Math.floor(unitsTeensDozens / 1)];
        }

        if (unitsTeensDozens > 9 && unitsTeensDozens < 20) {
            return teens[(Math.floor(unitsTeensDozens / 10)) + (unitsTeensDozens % 10)];
        }

        if (unitsTeensDozens >= 20 && unitsTeensDozens <= 99) {
            return dozens[(Math.floor(unitsTeensDozens / 10)) - 1] + " " + units[Math.floor(unitsTeensDozens % 10)];
        }
    }
    
    orderNumberField.innerText = orderNumber; 
    answerField.innerText = answerNumber >= 0 ? numberToText().length < 20 && answerNumber >= 0 ? `Вы загадали число ${numberToText()}?` : `Вы загадали число ${answerNumber}?` : numberToText().length < 20 ? `Вы загадали число минус ${numberToText()}?` : `Вы загадали число ${answerNumber}?`;
    

    document.getElementById('btnLess').addEventListener('click', function () { 
        if (gameRun) {
            if (minValue === maxValue || minValue == answerNumber) {
                const phraseRandom = Math.round(Math.random() * 3);
                switch (phraseRandom) {
                    case 0:
                        answerPhrase = `Вы загадали неправильное число!\n\u{1F914}`
                        break;

                    case 1:
                        answerPhrase = `Вы забыли, какое число загадали?\n\u{1F92A}`
                        break;

                    case 2:
                        answerPhrase = `Вы ошиблись с числом!\n\u{1F9D0}`
                        break;

                    case 3:
                        answerPhrase = `Не жульничайте!\n\u{1F620}`
                        break;
                }
                answerField.innerText = answerPhrase;
                gameRun = false;
            } else {
                maxValue = answerNumber - 1; 
                answerNumber = Math.floor((minValue + maxValue) / 2);
                orderNumber++;
                orderNumberField.innerText = orderNumber;
                const phraseRandom = Math.round(Math.random() * 3); 
                switch (phraseRandom) {
                    case 0:
                        answerPhrase = `Наверное, это число `
                        break;

                    case 1:
                        answerPhrase = `Вероятно `
                        break;

                    case 2:
                        answerPhrase = `Это число `
                        break;

                    case 3:
                        answerPhrase = `Я думаю, что это число `
                        break;
                }
                answerField.innerText = answerNumber >= 0 ? numberToText().length < 20 && answerNumber >= 0 ? `Вы загадали число ${numberToText()}?` : `Вы загадали число ${answerNumber}?` : numberToText().length < 20 ? `Вы загадали число минус ${numberToText()}?` : `Вы загадали число ${answerNumber}?`;
            }
        }
    })

    document.getElementById('btnOver').addEventListener('click', function () { 
        if (gameRun) {
            if (minValue === maxValue) {
                const phraseRandom = Math.round(Math.random() * 3);
                switch (phraseRandom) {
                    case 0:
                        answerPhrase = `Вы загадали неправильное число!\n\u{1F914}`
                        break;

                    case 1:
                        answerPhrase = `Вы забыли, какое число загадали?\n\u{1F92A}`
                        break;

                    case 2:
                        answerPhrase = `Вы ошиблись с числом!\n\u{1F9D0}`
                        break;

                    case 3:
                        answerPhrase = `Не жульничайте!\n\u{1F620}`
                        break;
                }
                answerField.innerText = answerPhrase;
                gameRun = false;
            } else {
                minValue = answerNumber + 1; 
                answerNumber = Math.floor((minValue + maxValue) / 2);
                orderNumber++;
                orderNumberField.innerText = orderNumber;
                const phraseRandom = Math.round(Math.random() * 3); 
                switch (phraseRandom) {
                    case 0:
                        answerPhrase = `Вы загадали число `
                        break;

                    case 1:
                        answerPhrase = `Наверное, это число `
                        break;

                    case 2:
                        answerPhrase = `Вероятно `
                        break;

                    case 3:
                        answerPhrase = `Это число `
                        break;

                    case 4:
                        answerPhrase = `Я думаю, что это число `
                        break;
                }
                answerField.innerText = answerNumber >= 0 ? numberToText().length < 20 && answerNumber >= 0 ? `Вы загадали число ${numberToText()}?` : `Вы загадали число ${answerNumber}?` : numberToText().length < 20 ? `Вы загадали число минус ${numberToText()}?` : `Вы загадали число ${answerNumber}?`;
            }
        }
    })

    document.getElementById('btnEqual').addEventListener('click', function () { 
        if (gameRun) {
            const phraseRandom = Math.round(Math.random() * 3);
            switch (phraseRandom) {
                case 0:
                    answerPhrase = `Я всегда угадываю\n\u{1F60E}`
                    break;

                case 1:
                    answerPhrase = `Точно! \n\u{1F60E}`
                    break;

                case 2:
                    answerPhrase = `Супер!\n\u{1F973}`
                    break;

                case 3:
                    answerPhrase = `Я телепат!\n\u{1F929}`
                    break;
            }
            answerField.innerText = answerPhrase;
            gameRun = false;
        }
    })
})

document.querySelector('#btnRetry').addEventListener('click', function () {
    document.querySelector('#formInputMin').value = '';
    document.querySelector('#formInputMax').value = '';
    
    var myModal = new bootstrap.Modal(document.querySelector('#formDataInput'),);
    myModal.show();
    
})