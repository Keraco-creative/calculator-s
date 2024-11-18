const output = document.getElementById("output"); 
const calcForm = document.getElementById("calc-form");
const operandBtns = document.querySelectorAll("button[data-type='operand']");
const operatorBtns = document.querySelectorAll("button[data-type='operator']");
const acBtn = document.querySelector("button[data-type='clear']");

let currentValue = '0'; 
let previousValue = ''; 
let operator = ''; 
let isOperatorPressed = false; 

function updateDisplay() {
    output.value = currentValue;
}

operandBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
        const value = e.target.value;
        
        
        if (currentValue === '0' || isOperatorPressed) {
            currentValue = value;
            isOperatorPressed = false; 
        } else {
            currentValue += value; 
        }
        updateDisplay();
    });
});

operatorBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
        const selectedOperator = e.target.value;
        
        if (isOperatorPressed) {
            operator = selectedOperator;
            return; 
        }

        if (previousValue !== '' && operator !== '') {
            currentValue = evaluate(previousValue, currentValue, operator);
            previousValue = currentValue; 
        } else {
            previousValue = currentValue; 
        }
        
        operator = selectedOperator; 
        isOperatorPressed = true; 
        updateDisplay();
    });
});

acBtn.addEventListener("click", () => {
    currentValue = '0'; 
    previousValue = ''; 
    operator = ''; 
    isOperatorPressed = false; 
    updateDisplay();
});

function evaluate(previous, current, operator) {
    previous = parseFloat(previous);
    current = parseFloat(current);
    
    switch (operator) {
        case '+':
            return previous + current;
        case '-':
            return previous - current;
        case '*':
            return previous * current;
        case '/':
            if (current === 0) {
                return 'Error'; 
            }
            return previous / current;
        case '%':
            return previous % current;
        case 'invert':
            return -current; 
        case '=':
            return current; 
        default:
            return current;
    }
}
