// https://adventofcode.com/2022/day/3
const { readFile } = require("../lib.js")

const solve = (rawFile) => {
    const findType = (secondStr, seen) => {
        for(let c of secondStr){
            if(seen.has(c)) return c
        }
    }

    let lowerRegex = /[a-z]/

    const findScore = (c) => {
        let typeOfA = lowerRegex.test(c) ? 'a' : 'A'
        let shift = typeOfA == 'A' ? 26 : 0
        return c.charCodeAt(0) - typeOfA.charCodeAt(0) + 1 + shift
    }

    let res = 0
    for(let s of rawFile){
        let len = s.length
        let first = s.slice(0, len / 2)
        let second = s.slice(len / 2,)

        let firstSet = new Set(first)
        let itemType = findType(second, firstSet)

        let score = findScore(itemType)
        res += score
        console.log({first,second, itemType, score, res})
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
    // expected sample.txt = 157
    // expected input.txt = 8176
}

main()