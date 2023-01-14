let numButtons = document.querySelectorAll('.num');
numButtons = Array.from(numButtons);

let opButtons = document.querySelectorAll('.op');
opButtons = Array.from(opButtons);

const displayScreen = document.querySelector('.display');
const bottomDisplay = displayScreen.querySelector('.bottom-display');
const topDisplay = displayScreen.querySelector('.top-display');

const equalBtn = document.body.querySelector('.equals');
const clearBtn = document.body.querySelector('.clear');


//Tools that hold actual data:
let numArray = [];
let tools = {
    chosenOperator: undefined,
    numsBeforeOp: null,
    numsAfterOp: null,
    calculatedNum: null,
    isOp: false,
};

//Mathematical operators functions: 
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

//function that adds a clicked number into the calculator's screen
//also stores numbers in tools object according to order (before or after operator)
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
    addOrRemoveDLTButton();
}

numButtons.forEach(button => {
    button.addEventListener('click',populateDisplay);
});


//function for operator buttons - divides nums before the op was chosen and after,
//will call "calculate" function if the operator was chosen already.
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
    numArray.length = 0;
    addOrRemoveDLTButton();
};

opButtons.forEach(button => {
    button.addEventListener('click',operateNums);
})


//cleans calculator's screen - not the same as clear function
function cleanScreen(){
    topDisplay.textContent = "";
    bottomDisplay.textContent = "";
    numArray.length = 0;
};

//runs operate function on stored nums from previous functions, and stores the calculated num in tools.calculatedNum
//stores the data in such a way that the calculator will be functional after one calculate or more
function calculate(first,op,second){
    if(!tools.isOp == true){return};

    for(const tool in tools){
        if(tools[tool] == '' || tools[tool] == null){
            tools[tool] = 0;}};

   tools.calculatedNum = operate(parseFloat(tools.numsBeforeOp),tools.chosenOperator,parseFloat(tools.numsAfterOp)).toString();
   tools.numsBeforeOp = tools.calculatedNum;
   tools.numsAfterOp = null;
   cleanScreen();
   numArray = tools.calculatedNum.split('');
   bottomDisplay.textContent = tools.calculatedNum;
};

//calculateOnce func for not breaking eraseOneNum func while pressing "=" button and trying to erase the result.
function calculateOnce(first,op,second){
    cleanScreen()
    calculate()
    tools.chosenOperator = null;
    tools.isOp = false;
};

equalBtn.addEventListener('click',calculateOnce);

//cleans screen + any data stored in tools object and numArray upon clicking "C" button.
function clear(){
    for(let property in tools){
        tools[property] = null;
    }
    cleanScreen()
};

clearBtn.addEventListener('click',clear)

const bottomDisplayContainer = displayScreen.querySelector('.bottom-display-container');

//erase the last input number 
function eraseOneNum(){
    numArray.pop(numArray.length);
    if(!tools.isOp){
        tools.numsBeforeOp = bottomDisplay.textContent = numArray.join('');
    }else{
        tools.numsAfterOp = bottomDisplay.textContent = numArray.join('');
        tools.calculatedNum = null;
    }
    addOrRemoveDLTButton();
};
//create & renders the delete button to screen upon calling the function , on click runs erase func
//if element rendered already & numArray is empty - removes it from DOM
function addOrRemoveDLTButton(){
    let dltButton = document.createElement('p');
    dltButton.classList.add('dlt-btn')
    dltButton.classList.add('Backspace')
    dltButton.textContent = "⬅";
    if(numArray.length == 0){
        dltButton = bottomDisplayContainer.querySelector('.dlt-btn');
        bottomDisplayContainer.removeChild(dltButton);
    }else if(!bottomDisplayContainer.querySelector('.dlt-btn') & numArray.length != 0 ){
        bottomDisplayContainer.appendChild(dltButton);
        dltButton.addEventListener('click',eraseOneNum);
};
}


//Keyboard support feature: 
//Translates keyup to a click on the right element
const allBtns = document.body.querySelectorAll('button');
function keyboardTranslate(e){
    allBtns.forEach((btn)=>{if(Array.from(btn.classList).includes(e.key)){btn.click()}});
    //dlt-btn support:
    let dltButton = document.querySelector('p.dlt-btn')
    if(Array.from(dltButton.classList).includes(e.key)){dltButton.click()};
}

document.body.addEventListener('keyup',keyboardTranslate)


