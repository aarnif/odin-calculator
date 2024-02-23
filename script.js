let firstNumber = "";
let secondNumber = "";
let operator = "";

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

firstNumber = "1";
secondNumber = "2";
console.log(operate("+", firstNumber, secondNumber)); // 3
console.log(operate("-", firstNumber, secondNumber)); // -1
console.log(operate("*", firstNumber, secondNumber)); // 2
console.log(operate("/", firstNumber, secondNumber)); // 0.5
