/* Word2Vec4Node
Copyright (C) 2018  Astro

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>. */

/** @module word2vec4node/Word2Vec */

const fs = require('fs');
const os = require('os');
const word2vec = os.EOL === '\n' ? require('bindings')('word2vec').default : null; // Only POSIX

const Vector = require('./Vector');

/** @class */
class Word2Vec {
  /**
   * @param {Object.<string, Vector>} vectors
   * @param {number} [size]
   */
  constructor(vectors, size = -1) {
    this.vectors = vectors;
    if (size > 0) {
      this.size = size;
    } else {
      this.size = Object.values(vectors)[0].valueOf().length;
    }
  }

  /**
   * @static
   * @param {string} file
   * @returns {Word2Vec}
   */
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

  /**
   * @static
   * @param {Object.<string, Array.<number>>} obj
   * @returns {Word2Vec}
   */
  static parse(obj) {
    const objArray = Object.entries(obj);
    const vectors = {};
    const size = objArray[0][1].length;
    for (let i = 0, len = objArray.length; i < len; i += 1) {
      const [key, value] = objArray[i];
      vectors[key] = new Vector(value);
    }
    return new Word2Vec(vectors, size);
  }

  /**
   * @param {string} inputFile
   * @param {string} outputFile
   * @param {Object} options
   * @param {number} [options.size=100]
   * @param {number} [options.alpha=0.025]
   * @param {number} [options.window=5]
   * @param {number} [options.minCount=5]
   * @param {number} [options.sample=1E-3]
   * @param {number} [options.workers=12]
   * @param {boolean} [options.hs=false]
   * @param {number} [options.negative=5]
   * @param {number} [options.iter=5]
   * @param {string} [options.type='cbow']
   */
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
    if (word2vec) {
      word2vec(
        inputFile, outputFile, size, alpha, window,
        minCount, sample, workers, Number(hs), negative,
        iter, Number(type === 'cbow'),
      );
    } else {
      throw new Error('Can not support on this OS.');
    }
  }

  /**
   * @param {Object.<Array>} texts
   * @param {Array.<string>} [texts.positive=[]]
   * @param {Array.<string>} [texts.negative=[]]
   * @param {number} [amount=1]
   * @returns {Array.<{text: string, vector: Vector}>}
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
   * @param {...string} texts
   * @returns {{text: string, vector: Vector}}
   */
  findDifference(...texts) {
    const { size } = this;
    const inputVectors = texts.map(value => this.getVector(value) || Vector.ones(size));
    const meanVector = Vector.mean(inputVectors);
    const differentVector = inputVectors.map((value, index) => [
      texts[index],
      value,
      value.distance(meanVector),
    ])
      .sort((a, b) => b[2] - a[2])[0];
    return { text: differentVector[0], vector: differentVector[1] };
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
