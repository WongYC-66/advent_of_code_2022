// https://adventofcode.com/2022/day/1
const { readFile } = require("../lib.js")

const solve = (rawFile) => {
    let sumArr = []

    let sum = 0
    for(let s of rawFile){
        if(s == ''){
            sumArr.push(sum)
            sum = 0
        } else {
            sum += Number(s)
        }
    }
    sumArr.push(sum)

    sumArr.sort((a, b) => b - a)

    return sumArr.slice(0, 3).reduce((s, x) => s + x, 0)
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
    // expected sample.txt = 45000
    // expected input.txt = 209914
}

main()