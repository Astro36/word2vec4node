const fs = require('fs');
const word2vec = require('bindings')('word2vec').default;

const Vector = require('./Vector');

class Word2Vec {
  constructor(vectors, size = -1) {
    this.vectors = vectors;
    if (size > 0) {
      this.size = size;
    } else {
      this.size = Object.values(vectors)[0].valueOf().length;
    }
  }

  static load(file) {
    const content = fs.readFileSync(file).toString();
    const lines = content.split('\n');
    const vectors = {};
    const size = lines.shift().split(' ')[1];
    for (let i = 0, len = lines.length; i < len; i += 1) {
      const line = lines[i];
      if (line) {
        const values = lines[i].split(' ');
        const text = values.shift();
        vectors[text] = new Vector(values.slice(0, size));
      }
    }
    return new Word2Vec(vectors, size);
  }

  static train(inputFile, outputFile, {
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

  /**
   * @param {Object.<Array>} texts
   * @param {Array.<string>} texts.positive
   * @param {Array.<string>} texts.negative
   * @param {number} amount
   * @returns {Array.<Vector>}
   */
  analogy({ positive = [], negative = [] }, amount = 1) {
    const { vectors, size } = this;
    const getVector = texts => texts.map(value => this.getVector(value) || Vector.ones(size));
    const inputVectors = [
      ...getVector(positive),
      ...getVector(negative).map(value => value.negative()),
    ];
    return Object.entries(vectors)
      .map(([text, vector]) => [
        text,
        vector,
        inputVectors.map(value => value.similarity(vector)).reduce((numA, numB) => numA + numB),
      ])
      .sort((a, b) => b[2] - a[2])
      .slice(1, amount + 1)
      .map(([text, vector]) => ({ text, vector }));
  }

  /**
   * @param {string} text
   * @returns {Vector}
   */
  getVector(text) {
    const { vectors } = this;
    if (text in vectors) {
      return vectors[text];
    }
    return null;
  }
}

module.exports = Word2Vec;
