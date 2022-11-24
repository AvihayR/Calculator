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
let displayNumber


let tools = {
    chosenOperator: undefined,
    numsBeforeOp: null,
    numsAfterOp: null,
};

function populateDisplay(e){
    if(numArray.includes(".") && e.target.textContent == "."){
        return; 
    }else{
    numArray.push(e.target.textContent)};
    tools.numsAfterOp = bottomDisplay.textContent = numArray.join("");
    
}

numButtons.forEach(button => {
    button.addEventListener('click',populateDisplay);
});


function operateNums(e){
    tools.chosenOperator = e.target.textContent;
    tools.numsBeforeOp = numArray.join("");
    numArray.length = 0;
    topDisplay.textContent = (tools.numsBeforeOp + tools.chosenOperator);
    
};


opButtons.forEach(button => {
    button.addEventListener('click',operateNums);
})



