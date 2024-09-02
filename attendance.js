const nerdamer = require('nerdamer/all');

// تعريف التعبير
const expr = '(x - 1) / x / ((x - 1) / x - 1)';

// تبسيط التعبير
const simplifiedExpr = nerdamer(expr).simplify().toString();

console.log(simplifiedExpr); // عرض التعبير المبسط
