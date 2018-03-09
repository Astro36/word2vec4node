const fs = require('fs');

const Vector = require('./Vector');
const WordVector = require('./WordVector');

class Word2Vec {
  constructor(vectors, size = -1) {
    this.vectors = vectors;
    if (size > 0) {
      this.size = size;
    } else {
      this.size = vectors[0].valueOf().length;
    }
  }

  static createFromText(file) {
    const content = fs.readFileSync(file).toString();
    const lines = content.split('\n');
    const vectors = [];
    const size = lines.shift().split(' ')[1];
    for (let i = 0, len = lines.length; i < len; i += 1) {
      const line = lines[i];
      if (line) {
        const values = lines[i].split(' ');
        const text = values.shift();
        vectors.push(new WordVector(text, values.slice(0, size)));
      }
    }
    return new Word2Vec(vectors, size);
  }

  // getNearestWord(vector) {
  //   return this.getNearestWords(vector, 1);
  // };

  // getNearestWords(vector, amount) {
  //   const { words, size } = this;
  //   const word = {
  //     distance: new Array(amount).fill(-1),
  //     text: new Array(amount),
  //   };
  //   for (let i = 0, len = words.length; i < len; i += 1) {
  //     let distance = 0;
  //     for (let j = 0; j < size; j += 1) {
  //       distance += vector[j] * words[i].values[j];
  //     }
  //     for (let j = 0; j < amount; j += 1) {
  //       if (distance > word.distance[j]) {
  //         for (let k = amount - 1; k > j; k -= 1) {
  //           word.distance[k] = word.distance[k - 1];
  //           word.text[k] = word.text[k - 1];
  //         }
  //         word.distance[j] = distance;
  //         word.text[j] = words[i].text;
  //         break;
  //       }
  //     }
  //   }
  //   return word.distance.map((value, index) => ({ distance: value, text: word.text[index] }));
  // };

  // getSimilarity(textA, textB) {
  //   const { words, size } = this;
  //   if (textA === textB) {
  //     return 1;
  //   } else {
  //     const vectors = [];
  //     for (var i = 0, len = words.length; i < len; i += 1) {
  //       const { text, values } = words[i];
  //       if (text === textA || text === textB) {
  //         vectors.push(values);
  //       }
  //     }
  //     if (vectors.length === 2) {
  //       let sum = 0;
  //       for (i = 0; i < size; i += 1) {
  //         sum += vectors[0][i] * vectors[1][i];
  //       }
  //       return sum;
  //     }
  //   }
  //   return null;
  // }

  /**
   * @param {string} text
   * @returns {WordVector}
   */
  getWordVector(text) {
    const { vectors } = this;
    for (let i = 0, len = vectors.length; i < len; i += 1) {
      const vector = vectors[i];
      if (vector.getText() === text) {
        return vector;
      }
    }
    return null;
  }

  /**
   * @param {Object.<Array>} texts
   * @param {Array.<string>} texts.positive
   * @param {Array.<string>} texts.negative
   * @param {number} amount
   * @returns {Array.<WordVector>}
   */
  analogy({ positive = [], negative = [] }, amount = 1) {
    const { vectors, size } = this;
    const getVector = texts => texts.map(value => this.getWordVector(value) || Vector.ones(size));
    const analogyVectors = [
      ...getVector(positive),
      ...getVector(negative).map(value => value.negative()),
    ];
    const keyedVectors = [];
    for (let i = 0, len = vectors.length; i < len; i += 1) {
      const vector = vectors[i];
      keyedVectors.push([
        vector,
        analogyVectors.map(value => value.similarity(vector)).reduce((numA, numB) => numA + numB),
      ]);
    }
    keyedVectors.sort((a, b) => b[1] - a[1]);
    return keyedVectors.slice(0, amount).map(([value]) => value);
  }
}

module.exports = Word2Vec;
