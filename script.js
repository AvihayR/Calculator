let numButtons = document.querySelectorAll('.num');
numButtons = Array.from(numButtons);

let opButtons = document.querySelectorAll('.op');
opButtons = Array.from(opButtons);

const displayScreen = document.querySelector('.display');
const bottomDisplay = displayScreen.querySelector('.bottom-display');
const topDisplay = displayScreen.querySelector('.top-display');

const equalBtn = document.body.querySelector('.equals');


let numArray = [];

let tools = {
    chosenOperator: undefined,
    numsBeforeOp: null,
    numsAfterOp: null,
    calculatedNum: null,
};


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

function operate(firstNum,op,secondNum){
    switch(op){
        case "+":
            return add(firstNum,secondNum);
            break;
        case "-":
            return subtract(firstNum,secondNum);
            break;
        case "x":
            return multiply(firstNum, secondNum);
            break;
        case "/":
            return divide(firstNum,secondNum);
            break
        case "null":
            return;
    }
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


function cleanScreen(){
    topDisplay.textContent = "";
    bottomDisplay.textContent = "";
    numArray = tools.calculatedNum;
}

function calculate(first,op,second){
   tools.calculatedNum = operate(parseInt(tools.numsBeforeOp),tools.chosenOperator,parseInt(tools.numsAfterOp));
   tools.calculatedNum = tools.calculatedNum.toString();
   tools.numsBeforeOp = tools.calculatedNum;
   tools.chosenOperator = null;
   tools.numsAfterOp = null;
   cleanScreen();
   numArray.length = 0;
   bottomDisplay.textContent = tools.calculatedNum;

   numArray = tools.calculatedNum.split('');
}

equalBtn.addEventListener('click',calculate);



