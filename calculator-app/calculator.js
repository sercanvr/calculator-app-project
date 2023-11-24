const calculatorTitle = document.querySelector('h1');
const buttons = document.querySelectorAll('button');
const resetBtn = document.getElementById('resetBtn');
const disableBtns = document.querySelectorAll('.operator#disableBtn');

let initialValue = 0;
let operatorValue = '';
let isWaiting = false;


function sendNumberValue(number) {
    if(isWaiting)
    {
        calculatorTitle.textContent = number;
        isWaiting = false;
    }
    else {
        const displayValue = calculatorTitle.textContent;
        calculatorTitle.textContent = 
        displayValue === '0' ? number : displayValue + number;
    }
};


function addDecimal() {
    if(!calculatorTitle.textContent.includes('.'))
    {
        calculatorTitle.textContent = `${calculatorTitle.textContent}.`;
    }
};


function useOperator(operator) {
    const currentValue = Number(calculatorTitle.textContent);

    if (operatorValue && isWaiting) {
        operatorValue = operator;
        return;
    }

    if (!initialValue) {
    initialValue = currentValue;
    } else {
        const calculation = calc[operatorValue](initialValue, currentValue);
        calculatorTitle.textContent = calculation;
        initialValue = calculation;
    }

    isWaiting = true;
    operatorValue = operator;
}

const calc = {
    '/': (firstNumber, secondNumber) => firstNumber / secondNumber,
    '*': (firstNumber, secondNumber) => firstNumber * secondNumber,
    '+': (firstNumber, secondNumber) => firstNumber + secondNumber,
    '-': (firstNumber, secondNumber) => firstNumber - secondNumber,
    '=': (secondNumber) => secondNumber,
};


buttons.forEach((button) => {
    if(button.classList.length === 0)
    {
        button.addEventListener('click', () => sendNumberValue(button.value));
    }
    else if (button.classList.contains('operator')) {
        button.addEventListener('click', () => useOperator(button.value));
    }
    else if (button.classList.contains('zeroBtn')) {
        button.addEventListener('click', () => sendNumberValue(button.value));
    }
    else if (button.classList.contains('decimal')) {
        button.addEventListener('click', () => addDecimal());
    }
});


function resetAll() {
    calculatorTitle.textContent = '0';
    initialValue = 0;
    operatorValue = '';
    isWaiting = false;
};

resetBtn.addEventListener('click', resetAll);