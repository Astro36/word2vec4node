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

/** @module word2vec4node/Vector */

const sum = nums => nums.reduce((numA, numB) => numA + numB);

/** @class */
class Vector {
  /**
   * @param {Array.<number>} values 
   */
  constructor(values) {
    this.values = values;
  }

  /**
   * @static
   * @param {Vector} vectorA
   * @param {Vector} vectorB
   * @returns {number}
   */
  static distance(vectorA, vectorB) {
    return 1 - Vector.similarity(vectorA, vectorB);
  }

  /**
   * @static
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
   * @static
   * @param {Vector} vector
   * @returns {Vector}
   */
  static negative(vector) {
    return new Vector(vector.valueOf().map(value => -value));
  }

  /**
   * @static
   * @param {Vector} vector
   * @returns {Vector}
   */
  static normalize(vector) {
    const size = Vector.size(vector);
    return new Vector(vector.valueOf().map(num => num / size));
  }

  /**
   * @static
   * @param {number} size
   * @returns {Vector}
   */
  static ones(size) {
    return new Vector(new Array(size).fill(1));
  }

  /**
   * @static
   * @param {Vector} vectorA
   * @param {Vector} vectorB
   * @returns {number}
   */
  static similarity(vectorA, vectorB) {
    return Vector.dot(Vector.normalize(vectorA), Vector.normalize(vectorB));
  }

  /**
   * @static
   * @param {Vector} vector
   * @returns {number}
   */
  static size(vector) {
    return Math.sqrt(sum(vector.valueOf().map(num => num ** 2)));
  }

  /**
   * @static
   * @param {number} size
   * @returns {Vector}
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
   * @returns {Array.<number>}
   */
  valueOf() {
    return this.values;
  }
}

module.exports = Vector;
