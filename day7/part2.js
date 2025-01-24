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

    let dirSizes = []

    const dfs = (node) => {
        if (node.size != 0) return node.size

        let dirSize = 0
        for (let child of node.children) {
            dirSize += dfs(child)
        }

        node.size = dirSize
        dirSizes.push(node.size)
        return dirSize
    }

    dfs(root)

    let rootSize = root.size
    let gap = rootSize - 40000000
    dirSizes.sort((a, b) => a - b)

    console.log(root)
    console.log(dirSizes)
    return dirSizes.find(n => n >= gap)
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
    // expected sample.txt = 24933642
    // expected input.txt = 8278005
}

main()