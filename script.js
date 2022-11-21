let numButtons = document.querySelectorAll('.num');
numButtons = Array.from(numButtons);

let opButtons = document.querySelectorAll('.op');
opButtons = Array.from(opButtons);

const displayScreen = document.querySelector('.display');
const resultScreenP = displayScreen.querySelector('.result-p');
const topResult = displayScreen.querySelector('.top-result');

function add(firstNum,secondNum){
    return firstNum + secondNum;
};

function subtract(firstNum,secondNum){
    return firstNum - secondNum;
};

function multiply(firstNum,secondNum){
    return firstNum * secondNum;
};

function divide(firstNum,secondNum){
    return firstNum / secondNum;
};

function operate(func,firstNum,secondNum){
    switch(func){
        case "+":
            return add(firstNum,secondNum);
            break;
        case "-":
            return subtract(firstNum,secondNum);
            break;
        case "X":
            return multiply(firstNum, secondNum);
            break;
        case "/":
            return divide(firstNum,secondNum);
            break
        case "null":
            return;
    }
};


let numArray = [];

function addToResultScreen(e){
    if(numArray.includes(".") && e.target.textContent == "."){
        return}else{
    numArray.push(e.target.textContent)};
    resultScreenP.textContent = numArray.join("");
}

numButtons.forEach(button => {
    button.addEventListener('click',addToResultScreen);
});

function clearNumArray(){
   numArray.length = 0;
   resultScreenP.textContent = "";
};

let chosenOperator;
let numsBeforeOp;
let numsAfterOp = numArray;

function operateNums(e){
    chosenOperator = e.target.textContent;
    numsBeforeOp = numArray.join("");
    topResult.textContent = (numsBeforeOp + chosenOperator);
    clearNumArray();
};

opButtons.forEach(button => {
    button.addEventListener('click',operateNums);
})



