let intBuffer = 0;
let runningTotal = 0;
let previousOperator = null;
const screen = document.querySelector(".screen");

const buttonClick = (value) => {
  if (isNaN(parseInt(value))) {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
  updateScreen(intBuffer);
};

const handleNumber = (value) => {
  if (intBuffer === 0) {
    intBuffer = value;
  } else {
    intBuffer += value;
  }
};

const handleSymbol = (value) => {
  switch (value) {
    case "C":
      intBuffer = 0;
      break;
    case "←":
      if (intBuffer.length === 1) {
        intBuffer = 0;
      } else {
        intBuffer = intBuffer.substring(0, intBuffer.length - 1);
      }
      break;
    case "+":
    case "-":
    case "×":
    case "÷":
      handleMath(value);
      break;
    case "=":
      if (previousOperator === null) {
        return;
      }
      flushOperation(parseInt(intBuffer));
      previousOperator = null;
      intBuffer = +runningTotal;
      runningTotal = 0;
      break;
  }
};

const handleMath = (value) => {
  if (intBuffer === 0) {
    return;
  }
  const intBufferValue = parseInt(intBuffer);
  if (runningTotal === 0) {
    runningTotal = intBufferValue;
  } else {
    flushOperation(intBufferValue);
  }
  previousOperator = value;
  intBuffer = 0;
};

const flushOperation = (intBufferValue) => {
  if (previousOperator === "+") {
    runningTotal += intBufferValue;
  } else if (previousOperator === "-") {
    runningTotal -= intBufferValue;
  } else if (previousOperator === "×") {
    runningTotal *= intBufferValue;
  } else if (previousOperator === "÷") {
    runningTotal /= intBufferValue;
  }
};

function start() {
  console.log("starting the calc");
  document.querySelector(".calculator").addEventListener("click", (event) => {
    buttonClick(event.target.innerText);
  });
}

function updateScreen() {
  screen.innerText = intBuffer;
}

start();
