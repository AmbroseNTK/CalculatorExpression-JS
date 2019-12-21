const TokenType = {
  Operand: "operand",
  Operator: "operator",
  LParent: "(",
  RParent: ")"
};

const Token = function(data, type) {
  this.data = data;
  this.type = type;
};

const Tokenizer = function() {};

Tokenizer.prototype.run = function(rawInput = "", error) {
  let output = [];

  const operatorTokens = "+-*/";

  function isNumber(chr = "") {
    return chr !== "" && chr.charCodeAt(0) >= 48 && chr.charCodeAt(0) <= 57;
  }

  let i = 0;
  while (i < rawInput.length) {
    let starting = rawInput[i];
    let rawToken = "";
    if (isNumber(starting)) {
      let j = i + 1;
      let countPeriod = 0;
      rawToken = starting;
      while (j < rawInput.length) {
        let current = rawInput[j];
        if (isNumber(current)) {
          rawToken += current;
        } else if (current === ".") {
          if (countPeriod < 1) {
            rawToken += ".";
            countPeriod++;
          } else {
            error("Too many periods");
            return [];
          }
        } else {
          i = j + 1;
          break;
        }
        j++;
      }
      output.push({
        data: parseFloat(rawToken),
        type: TokenType.Operand
      });
      i = j - 1;
    } else if (operatorTokens.includes(starting)) {
      // Operators
      output.push({
        data: starting,
        type: TokenType.Operator
      });
    } else if (starting === "(" || starting === ")") {
      output.push({
        data: starting === "(" ? "(" : ")",
        type: starting === "(" ? TokenType.LParent : TokenType.RParent
      });
    }
    i++;
  }

  return output;
};

module.exports = {
  TokenType: TokenType,
  Token: Token,
  Tokenizer: Tokenizer
};
