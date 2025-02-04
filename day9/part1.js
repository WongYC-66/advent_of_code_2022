// https://adventofcode.com/2022/day/9
const { readFile } = require("../lib.js")

const extractData = (rawFile) => {
    let steps = []
    for (let s of rawFile) {
        let [dir, step] = s.split(' ')
        steps.push([dir, Number(step)])
    }
    return steps
}

const solve = (steps) => {
    let dirs = {
        'R': [0, +1],
        'L': [0, -1],
        'U': [+1, 0],
        'D': [-1, 0],
    }

    let visitedT = new Set()

    const moveT = (T, H) => {
        let newT = T
        let dr = Math.abs(T[0] - H[0])
        let dc = Math.abs(T[1] - H[1])
        if (dr == 2) {
            // r take half, same c as H
            let midR = (T[0] + H[0]) / 2
            newT = [midR, H[1]]
        } else if (dc == 2) {
            let midC = (T[1] + H[1]) / 2
            newT = [H[0], midC]
        }
        return newT
    }

    let H = [0, 0]
    let T = [0, 0]

    visitedT.add(`${0},${0}`)

    for (let [dir, step] of steps) {
        let [dr, dc] = dirs[dir]
        for (let i = 0; i < step; i++) {
            H = [H[0] + dr, H[1] + dc]
            T = moveT(T, H)
            visitedT.add(`${T[0]},${T[1]}`)
        }
    }
    return visitedT.size
}

const main = async () => {
    // let rawFile = await readFile("sample.txt")
    let rawFile = await readFile("input.txt")
    rawFile = rawFile
        .replaceAll("\r", "")
        .split("\n")
    console.log(rawFile)

    let steps = extractData(rawFile)

    let res = solve(steps)
    console.log(res)
    return res
    // expected sample.txt = 13
    // expected input.txt = 6256
}

main()