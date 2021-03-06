class Calculator {
    constructor(previousOperandElement, currentOperandElement) {
        this.previousOperandElement = previousOperandElement;
        this.currentOperandElement = currentOperandElement;
        this.readyToReset = false;
        this.clear();
    }

    clear() {
        this.previousOperand = '';
        this.currentOperand = '';
        this.operation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number) {
        if (number == '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute() {
        let result;
        const firstOperand = parseFloat(this.previousOperand);
        const secondOperand = parseFloat(this.currentOperand);
        if (isNaN(firstOperand) || isNaN(secondOperand)) return;

        if (!Number.isInteger(firstOperand) && !Number.isInteger(secondOperand)) {
            result = this.fixDecimal(firstOperand, secondOperand);
        } else {
            switch(this.operation) {
                case '÷':
                    result = firstOperand / secondOperand;
                    break;
                case '×':
                    result = firstOperand * secondOperand;
                    break;
                case '-':
                    result = firstOperand - secondOperand;
                    break;
                case '+':
                    result = firstOperand + secondOperand;
                    break;
                case '^':
                    result = Math.pow(firstOperand,secondOperand);
                    break;
                default:
                    return;
            }
        }
        this.readyToReset = true;
        this.currentOperand = result;
        this.operation = undefined;
        this.previousOperand = '';
    }

    fixDecimal(a, b) {
        const aDecimalDigits = a.toString().split('.')[1].length;
        const bDecimalDigits = b.toString().split('.')[1].length;
        const aMultiplier = Math.pow(10, aDecimalDigits);
        const bMultiplier = Math.pow(10, bDecimalDigits);
        let n;
        if (aMultiplier > bMultiplier) {
            n = aMultiplier;
        } else {
            n = bMultiplier;
        }
        let result;
        switch(this.operation) {
            case '÷':
                result = (a * n) / (b * n);
                break;
            case '×':
                result = ((a * n) * (b * n)) / (n * n);
                break;
            case '-':
                result = ((a * n) - (b * n)) / n;
                break;
            case '+':
                result = ((a * n) + (b * n)) / n;
                break;
            case '^':
                result = Math.pow(a, b);
                break;
            default:
                return;
        }
        return result;
    }

    getSquareRoot() {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        const num = parseFloat(this.currentOperand);
        const result = Math.sqrt(num);
        if (isNaN(result)) {
            alert('It is impossible to find the square root of negative number!');
        }
        this.readyToReset = true;
        this.currentOperand = result;
        this.previousOperand = '';
    }

    makeNegative() {
        if (this.currentOperand === '') return;
        this.currentOperand *= -1;
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
        
    }

    updateDisplay() {
        this.currentOperandElement.innerText = this.getDisplayNumber(this.currentOperand);
        if (this.operation != null) {
            this.previousOperandElement.innerText =
             `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        } else {
            this.previousOperandElement.innerText = '';
        }
    }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const squareRootButton = document.querySelector('[data-square-root]');
const plusMinusButton = document.querySelector('[data-plus-minus]');
const equalsButton = document.querySelector('[data-equals]');
const allClearButton = document.querySelector('[data-all-clear]');
const deleteButton = document.querySelector('[data-delete]');
const previousOperandElement = document.querySelector('[data-previous-operand]');
const currentOperandElement = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandElement, currentOperandElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (calculator.previousOperand === '' &&
            calculator.currentOperand !== '' &&
            calculator.readyToReset) {
                calculator.currentOperand = '';
                calculator.readyToReset = false;
        }
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

squareRootButton.addEventListener('click', () => {
    calculator.getSquareRoot();
    calculator.updateDisplay();
})

plusMinusButton.addEventListener('click', () => {
    calculator.makeNegative();
    calculator.updateDisplay();
})

equalsButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
})

allClearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
})
