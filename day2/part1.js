// https://adventofcode.com/2022/day/2
const { readFile } = require("../lib.js")

const solve = (rawFile) => {
    let myScore = {
        X: 1,
        Y: 2,
        Z: 3
    }

    let opBeatBy = {
        A: 'Y',    // rock beat by paper
        B: 'Z',    // paper beat by scissors
        C: 'X',    // scissors beat by rock
    }

    let generalTerm = {
        A: 'rock',
        B: 'paper',
        C: 'scissors',
        X: 'rock',
        Y: 'paper',
        Z: 'scissors',
    }

    let res = 0
    for (let s of rawFile) {
        let [opp, me] = s.split(" ")
        console.log({opp, me})
        res += myScore[me]
        if (generalTerm[opp] == generalTerm[me]) {    // draw
            res += 3
        } else if (me == opBeatBy[opp]) {  // me win
            res += 6
        }
        console.log({res})
    }
    return res
}

const main = async () => {
    // let rawFile = await readFile("sample.txt")
    let rawFile = await readFile("input.txt")
    rawFile = rawFile
        .replaceAll("\r", "")
        .split("\n")
    console.log(rawFile)

    let res = solve(rawFile)
    console.log(res)
    return res
    // expected sample.txt = 15
    // expected input.txt = 8933
}

main()