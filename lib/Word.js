class Word {
  constructor(text, vector) {
    this.text = text;
    this.vector = vector;
  }

  getText() {
    return this.text;
  }

  getVector() {
    return this.vector;
  }
}

module.exports = Word;
