const fs = require('fs');

const Vector = require('./Vector');
const Word = require('./Word');

class Word2Vec {
  constructor(words, size) {
    this.words = words;
    this.size = size;
  }

  static createFromText(file) {
    const content = fs.readFileSync(file).toString();
    const lines = content.split('\n');
    const words = [];
    const size = lines.shift().split(' ')[1];
    for (let i = 0, len = lines.length; i < len; i += 1) {
      const values = lines[i].split(' ');
      const text = values.shift();
      words.push(new Word(text, new Vector(values)));
    }
    return new Word2Vec(words, size);
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

  getWord(text) {
    const { words } = this;
    for (let i = 0, len = words.length; i < len; i += 1) {
      const word = words[i];
      if (word.getText() === text) {
        return word;
      }
    }
    return null;
  }
}

module.exports = Word2Vec;
