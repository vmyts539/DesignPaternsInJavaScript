let TokenType = Object.freeze({
  integer: 0,
  plus: 1,
  minus: 2,
  lparen: 3,
  rparen: 4,
});

class Token {
  constructor(type, text) {
    this.type = type;
    this.text = text;
  }

  toString() {
    return `\`${this.text}\``;
  }
}

function lex(input) {
  let result = [];

  for (let i = 0; i < input.length; ++i) {
    switch (input[i]) {
      case "+":
        result.push(new Token(TokenType.plus, "+"));
        break;
      case "-":
        result.push(new Token(TokenType.minus, "-"));
        break;
      case "(":
        result.push(new Token(TokenType.lparen, "("));
        break;
      case ")":
        result.push(new Token(TokenType.rparen, ")"));
        break;
      default:
        let buffer = [input[i]];
        for (let j = i + 1; j < input.length; ++j) {
          if ("0123456789".includes(input[j])) {
            buffer.push(input[j]);
            ++i;
          } else {
            result.push(new Token(TokenType.integer, buffer.join("")));
            break;
          }
        }
        break;
    }
  }

  return result;
}

let input = "(13+4)-(12+1)";
let tokens = lex(input);
console.log(tokens.join("   "));
