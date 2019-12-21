import { Tokenizer } from "./tokenizer";
import Calculator from "./calculator";

const calculator = new Calculator();
console.log(calculator.calc("2*3"));

//  get all button

/*
  2: * /  
  1: + -
  0: (2 * 3 + 5)

  Rule:   Nếu trong >= ngoài -> đẩy ra
          Nếu trong < ngoài -> nhét vô

  Infix -> Postfix
  2 + 5.5 * ( 2 - 3 * ( 4 - 7 )  ) - 1 / 2 + ( 5 - -4 )
  Output  : 2 5.5 2 3 4 7 - * - * + 1 2 / - 5 - 4 - +
  Stack   : 

*/
