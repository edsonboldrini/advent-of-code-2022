const input = await Deno.readTextFile('./input.txt');

function hasDuplicatedLetter(str: string) {
  for (const i of str) {
    let count = 0
    for (const j of str) {
      if (i == j) {
        count += 1
      }

      if (count > 1) {
        return true
      }
    }

    count = 0
  }

  return false
}

const lengthPacket = 14
let index = lengthPacket - 1
let duplicatedLetter = false

do {
  index += 1
  const str = input.slice(index - lengthPacket, index)
  duplicatedLetter = hasDuplicatedLetter(str);
  // console.log(str)
  // console.log(index)
} while (duplicatedLetter)

console.log(index)
