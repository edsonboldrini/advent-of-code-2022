const input = await Deno.readTextFile('./input.txt');

const lines: string[] = input.split('\n');

function isNumeric(value: any) {
  return /^-?\d+$/.test(value);
}

let currentFolder = ''
const foldersStack: string[] = []
let tree: { [key: string]: any } = {}

function buildTreeByStack(tree: { [key: string]: any }, stack: string[], item: { [key: string]: any }) {
  if (stack.length > 1) {
    buildTreeByStack(tree[stack[0]], stack.slice(1), item)
  }

  if (stack.length == 1) {
    // let size = 0
    // if (tree[stack[0]]) {
    //   Object.keys(tree[stack[0]]).forEach((o) => {
    //     if (isNumeric(tree[stack[0]][o])) {
    //       size += tree[stack[0]][o]
    //     }
    //   })
    // }
    // console.log(size)
    tree[stack[0]] = { ...tree[stack[0]], ...item }
  }

  return tree
}

lines.forEach((l) => {
  if (l.includes('$')) {
    const splitCd = l.split(' ')
    const command = splitCd[1]

    if (command == 'cd') {
      const argument = splitCd[2]
      if (argument == '..') {
        if (foldersStack.length > 1) {
          currentFolder = foldersStack.pop()!
        } else {
          currentFolder = '/'
        }
      } else {
        if (!foldersStack.includes(argument)) {
          foldersStack.push(argument)
        }

        currentFolder = argument
      }
    }
  } else {
    const splitLs = l.split(' ')
    const item = splitLs[1]

    if (splitLs[0] != 'dir') {
      tree = buildTreeByStack(tree, foldersStack, { [item]: parseInt(splitLs[0]) })
    }
  }
  console.log(`tree: ${JSON.stringify(tree)}`)
  // console.log(`previousFolder: ${foldersStack}`)
  // console.log(`currentFolder: ${currentFolder}`)
})
console.log(`tree: ${JSON.stringify(tree)}`)
