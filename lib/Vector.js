const mean = nums => sum(nums) / nums.length;

const sum = nums => nums.reduce((numA, numB) => numA + numB);

const checkVector = (value) => {
  if (value instanceof Vector) {
    return value;
  } else if (Array.isArray(value)) {
    return new Vector(value);
  }
  return null;
};

class Vector {
  constructor(values) {
    this.values = values;
  }

  static distance(valueA, valueB) {
    return 1 - Vector.similarity(valueA, valueB);
  }

  static dot(valueA, valueB) {
    const valuesA = checkVector(valueA).valueOf();
    const valuesB = checkVector(valueB).valueOf();
    return new Vector(valuesA.map((value, index) => value * valuesB[index]));
  }

  static normalize(value) {
    const values = checkVector(value).valueOf();
    const size = sum(values.map(num => num ** 2));
    return new Vector(values.map(num => num / size));
  }

  static similarity(valueA, valueB) {
    return Vector.dot(Vector.normalize(valueA), Vector.normalize(valueB));
  }

  distance(value) {
    return Vector.distance(this, value);
  }

  dot(value) {
    return Vector.dot(this, value);
  }

  similarity(value) {
    return Vector.similarity(this, value);
  }

  normalize() {
    return Vector.normalize(this);
  }

  valueOf() {
    return this.values;
  }
}

module.exports = Vector;
