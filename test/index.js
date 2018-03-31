const Word2Vec = require('../lib');

const model = Word2Vec.load('./data/vectors.json');

console.log(model.analogy({ positive: ['서울', '일본'], negative: ['한국'] }, 5));
console.log(model.findDifference(['봄', '여름', '가을', '얼음']));
console.log(model.getVector('대한민국').distance(model.getVector('한국')));
