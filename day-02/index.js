const fs = require('fs')
const path = require('path')
const readline = require('readline');
const events = require('events');

const scores = {
  'A': 1,
  'B': 2,
  'C': 3,
  'X': 1,
  'Y': 2,
  'Z': 3,
  'loss': 0,
  'draw': 3,
  'win': 6,
}

const matches = {
  'A': {
    'A': 'draw',
    'B': 'loss',
    'C': 'win',
    'loss': 'B',
    'draw': 'A',
    'win': 'C',
  },
  'X': {
    'A': 'draw',
    'B': 'loss',
    'C': 'win',
    'loss': 'B',
    'draw': 'A',
    'win': 'C',
  },
  'B': {
    'A': 'win',
    'B': 'draw',
    'C': 'loss',
    'loss': 'C',
    'draw': 'B',
    'win': 'A',
  },
  'Y': {
    'A': 'win',
    'B': 'draw',
    'C': 'loss',
    'loss': 'C',
    'draw': 'B',
    'win': 'A',
  },
  'C': {
    'A': 'loss',
    'B': 'win',
    'C': 'draw',
    'loss': 'A',
    'draw': 'C',
    'win': 'B',
  },
  'Z': {
    'A': 'loss',
    'B': 'win',
    'C': 'draw',
    'loss': 'A',
    'draw': 'C',
    'win': 'B',
  },
};

(async function parseFile () {
  const rl = readline.createInterface({
    input: fs.createReadStream(path.join(__dirname, `/input.txt`)),
    crlfDelay: Infinity
  });

  let totalScore = 0
  let currentScore = 0

  rl.on('line', (line) => {
    if (line) {
      const [opponent, prediction] = line.split(' ')
      let myResult = ''
      let opponentResult = ''
      switch (prediction) {
        case 'X':
          myResult = 'loss'
          opponentResult = 'win'
          break;
        case 'Y':
          myResult = 'draw'
          opponentResult = 'draw'
          break;
        case 'Z':
          myResult = 'win'
          opponentResult = 'loss'
          break;
      }
      const me = matches[opponent][opponentResult]

      currentScore += scores[myResult] + scores[me]
      console.log(currentScore)

      totalScore += currentScore
      currentScore = 0
    }
  });

  await events.once(rl, 'close');

  console.log('xxxxxxxxxxxxxx')
  console.log(totalScore)
})()