const word2vec = require('bindings')('word2vec');

module.exports = {
  word2vec: word2vec.default,
};
