const display = document.getElementById("display");
let currentInput = "0";
let firstNumber = null;
let selectedOperator = null;
let waitingForSecondNumber = false;

function updateDisplay(){
    display.textContent = currentInput;
}

function enterNumber(number){
    console.log("Number: ",number);
    console.log("Waiting",waitingForSecondNumber);
    if (currentInput === "0" || waitingForSecondNumber){
        currentInput = number;
        waitingForSecondNumber = false;
    }else {
        currentInput = currentInput + number;
    }
    updateDisplay();
}

function enterDecimal(){
    if(waitingForSecondNumber){
        currentInput = "0";
        waitingForSecondNumber = false;
    }
    if(!currentInput.includes("decimal")){
        currentInput = currentInput + ".";
    }
    updateDisplay();
}


function chooseOperator(operator){
    console.log("operator selected: ", operator)
   const inputValue = Number(currentInput);
   if(selectedOperator !== null && waitingForSecondNumber){
    selectedOperator = operator;
    return;
   }
   if(firstNumber === null){
    firstNumber = inputValue;
   } else if(selectedOperator !== null){
    const result = calculate(firstNumber, inputValue, selectedOperator);
    currentInput = String(result);
    firstNumber = result;
   }
   selectedOperator = operator;
   waitingForSecondNumber = true;
   updateDisplay();

}

function calculate(firstNumber, secondNumber, operator){
    if(operator === "add"){
        return firstNumber + secondNumber;

    } else if(operator === "subtract"){
        return firstNumber - secondNumber;

    } else if(operator === "multiply"){
        return firstNumber * secondNumber;

    } else if(operator === "divide"){
        if(secondNumber === 0){
            return "Error";
        }
        return firstNumber/secondNumber;

    } else if(operator === "per"){
        return (firstNumber*secondNumber)/100;
    }
    return secondNumber;
}

function showResult(){
    console.log("First number: ", firstNumber);
    console.log("Current Inp",currentInput);
    console.log("OP",selectedOperator);
    if(selectedOperator === null || waitingForSecondNumber){
        return;
    }
    const secondNumber = Number(currentInput)
    const result = calculate(firstNumber, secondNumber,selectedOperator);
    currentInput = String(result);
    firstNumber = null;
    selectedOperator = null;
    waitingForSecondNumber = true;
    updateDisplay();
}

function clearCalculator(){
    currentInput = "0";
    firstNumber = null;
    selectedOperator = null;
    waitingForSecondNumber = false;
    updateDisplay();
}

function deleteNumber(){
    if(waitingForSecondNumber){
        return;
    }
    if(currentInput.length === 1 || currentInput === "Error"){
        currentInput = "0";
    } else {
        currentInput = currentInput.slice(0, -1);
    }
    updateDisplay();
}

function playClick(){
    const audioContent = new AudioContext();
    const osillator = audioContent.createOscillator();
    const gain = audioContent.createGain();
    osillator.connect(gain);
    gain.connect(audioContent.destination);
    osillator.frequency.value = 200;
    gain.gain.value = 0.05;
    osillator.start();
    osillator.stop(audioContent.currentTime + 0.05);
}

document.querySelector(".buttons").addEventListener("click", function(event){
    console.log("Button clicked!");
    playClick();
    const button = event.target.closest("button");
    if(!button){
        return;
    }
    const number = button.dataset.number;
    if(number !== undefined){
        enterNumber(number);
    }
    const operator = button.dataset.operator;
    if (operator !== undefined){
        chooseOperator(operator);
    }
    const action = button.dataset.action;
    if (action === "equals"){
        showResult();
    } else if(action === "clear"){
        clearCalculator();
    } else if(action === "delete"){
        deleteNumber();
    } else if(action == "decimal"){
        enterDecimal();
    }
});
updateDisplay();
console.log("JavaScript is running!");

