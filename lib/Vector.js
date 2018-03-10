const sum = nums => nums.reduce((numA, numB) => numA + numB);

class Vector {
  constructor(values) {
    this.values = values;
  }

  /**
   * @param {Vector} vectorA
   * @param {Vector} vectorB
   */
  static distance(vectorA, vectorB) {
    return 1 - Vector.similarity(vectorA, vectorB);
  }

  /**
   * @param {Vector} vectorA
   * @param {Vector} vectorB
   * @returns {number}
   */
  static dot(vectorA, vectorB) {
    const valuesA = vectorA.valueOf();
    const valuesB = vectorB.valueOf();
    return sum(valuesA.map((value, index) => value * valuesB[index]));
  }

  /**
   * @param {Vector} vector
   * @returns {Vector}
   */
  static negative(vector) {
    return new Vector(vector.valueOf().map(value => -value));
  }

  /**
   * @param {Vector} vector
   * @returns {Vector}
   */
  static normalize(vector) {
    const size = Vector.size(vector);
    return new Vector(vector.valueOf().map(num => num / size));
  }

  /**
   * @param {number} size
   * @returns {number}
   */
  static ones(size) {
    return new Vector(new Array(size).fill(1));
  }

  /**
   * @param {Vector} vectorA
   * @param {Vector} vectorB
   * @returns {number}
   */
  static similarity(vectorA, vectorB) {
    return Vector.dot(Vector.normalize(vectorA), Vector.normalize(vectorB));
  }

  /**
   * @param {Vector} vector
   * @returns {number}
   */
  static size(vector) {
    return Math.sqrt(sum(vector.valueOf().map(num => num ** 2)));
  }

  /**
   * @param {number} size
   * @returns {number}
   */
  static zeros(size) {
    return new Vector(new Array(size).fill(0));
  }

  /**
   * @param {Vector} vector
   * @returns {number}
   */
  distance(vector) {
    return Vector.distance(this, vector);
  }

  /**
   * @param {Vector} vector
   * @returns {number}
   */
  dot(vector) {
    return Vector.dot(this, vector);
  }

  /**
   * @returns {Vector}
   */
  negative() {
    return Vector.negative(this);
  }

  /**
   * @returns {Vector}
   */
  normalize() {
    return Vector.normalize(this);
  }

  /**
   * @param {Vector} vector
   * @returns {number}
   */
  similarity(vector) {
    return Vector.similarity(this, vector);
  }

  /**
   * @returns {number}
   */
  size() {
    return Vector.size(this);
  }

  /**
   * @returns {number}
   */
  valueOf() {
    return this.values;
  }
}

module.exports = Vector;
