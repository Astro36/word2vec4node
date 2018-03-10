const Word2Vec = require('../lib');

const model = Word2Vec.load('vectors.txt');

console.log(model.analogy({ positive: ['한국(Noun)'] }, 10));
console.log(model.getVector('미국(Noun)').distance(model.getVector('한국(Noun)')));
