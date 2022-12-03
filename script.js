let numButtons = document.querySelectorAll('.num');
numButtons = Array.from(numButtons);

let opButtons = document.querySelectorAll('.op');
opButtons = Array.from(opButtons);

const displayScreen = document.querySelector('.display');
const bottomDisplay = displayScreen.querySelector('.bottom-display');
const topDisplay = displayScreen.querySelector('.top-display');

const equalBtn = document.body.querySelector('.equals');
const clearBtn = document.body.querySelector('.clear');


let numArray = [];

let tools = {
    chosenOperator: undefined,
    numsBeforeOp: null,
    numsAfterOp: null,
    calculatedNum: null,
    isOp: false,
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
    }else if(tools.isOp == true){
        numArray.push(e.target.textContent);
        tools.numsAfterOp = bottomDisplay.textContent = numArray.join("");
    }else{
        numArray.push(e.target.textContent);
        tools.numsBeforeOp = bottomDisplay.textContent = numArray.join("");
    }
}

numButtons.forEach(button => {
    button.addEventListener('click',populateDisplay);
});


function operateNums(e){
    if(tools.numsAfterOp == null && tools.isOp == true){
        tools.chosenOperator = e.target.textContent;
        topDisplay.textContent = (tools.numsBeforeOp + tools.chosenOperator);
    }
    else if(tools.numsBeforeOp == null){
        tools.numsBeforeOp = 0;
    }
    else if(tools.numsBeforeOp != null && tools.isOp == true && tools.numsAfterOp != null){
        calculate();
        cleanScreen()
        numArray.length = 0;
        tools.chosenOperator = e.target.textContent;
        topDisplay.textContent = (tools.numsBeforeOp + tools.chosenOperator);
    }
    else if(tools.chosenOperator != null){
        tools.chosenOperator = e.target.textContent;
        topDisplay.textContent = (tools.numsBeforeOp + tools.chosenOperator);
        numArray.length = 0;
        bottomDisplay.textContent = "";
        calculate();
    }else{
    tools.chosenOperator = e.target.textContent;
    numArray.length = 0;
    topDisplay.textContent = (tools.numsBeforeOp + tools.chosenOperator);
    bottomDisplay.textContent = "";
    tools.isOp = true;

    };
    
};

opButtons.forEach(button => {
    button.addEventListener('click',operateNums);
})

function cleanScreen(){
    topDisplay.textContent = "";
    bottomDisplay.textContent = "";
    numArray.length = 0;
    numArray.push(tools.calculatedNum);
}

function calculate(first,op,second){
   tools.calculatedNum = operate(parseFloat(tools.numsBeforeOp),tools.chosenOperator,parseFloat(tools.numsAfterOp)).toString();
   tools.numsBeforeOp = tools.calculatedNum;
   tools.chosenOperator = null;
   tools.numsAfterOp = null;
   bottomDisplay.textContent = tools.calculatedNum;
   cleanScreen();
   numArray.length = 0;
   bottomDisplay.textContent = tools.calculatedNum;
}

equalBtn.addEventListener('click',calculate);


function clear(){
    for(let property in tools){
        tools[property] = null;
    }
    cleanScreen()
};

clearBtn.addEventListener('click',clear)







