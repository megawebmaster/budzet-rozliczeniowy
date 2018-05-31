import { Parser } from 'expr-eval';

const parser = new Parser({
  allowMemberAccess: false,
  operators: {
    add: true,
    comparison: false,
    concatenate: false,
    conditional: false,
    divide: true,
    factorial: false,
    logical: false,
    multiply: true,
    power: false,
    remainder: false,
    subtract: true,
    sin: false,
    cos: false,
    tan: false,
    asin: false,
    acos: false,
    atan: false,
    sinh: false,
    cosh: false,
    tanh: false,
    asinh: false,
    acosh: false,
    atanh: false,
    sqrt: false,
    log: false,
    ln: false,
    lg: false,
    log10: false,
    abs: false,
    ceil: false,
    floor: false,
    round: false,
    trunc: false,
    exp: false,
    length: false,
    in: false
  }
});

export const validate = (value, { editing }) => {
  if (editing) {
    throw new Error();
  }

  try {
    const formula = value.toString().replace(/,/g, '.').replace(/ /g, '');

    return parser.parse(formula).evaluate();
  } catch(e) {
    throw new Error('validation.price.invalid');
  }
};
