let numButtons = document.querySelectorAll('.num');
numButtons = Array.from(numButtons);

let opButtons = document.querySelectorAll('.op');
opButtons = Array.from(opButtons);

const displayScreen = document.querySelector('.display');
const bottomDisplay = displayScreen.querySelector('.bottom-display');
const topDisplay = displayScreen.querySelector('.top-display');

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
let usedNums = {
    chosenOperator: undefined,
    numsBeforeOp: null,
    numsAfterOp: [],
};

function addToBottomDisplay(e){
    if(numArray.includes(".") && e.target.textContent == "."){
        return;}
        else{
    numArray.push(e.target.textContent)};
    bottomDisplay.textContent = numArray.join("");
}

numButtons.forEach(button => {
    button.addEventListener('click',addToBottomDisplay);
});

//function clearNumArray(){
  // numArray.length = 0;
  // resultScreenP.textContent = "";
//};

function operateNums(e){
    usedNums.chosenOperator = e.target.textContent;
    usedNums.numsBeforeOp = numArray.join("");
    topDisplay.textContent = (usedNums.numsBeforeOp + usedNums.chosenOperator);
};

opButtons.forEach(button => {
    button.addEventListener('click',operateNums);
})



