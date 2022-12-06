const input = await Deno.readTextFile('./input.txt');

const lines = input.split('\n');

let totalScore = 0

lines.forEach((l) => {
  const sanitized = l.replaceAll('\n', '')
  const sections = sanitized.split(',')
  const sectionsRange1 = sections[0].split('-')
  const sectionsRange2 = sections[1].split('-')
  const sections1: number[] = []
  const sections2: number[] = []

  for (let i = parseInt(sectionsRange1[0]); i <= parseInt(sectionsRange1[1]); i++) {
    sections1.push(i)
  }
  for (let i = parseInt(sectionsRange2[0]); i <= parseInt(sectionsRange2[1]); i++) {
    sections2.push(i)
  }

  let includes = false

  for (const s of sections1) {
    if (sections2.includes(s)) {
      includes = true
      break
    }
  }

  if (includes) {
    includes = false
    for (const s of sections2) {
      if (sections1.includes(s)) {
        includes = true
        break
      }
    }
  }

  if (includes) {
    totalScore += 1
  }
})

console.log(totalScore)

