// https://adventofcode.com/2022/day/7
const { readFile } = require("../lib.js")

class Node {
    constructor(size = 0, name = 'noName', parent = null) {
        this.size = size
        this.name = name
        this.parent = parent
        this.children = []
    }
}

const buildTree = (rawFile) => {
    rawFile.shift()
    let root = new Node(0, '/')

    let curr = root
    for (let s of rawFile) {
        console.log(s)
        if (s.startsWith('$')) {
            // command
            if (s == '$ ls') continue
            s = s.slice(2,)
            let nextDir = s.split(' ')[1]
            if (nextDir == '..') {
                // move up
                curr = curr.parent
            } else {
                // move down to child
                curr = curr.children.find(childNode => childNode.name == nextDir)
            }
        } else {
            // lists of file/dirs
            if (s.startsWith('dir')) {
                let childDir = s.split(' ')[1]
                if (!curr.children.find(child => child.name == childDir)) {
                    curr.children.push(new Node(0, childDir, curr))
                }
            } else {
                // a file
                let [size, fileName] = s.split(' ')
                curr.children.push(new Node(Number(size), fileName, curr))
            }
        }
    }

    return root
}

const solve = (root) => {
    console.log(root)

    const MAX_SIZE = 100000
    let sum = 0

    const dfs = (node) => {
        if (node.size != 0) return node.size

        let dirSize = 0
        for (let child of node.children) {
            dirSize += dfs(child)
        }

        if (dirSize <= MAX_SIZE) sum += dirSize
        return dirSize
    }

    dfs(root)

    return sum
}

const main = async () => {
    // let rawFile = await readFile("sample.txt")
    let rawFile = await readFile("input.txt")
    rawFile = rawFile
        .replaceAll("\r", "")
        .split("\n")
    console.log(rawFile)

    let tree = buildTree(rawFile)

    let res = solve(tree)
    console.log(res)
    return res
    // expected sample.txt = 95437
    // expected input.txt = 1141028
}

main()