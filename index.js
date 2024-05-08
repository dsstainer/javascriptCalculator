function clear_text() {
    input_text = document.querySelector('.input-window');
    output_text = document.querySelector('.output-window')

    input_text.value = '';
    output_text = '';
}

document.addEventListener('DOMContentLoaded', clear_text);

function append(button)  {
    let item = button.innerText;
    input_text = document.querySelector('.input-window');
    if (!input_text.value) {
    input_text.value = item;
    } else{
        input_text.value += item;
    }
}

function backspace()  {
    input_text = document.querySelector('.input-window');
    input = input_text.value;
    if (input_text.value) {
    input_text.value = input.substring(0, input.length-1);
    }
}

function tokenise(str) {
    return str.match(/\d+|[+-/()*]/g)
}



function execute() {
    input_text = document.querySelector('.input-window');
    output_text = document.querySelector('.output-window');
    token_stream = tokenise(input_text.value)
    rpn_stream = infix_to_rpn(token_stream)
    answer = rpn_to_number(rpn_stream)
    output_text.value = answer
    input_text.value = ''
}

function infix_to_rpn(arr){
    output_arr = []
    operator_stack = []
    for (let i = 0; i < arr.length; i++){
        if (arr[i].match(/\d+/)) {
            output_arr.push(arr[i])
        } 
        if (arr[i].match(/[+-]/)){
            if (operator_stack.length>0){
                if (operator_stack[operator_stack.length-1].match(/[+-/*]/)){
                    op = operator_stack.pop()
                    output_arr.push(op)
                }
            }
            operator_stack.push(arr[i])
        }
        if (arr[i].match(/[*/]/)){
            if (operator_stack.length >0) {
                if (operator_stack[operator_stack.length-1].match(/[/*]/)){
                    op = operator_stack.pop()
                    output_arr.push(op)
                }
            }
            operator_stack.push(arr[i])
        }
        if (arr[i].match(/\(/)){
            operator_stack.push(arr[i])
        }
        if (arr[i].match(/\)/)){
                while (!operator_stack[operator_stack.length-1].match(/\(/)){
                    op = operator_stack.pop()
                    output_arr.push(op)
                }
            operator_stack.pop()
        }
    }
    while (operator_stack.length >0) {
        op = operator_stack.pop()
        output_arr.push(op)
    }
    return output_arr
}

function rpn_to_number(rpn){
    stack = []
    answer = 0
    for (let i = 0; i < rpn.length; i++){
        if(rpn[i].match(/\d+/)){
            stack.push(Number(rpn[i]))
        } else{
                op2 = stack.pop();
                op1 = stack.pop();
                switch (rpn[i]) {
                    case '+':
                        res = op1+op2
                        break;
                    case '-':
                        res = op1-op2
                        break;
                    case '*':
                        res = op1*op2
                        break;
                    case '/':
                        res = op1/op2
                        break;
                }
                stack.push(res)
            }
        
    }
    answer = stack.pop()
    return answer.toString()
}