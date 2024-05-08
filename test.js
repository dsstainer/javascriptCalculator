str = '5-3'
tokenised_str = tokenise(str)
console.log(tokenised_str)
rpn = infix_to_rpn(tokenised_str)
console.log(rpn)
ans = rpn_to_number(rpn)
console.log(ans)
function tokenise(str) {
return str.match(/\d+|[+-/()*]/g)
}

function infix_to_rpn(arr){
    output_arr = []
    operator_stack = []
    for (let i = 0; i < arr.length; i++){
        console.log(operator_stack)
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