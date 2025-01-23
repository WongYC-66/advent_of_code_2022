// https://adventofcode.com/2022/day/1
const { readFile } = require("../lib.js")

const solve = (rawFile) => {
    let maxSum = 0
    let sum = 0
    for(let s of rawFile){
        if(s == ''){
            sum = 0
        } else {
            sum += Number(s)
            maxSum = Math.max(maxSum, sum)
        }
    }
    return maxSum
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
    // expected sample.txt = 24000
    // expected input.txt = 74198
}

main()