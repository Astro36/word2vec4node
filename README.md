# Word2Vec4Node

> Google Word2Vec Interface for Node.js with N-API

[![npm](https://img.shields.io/npm/v/word2vec4node.svg?style=flat-square)](https://www.npmjs.com/package/word2vec4node) [![npm](https://img.shields.io/npm/dt/word2vec4node.svg?style=flat-square)](https://www.npmjs.com/package/word2vec4node)

## Notice

Only **Unix-like** OS can use `Word2Vec.train()` method. [pthread](https://en.wikipedia.org/wiki/POSIX_Threads) only working on POSIX, Windows can not use the method.

## ChangeLog

See [CHANGELOG](./CHANGELOG.md)

## Installation

- Install with npm:

```bash
npm install word2vec4node --save
```

- Clone the repo:

```bash
git clone https://github.com/Astro36/Word2Vec4Node.git
```

## Usage

### Example

Find the top-N most similar words:

```javascript
const Word2Vec = require('word2vec4node');
const model = Word2Vec.load('./data/vectors.json');
// [서울] - [한국] + [일본]
console.log(model.analogy({ positive: ['서울', '일본'], negative: ['한국'] }, 5));
```

Which word from the words doesn’t match with the others:

```javascript
const Word2Vec = require('word2vec4node');
const model = Word2Vec.load('./data/vectors.json');
console.log(model.findDifference(['봄', '여름', '가을', '얼음']));
```

Compute cosine distances from the words:

```javascript
const Word2Vec = require('word2vec4node');
const model = Word2Vec.load('./data/vectors.json');
console.log(model.getVector('대한민국').distance(model.getVector('한국')));
```

## License

```text
Word2Vec4Node
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
along with this program.  If not, see <http://www.gnu.org/licenses/>.
```