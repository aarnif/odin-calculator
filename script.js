const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");

const operandButtons = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  ".",
  "sign",
];
const operatorButtons = ["+", "-", "*", "/"];
const maxDisplayWidth = 15;

let firstOperand = null;
let secondOperand = null;
let operator = null;
let displayValue = "0";

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

const roundToPrecision = (number, precision) => {
  return Math.round(number * Math.pow(10, precision)) / Math.pow(10, precision);
};

const populateDisplay = (value) => {
  console.log("Populate display");
  if (
    displayValue.length >= maxDisplayWidth ||
    (value === "." && displayValue.includes("."))
  ) {
    return;
  } else if (displayValue === "0" && value !== ".") {
    displayValue = value;
    return;
  } else if (value === "sign") {
    displayValue = parseFloat(displayValue) * -1;
    displayValue = displayValue.toString();
    return;
  }

  displayValue += value;
  console.log("Display value: ", displayValue);
};

const dePopulateDisplay = () => {
  console.log("De-populate display");
  if (displayValue.length === 1) {
    displayValue = "0";
    return;
  }
  displayValue = displayValue.slice(0, -1);
  console.log("Display value: ", displayValue);
};

const roundValue = (value) => {
  console.log("Round value");
  const [integerPart, decimalPart] = value.split(".");
  const roundingPrecision = maxDisplayWidth - integerPart.length - 1;
  return roundToPrecision(value, roundingPrecision);
};

const updateDisplay = (value) => {
  console.log("Update display");
  displayValue = value;
  const valueToString = value.toString();
  if (valueToString.includes(".") && valueToString.length > maxDisplayWidth) {
    displayValue = roundValue(valueToString);
  }
  display.textContent = displayValue;
};

const resetValues = () => {
  displayValue = "0";
  firstOperand = null;
  secondOperand = null;
  operator = null;
};

const clearDisplay = () => {
  console.log("Clear calculator");
  display.textContent = "0";
};

const addToOperand = () => {
  console.log("Add to operand");
  if (!operator) {
    firstOperand = displayValue;
  } else {
    secondOperand = displayValue;
  }
  console.log(operator, firstOperand, secondOperand);
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
  resetValues();
  firstOperand = result;
};

const divideByZero = () => {
  return (firstOperand == 0 || secondOperand == 0) && operator == "/";
};

const clickEqual = () => {
  console.log("Click Equal");
  if (!firstOperand || !secondOperand || !operator) {
    return;
  }
  evaluate();
};

const clickOperator = (buttonId) => {
  console.log("Click Operator");
  if (firstOperand && secondOperand && operator) {
    evaluate();
  }
  operator = buttonId;
  displayValue = "0";
};

buttons.forEach((button) => {
  if (operandButtons.includes(button.id)) {
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
  } else if (button.id === "backspace") {
    button.addEventListener("click", () => {
      dePopulateDisplay();
      addToOperand();
      updateDisplay(displayValue);
    });
  }
});

window.onload = () => {
  updateDisplay(displayValue);
};
