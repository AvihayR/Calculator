let buttons = document.querySelectorAll('.buttons');
buttons = Array.from(buttons)

const resultScreen = document.querySelector('.result');
const resultScreenP = resultScreen.querySelector('.result-p')

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
        case "*":
            return multiply(firstNum, secondNum);
            break;
        case "/":
            return divide(firstNum,secondNum);
            break
        case "null":
            return;
    }
};

let numList = [];

function addToResultScreen(e){
    //console.log(e.target.textContent);
    //console.log(isNaN(e.target.textContent))
    if(!isNaN(e.target.textContent)){
    numList.push(e.target.textContent)};
    resultScreenP.textContent = numList;
}

buttons.forEach(button => {
    button.addEventListener('click',addToResultScreen);
});




