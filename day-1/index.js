const fs = require('fs')
const path = require('path')
const readline = require('readline');
const events = require('events');

(async function parseFile () {
  const rl = readline.createInterface({
    input: fs.createReadStream(path.join(__dirname, `/input.txt`)),
    crlfDelay: Infinity
  });

  let maxCalories1 = 0
  let maxCalories2 = 0
  let maxCalories3 = 0
  let currentCalories = 0
  let aux = 0

  rl.on('line', async (line) => {
    if (line) {
      currentCalories += parseInt(line)
    } else {
      console.log(currentCalories)
      console.log(`${maxCalories1} ${maxCalories2} ${maxCalories3}`)
      if (currentCalories > maxCalories3) {
        if (currentCalories > maxCalories2) {
          if (currentCalories > maxCalories1) {
            maxCalories3 = maxCalories2
            maxCalories2 = maxCalories1
            maxCalories1 = currentCalories
          } else {
            maxCalories3 = maxCalories2
            maxCalories2 = currentCalories
          }
        } else {
          maxCalories3 = currentCalories
        }
      }
      currentCalories = 0
    }
  });

  await events.once(rl, 'close');

  console.log(currentCalories)
  if (currentCalories > maxCalories3) {
    if (currentCalories > maxCalories2) {
      if (currentCalories > maxCalories1) {
        maxCalories1 = currentCalories
      } else {
        maxCalories2 = currentCalories
      }
    } else {
      maxCalories3 = currentCalories
    }
  }
  currentCalories = 0

  console.log('xxxxxxxxxxxxxx')
  console.log(`${maxCalories1} ${maxCalories2} ${maxCalories3}`)
  console.log(maxCalories1 + maxCalories2 + maxCalories3)
})()