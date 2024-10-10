class Calculator {
    constructor (prevOperandText, currOperandText) {
        this.prevOperandText = prevOperandText
        this.currOperandText = currOperandText
        this.clearAll()
    }

    clearAll() {
        this.previousOperand = ""
        this.currentOperand = ""
        this.operation = undefined
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)

    }

    appendNumber(number) {
        if (number === "." && this.currentOperand.includes(".")) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation) {
        if (this.currentOperand === "") return 
        if (this.previousOperand !== "") {
            this.compute()
        }


        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ""


    }

    compute() {
        let computation 
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)

        if (isNaN(prev) || isNaN(current)) return

        switch (this.operation) {
            case "+": computation = prev + current
            break 
            case "-": computation = prev - current
            break
            case "x": computation = prev * current
            break
            case "÷": computation = prev / current 
            break
            default: return 

        }

        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ""

    }

    getDisplayNumber(number) {

        if (isNaN(number)) {
            return number.toString();
        }


        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split(".")[0])
        const decimalDigits = stringNumber.split(".")[1]
        let integerDisplay 
        if (isNaN(integerDigits)) {
            integerDisplay = ""
        } else {
            integerDisplay = integerDigits.toLocaleString("en", {maximumFractionDigits: 0})
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
        this.currOperandText.innerText = this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
            this.prevOperandText.innerText =
            `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.prevOperandText.innerText = ""
        }
    }


}

const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const prevOperandText = document.querySelector(".prev-operand"); 
const currOperandText = document.querySelector(".curr-operand"); 
const equals = document.getElementById("equals");
const clearAll = document.getElementById("clearAll");
const deletePrev = document.getElementById("deletePrev");


const calculator = new Calculator(prevOperandText, currOperandText)

// Event listeners

numbers.forEach(button => {
    button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
    })
})

operators.forEach(button => {
    button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
    })
})

clearAll.addEventListener("click", button => {
    calculator.clearAll()
    calculator.updateDisplay()
})

equals.addEventListener("click", button => {
    calculator.compute()
    calculator.updateDisplay()
})

deletePrev.addEventListener("click", button => {
    calculator.delete()
    calculator.updateDisplay()
})