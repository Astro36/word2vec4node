const Vector = require('./Vector');

class WordVector extends Vector {
  constructor(text, values) {
    super(values);
    this.text = text;
  }

  getText() {
    return this.text;
  }
}

module.exports = WordVector;
