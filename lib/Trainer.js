const { default: word2vec } = require('bindings')('word2vec');

class Trainer {
  static run(inputFile, outputFile, {
    size = 100,
    alpha = 0.025,
    window = 5,
    minCount = 5,
    sample = 1E-3,
    workers = 12,
    hs = false,
    negative = 5,
    iter = 5,
    type = 'cbow',
  } = {}) {
    word2vec(
      inputFile, outputFile, size, alpha, window,
      minCount, sample, workers, Number(hs), negative,
      iter, Number(type === 'cbow'),
    );
  }
}

module.exports = Trainer;
