const operators = document.querySelectorAll('.operator');
const digits = document.querySelectorAll('.digit');
const screen = document.getElementById('screen');
const equal = document.getElementById('equal');
const clear = document.getElementById('clear');
const del = document.getElementById('del');
const negative = document.getElementById('plus-minus');
const decimal = document.getElementById('decimal');
const percent = document.getElementById('percent');

let firstOperand = screen.textContent;
let secondOperand = '';
let currentOperator = null;
let shouldClearScreen = false;
const validOperators = ['+', '-', '/', '*'];

function selectDigit(e) {
  console.log(e);
  if (shouldClearScreen) {
    screen.textContent = '';
    shouldClearScreen = false;
  }
  let currentDigit = null;
  if (e.type === 'click') {
    currentDigit = e.target.textContent;
  } else if (e.type === 'keyup') {
    currentDigit = e.key;
  }
  if (currentOperator === null) {
    firstOperand += currentDigit;
    console.log(firstOperand);
  } else {
    secondOperand += currentDigit;
    console.log(secondOperand);
  }

  if (screen.textContent === '0') {
    screen.textContent += currentDigit;
  } else {
    screen.textContent += currentDigit;
  }

  if (screen.textContent.charAt(0) === '0' && currentDigit !== '0') {
    screen.textContent = screen.textContent.slice(1);
  }
}

function selectOperator(e) {
  let selectedOperator = null;

  if (e.type === 'click') {
    selectedOperator = e.target.textContent;
  } else if (e.type === 'keyup') {
    selectedOperator = e.key;
  }

  if (currentOperator !== null && secondOperand !== '') {
    operate(e, true);
  }

  if (firstOperand !== screen.textContent) {
    firstOperand = screen.textContent;
  }

  currentOperator = selectedOperator;
  shouldClearScreen = true;

  console.log(selectedOperator);
}

function add() {
  return parseFloat(
    (parseFloat(firstOperand) + parseFloat(secondOperand)).toFixed(3)
  );
}

function subtract() {
  return parseFloat(
    (parseFloat(firstOperand) - parseFloat(secondOperand)).toFixed(3)
  );
}

function multiply() {
  return parseFloat(
    (parseFloat(firstOperand) * parseFloat(secondOperand)).toFixed(3)
  );
}

function divide() {
  if (secondOperand > 0) {
    return parseFloat(
      (parseFloat(firstOperand) / parseFloat(secondOperand)).toFixed(3)
    );
  } else {
    alert(`You can't divide by 0!! Please input a new number to divide by!!`);
  }
  selectDigit();
}

function operate(e, isOperator = false) {
  let result = 0;

  if (currentOperator == null) {
    return;
  }

  if (firstOperand != '' && secondOperand == '') {
    secondOperand = firstOperand;
    firstOperand = screen.textContent;
  }

  if (currentOperator === '+') {
    result = add();
  } else if (currentOperator === '-') {
    result = subtract();
  } else if (currentOperator === '*') {
    result = multiply();
  } else if (currentOperator === '/') {
    result = divide();
  }

  if (Number.isInteger(result)) {
    result = result.toString();
  }
  screen.textContent = result;

  firstOperand = isOperator ? result.toString() : secondOperand;
  secondOperand = '';
  currentOperator = isOperator ? null : currentOperator;
  shouldClearScreen = true;
}

function clearResult() {
  screen.textContent = '0';
  firstOperand = screen.textContent;
  secondOperand = '';
  currentOperator = null;
  shouldClearScreen = false;
}

function delLastNum() {
  let length = 0;
  if (currentOperator === null) {
    if (firstOperand === 0) {
      return;
    }

    length = firstOperand.includes('-')
      ? firstOperand.length - 1
      : firstOperand.length;
    firstOperand = length > 1 ? firstOperand.slice(0, -1) : firstOperand;
    screen.textContent = firstOperand;
  } else {
    if (secondOperand === '0') {
      return;
    }
    length = secondOperand.includes('-')
      ? secondOperand.length - 1
      : secondOperand.length;
    secondOperand = length > 1 ? secondOperand.slice(0, -1) : secondOperand;
    screen.textContent = secondOperand;
  }
}

function toggleSign(number) {
  return (parseFloat(number) * -1).toString();
}

function makeNegative() {
  if (currentOperator == null || secondOperand == '') {
    firstOperand = screen.textContent;
    firstOperand = toggleSign(firstOperand);
    screen.textContent = firstOperand;
  } else {
    secondOperand = toggleSign(secondOperand);
    screen.textContent = secondOperand;
  }
}

function makeDecimal() {
  if (currentOperator === null) {
    firstOperand = firstOperand.includes('.')
      ? firstOperand
      : firstOperand + '.';
    screen.textContent = firstOperand;
  } else {
    secondOperand = secondOperand.includes('.')
      ? secondOperand
      : secondOperand + '.';
    screen.textContent = secondOperand;
  }
}

function togglePercent(number) {
  return parseFloat(number / 100).toString();
}

function makePercent() {
  firstOperand = screen.textContent;
  if (currentOperator === null || secondOperand === '') {
    firstOperand = togglePercent(firstOperand);
    screen.textContent = firstOperand;
  } else {
    secondOperand = togglePercent(secondOperand);
    screen.textContent = secondOperand;
  }
}

equal.addEventListener('click', operate);

clear.addEventListener('click', clearResult);

del.addEventListener('click', delLastNum);

negative.addEventListener('click', makeNegative);

decimal.addEventListener('click', makeDecimal);

percent.addEventListener('click', makePercent);

operators.forEach(operator => {
  operator.addEventListener('click', selectOperator);
});

digits.forEach(digit => {
  digit.addEventListener('click', selectDigit);
});

function handleKeyup(e) {
  console.log(e);
  if (validOperators.includes(e.key)) {
    selectOperator(e);
  } else if (!isNaN(e.key)) {
    selectDigit(e);
  } else if (e.key === 'Enter') {
    operate(e.key);
  }
}

document.addEventListener('keyup', handleKeyup);
