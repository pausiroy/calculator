const calculator = {
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
};



function inputDigit(digit) {
    const { displayValue, waitingForSecondOperand } = calculator;
    
    if(waitingForSecondOperand === true) {
        calculator.displayValue = digit;
        calculator.waitingForSecondOperand = false;
    } else {
        // Overwrite `displayValue` if the current value is '0' otherwise append to it
        calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;    
    }
    console.log(calculator);
    
}

function inputDecimal(dot) {
    if(calculator.waitingForSecondOperand === true) {
        calculator.displayValue = '0.'
        calculator.waitingForSecondOperand = false;
        return
    }
   // If the `displayValue` property does not contain a decimal point
    if(!calculator.displayValue.includes(dot)){
        // Append the decimal point
        calculator.displayValue += dot
    } 
}

function handleOperator(nextOperator) {
    // Destructure the properties on the calculator object
    const { displayValue, firstOperand, operator } = calculator
    // `parseFloat` converts the string contents of `displayValue`
  // to a floating-point number
    const inputValue = parseFloat(displayValue);

    if( operator && calculator.waitingForSecondOperand) {
        calculator.operator = nextOperator;
        console.log(calculator);
        return
    }
    
   // verify that `firstOperand` is null and that the `inputValue`
  // is not a `NaN` value
    if(firstOperand === null && !isNaN(inputValue)) {
        // Update the firstOperand property
        calculator.firstOperand = inputValue
    } else if (operator) {
        const result = calculate(firstOperand, inputValue, operator);

        calculator.displayValue = String(result);
        calculator.firstOperand = result
    }

    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;
    
}

function calculate(firstOperand, secondOperand, operator){
    if(operator === '+') {
        return firstOperand + secondOperand
    } else if(operator === '-') {
        return firstOperand - secondOperand
    } else if(operator === '*') {
        return firstOperand * secondOperand
    } else if(operator === '÷') {
        return firstOperand / secondOperand
    }
    return secondOperand
}

function resetCalculator() {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
    console.log(calculator)
}

function updateDisplay() {
    const display = document.querySelector('.calculator-screen');
    display.value = calculator.displayValue;
}

//Handle key presses


const keys = document.querySelector('.calculator-keys');

keys.addEventListener('click', (event) => {
    const target = event.target

  // Check if the clicked element is a button.
  // If not, exit from the function
    
    if(!target.matches('button')) {
        return
    }

    if(target.classList.contains('operator')) {
        handleOperator(target.value)
        updateDisplay();
        return
    }

    if(target.classList.contains('decimal')) {
        inputDecimal(target.value)
        updateDisplay();
        return
    }

    if(target.classList.contains('all-clear')) {
        resetCalculator(target.value)
        updateDisplay();
        return
    }

    inputDigit(target.value)
    updateDisplay();
})


