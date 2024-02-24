const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");

const numberButtons = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const operatorButtons = ["+", "-", "*", "/"];

let firstOperand = null;
let secondOperand = null;
let operator = null;
let displayValue = "";

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

const operate = (operator, a, b) => {
  a = parseFloat(a);
  b = parseFloat(b);

  const calculations = {
    "+": add(a, b),
    "-": subtract(a, b),
    "*": multiply(a, b),
    "/": divide(a, b),
  };

  return calculations[operator];
};

const populateDisplay = (value) => {
  displayValue += value;
};

const updateDisplay = (value) => {
  display.textContent = value;
};

const resetValues = () => {
  displayValue = "";
  firstOperand = null;
  secondOperand = null;
  operator = null;
};

const clearDisplay = () => {
  console.log("Clear calculator");
  display.textContent = "0";
};

const addToOperand = () => {
  console.log("add to operand");
  console.log(operator, firstOperand, secondOperand);
  if (!operator) {
    firstOperand = displayValue;
  } else {
    secondOperand = displayValue;
  }
};

const evaluate = () => {
  const isDivideByZero = divideByZero();
  console.log(isDivideByZero);
  if (isDivideByZero) {
    console.log("Division by zero");
    displayValue = "LOL, zero divide!";
    updateDisplay(displayValue);
    resetValues();
    return;
  }
  const result = operate(operator, firstOperand, secondOperand);
  updateDisplay(result);
  firstOperand = result;
  secondOperand = null;
  operator = null;
};

const divideByZero = () => {
  return (firstOperand == 0 || secondOperand == 0) && operator == "/";
};

const clickEqual = () => {
  console.log("click Equal");
  if (!firstOperand || !secondOperand || !operator) {
    return;
  }
  evaluate();
};

const clickOperator = (buttonId) => {
  console.log("click Operator");
  if (firstOperand && secondOperand && operator) {
    evaluate();
  }
  operator = buttonId;
  displayValue = "";
};

buttons.forEach((button) => {
  if (numberButtons.includes(button.id)) {
    button.addEventListener("click", () => {
      populateDisplay(button.id);
      addToOperand();
      updateDisplay(displayValue);
    });
  } else if (operatorButtons.includes(button.id)) {
    button.addEventListener("click", () => clickOperator(button.id));
  } else if (button.id === "clear") {
    button.addEventListener("click", () => {
      resetValues();
      clearDisplay();
    });
  } else if (button.id === "=") {
    button.addEventListener("click", () => {
      clickEqual();
    });
  }
});
