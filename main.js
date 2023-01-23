const keys = document.querySelectorAll('.key')
const inputValue = document.querySelector('.display .input')
const output = document.querySelector('.display .output')
const icon = document.querySelector('.mode')
const body = document.querySelector('body')
const container = document.querySelector('.container')
const display = document.querySelector('.display')
const keysBackground = document.querySelector('.keys')
const keyEl = document.querySelectorAll('.key')

let input = ''

keys.forEach(key => {
    const value = key.dataset.key

    key.addEventListener('click', () => {
        if(value === 'clear'){
            input = ''
            inputValue.innerHTML = ''
            output.innerHTML = ''
        }
        else if(value === 'delete'){
            input = input.slice(0, -1);
            inputValue.innerHTML = input
        }
        else if(value === '='){
            let result = eval(prepareInput(input))
            output.innerHTML = cleanOutput(result)
        }
        else if(value === 'brackets'){
            if(
                input.indexOf('(') === -1 ||
                input.indexOf('(') !== -1 &&
                input.indexOf(')') !== -1 &&
                input.lastIndexOf('(') < input.lastIndexOf(')')
            ){
                input += '('
            } else if(
                input.indexOf('(') !== -1 &&
                input.indexOf(')') === -1 ||
                input.indexOf('(') !== -1 &&
                input.indexOf(')') !== -1 &&
                input.lastIndexOf('(') < input.lastIndexOf(')')
            ){
                input += ')'
            }

            inputValue.innerHTML = cleanInput(input)
        }

        else{
            if(inputValidation(value)){
                input += value
                inputValue.innerHTML = cleanInput(input)
            }
        }
    })
})


function cleanInput(input){
    let inputArray = input.split('')
    let inputArrayLength = inputArray.length

    for (let i = 0; i < inputArrayLength; i++){
        if (inputArray[i] === '+'){
            inputArray[i] = `<span class="operator">+</span>`
        }
        else if (inputArray[i] === '-'){
            inputArray[i] = `<span class="operator">-</span>`
        }
        else if (inputArray[i] === '/'){
            inputArray[i] = `<span class="operator">÷</span>`
        }
        else if (inputArray[i] === '*'){
            inputArray[i] = `<span class="operator">×</span>`
        }
        else if (inputArray[i] === '('){
            inputArray[i] = `<span class="brackets">(</span>`
        }
        else if (inputArray[i] === ')'){
            inputArray[i] = `<span class="brackets">)</span>`
        }
        else if (inputArray[i] === '%'){
            inputArray[i] = `<span class="percentage">%</span>`
        }
    }
    return inputArray.join('')
}

function cleanOutput (output) {
    let outputString = output.toString();
    let decimal = outputString.split('.')[1];
    outputString = outputString.split('.')[0];

    let outputArray = outputString.split('');

    if(outputArray.length > 3){
        for(let i = outputArray.length - 3; i > 0; i -= 3){
           outputArray.splice(i, 0, ',') 
        }
    }

    if(decimal){
        outputArray.push('.')
        outputArray.push(decimal)
    }

    return outputArray.join('')
}

function inputValidation(value){
    let lastInput = input.slice(-1);
    let operators = ['+', '-', '*', '/']

    if(lastInput === '.' && value === '.'){
        return false
    }

    if(operators.includes(value)){
        if(operators.includes(lastInput)){
            return false
        }else{
            return true
        }
    }

    return true
}

function prepareInput (input){
    let inputArray = input.split('')

    for (let i = 0; i < inputArray.length; i++){
        if(inputArray[i] === '%'){
            inputArray[i] = '/100'
        }
    }
    return inputArray.join('')
}

icon.addEventListener('click', () => {
    icon.classList.toggle('active')
    body.classList.toggle('active')
    container.classList.toggle('active')
    display.classList.toggle('active')
    inputValue.classList.toggle('active')
    keysBackground.classList.toggle('active')
    keys.forEach(key => key.classList.toggle('active'));

    if(icon.classList.contains('fa-moon')){
        icon.classList.replace('fa-moon', 'fa-sun')
    } 
    else{
        icon.classList.replace('fa-sun', 'fa-moon')
    }
})