const fs = require('fs')
const path = require('path')
const readline = require('readline');
const events = require('events');

const priorities = [
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
  't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
  'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
];

(async function parseFile () {
  const rl = readline.createInterface({
    input: fs.createReadStream(path.join(__dirname, `/input.txt`)),
    crlfDelay: Infinity
  });

  let totalScore = 0
  let currentScore = 0
  let lines3 = []

  rl.on('line', (line) => {
    if (line) {
      if (lines3.length < 2) {
        lines3.push(line)
      } else {
        for (const l of line) {
          if (lines3[0].includes(l) && lines3[1].includes(l)) {
            console.log(l)
            currentScore += priorities.indexOf(l) + 1
            break
          }
        }
        lines3 = []
      }

      totalScore += currentScore
      currentScore = 0
    }
  });

  await events.once(rl, 'close');

  console.log('xxxxxxxxxxxxxx')
  console.log(totalScore)
})()