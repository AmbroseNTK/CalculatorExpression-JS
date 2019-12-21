import { Tokenizer, TokenType } from "./tokenizer";
import Stack from "./stack";

const Calculator = function() {};

Calculator.prototype.toPostfix = function(tokens = []) {
  let stack = new Stack();
  let result = [];
  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i].type === TokenType.Operand) result.push(tokens[i]);
    else {
      if (tokens[i].type === TokenType.Operator) {
        if (stack.isEmpty()) {
          stack.push(tokens[i]);
        } else {
          while (
            !stack.isEmpty() &&
            this.getOrder(tokens[i]) <= this.getOrder(stack.getTop())
          ) {
            result.push(stack.pop().data);
          }
          stack.push(tokens[i]);
        }
      } else {
        if (tokens[i].type === TokenType.LParent) stack.push(tokens[i]);
        else {
          if (tokens[i].type === TokenType.RParent) {
            while (stack.getTop().type !== TokenType.LParent) {
              result.push(stack.pop().data);
            }
            stack.pop();
          }
        }
      }
    }
  }
  while (!stack.isEmpty()) {
    result.push(stack.pop().data);
  }
  return result;
};

Calculator.prototype.getOrder = function(token) {
  if ("*/".includes(token.data)) return 2;
  if ("+-".includes(token.data)) return 1;
  return 0;
};

Calculator.prototype.calc = function(rawInput) {
  const tokenizer = new Tokenizer();
  let tokens = tokenizer.run(rawInput);
  let postfix = this.toPostfix(tokens);
  console.log(postfix);
  let stack = new Stack();
  for (let i = 0; i < postfix.length; i++) {
    if (postfix[i].type === TokenType.Operand) {
      stack.push(postfix[i].data);
    } else {
      if (postfix[i].type === TokenType.Operator) {
        switch (postfix[i].data) {
          case "+":
            stack.push(stack.pop().data + stack.pop().data);
            break;
          case "-":
            let op1 = stack.pop().data;
            stack.push(stack.pop().data - op1);
            break;
          case "*":
            stack.push(stack.pop().data * stack.pop().data);
            break;
          case "/":
            op1 = stack.pop().data;
            if (op1 !== 0) {
              stack.push(stack.pop().data / op1);
            }
            break;
          default:
        }
      }
    }
  }

  return stack.pop().data;
};

module.exports = Calculator;
