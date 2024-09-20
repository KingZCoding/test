

function Calculator(displayId) {
  let firstOperand = '';
  let secondOperand = '';
  let currentOperator = null;
  let shouldClearScreen = false;

  let display = document.getElementById(displayId);

  const setDisplay = ( operand ) => {
      display.textContent = operand;
      if(display.textContent.length > 1 && display.textContent.startsWith('0')) {
        display.textContent = display.textContent.slice(1);
      }
  }

  const getDisplay = () => {
      return display.textContent;
  }

  const clearDisplay = () => {
      setDisplay('0');
      firstOperand = getDisplay();
      secondOperand = '';
      currentOperator = null;
      shouldClearScreen = false;
  }

  const deleteDigit = () => {
      
  }

  const appendDigit = (digit) => {
    if (shouldClearScreen) {
      setDisplay('');
      shouldClearScreen = false;
    }

    if (currentOperator === null) {
      firstOperand += digit;
    } else {
      secondOperand += digit;
    }
  
    if (screen.textContent === '0') {
      setDisplay(digit);
    } else {
      const appendedDigit = getDisplay() + digit;
      setDisplay(appendedDigit);
    }
  }

  const selectOperator = (e) => {

    if (currentOperator !== null && secondOperand !== '') {
      const isOperator = true;
      calculate(e, isOperator);
    }
  
    if (firstOperand !== getDisplay()) {
      firstOperand = getDisplay();
    }
  
    currentOperator = e.target.textContent;
    shouldClearScreen = true;
  }

  const calculate = (e, isOperator) => {
    if (currentOperator == null) {
      return;
    }
  
    if (firstOperand != '' && secondOperand == '') {
      secondOperand = firstOperand;
      firstOperand = getDisplay();
    }

    let result = 0;
    const first = parseFloat(firstOperand);
    const second = parseFloat(secondOperand);
  
    switch(currentOperator) {
      case '+':
        result = first + second;
      break;
      case  '-':
        result = first - second;
      break;
      case '*':
        result = first * second;
      break;
      case '/':
        result = first / second;
      break;
    }
    
    result = parseFloat(result.toFixed(3));

    if (Number.isInteger(result)) {
      result = result.toString();
    }

    setDisplay(result);
  
    firstOperand = isOperator ? result.toString() : secondOperand;
    secondOperand = '';
    currentOperator = isOperator ? null : currentOperator;
    shouldClearScreen = true;
  }
  
  return {
    clearDisplay,
    appendDigit,
    selectOperator,
    calculate
  }
}

function setupCalculator(calculator, calculatorElement) {
  calculatorElement.querySelectorAll('.digit').forEach(button => {
    button.addEventListener('click', () => calculator.appendDigit(button.textContent));
  });

  calculatorElement.querySelectorAll('.operator').forEach(button => {
    button.addEventListener('click', (e) => calculator.selectOperator(e));
  });

  calculatorElement.querySelector('.equal').addEventListener('click', () => calculator.calculate());
  calculatorElement.querySelector('.clear').addEventListener('click', () => calculator.clearDisplay());
}
