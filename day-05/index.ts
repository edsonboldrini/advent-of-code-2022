const input = await Deno.readTextFile('./input.txt');

const lines = input.split('\n');

function isNumeric(value: any) {
  return /^-?\d+$/.test(value);
}

const stacksToAdd: string[][] = []
const stacks: { [key: string]: string[] } = {}
const changes: string[][] = []

let task = 'stacks'

lines.forEach((l) => {
  const sanitized = l.replaceAll(/\n|\[|\]|move|from|to /g, '')
  const splitted = sanitized.split(' ')
  const lineSplitted: string[] = []
  let aux = []

  for (const item of splitted) {
    if (item == "") {
      aux.push(item)
    }

    if (aux.length == 4) {
      lineSplitted.push('')
      aux = []
    }

    if (item != "") {
      lineSplitted.push(item)
    }
  }

  if (lineSplitted.length > 0) {
    if (task == 'changes' && isNumeric(lineSplitted[0])) {
      changes.push(lineSplitted)
    }

    if (task == 'stacks' && !isNumeric(lineSplitted[0])) {
      stacksToAdd.push(lineSplitted)
    }

    if (task == 'stacks' && isNumeric(lineSplitted[0])) {
      lineSplitted.forEach((i) => {
        if (i) {
          stacks[i] = []
        }
      })
      task = 'changes'
    }
  }
})

// console.log(stacksToAdd)
// console.log(stacks)
// console.log(changes)

for (const line of stacksToAdd.reverse()) {
  for (const i in line) {
    if (line[i]) {
      stacks[Object.keys(stacks)[i]].push(line[i])
    }
  }
}

// console.log(stacks)

for (const line of changes) {
  // for (let i = 0; i < parseInt(line[0]); i++) {
  //   stacks[line[2]].push(stacks[line[1]].pop()!)
  // }
  for (const item of stacks[line[1]].splice((-1) * parseInt(line[0]), parseInt(line[0]))) {
    stacks[line[2]].push(item)
  }
}

console.log(stacks)
let final = ''

for (const stack of Object.keys(stacks)) {
  final += stacks[stack][stacks[stack].length - 1]
}

console.log(final)
