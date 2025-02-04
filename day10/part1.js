// https://adventofcode.com/2022/day/10
const { readFile } = require("../lib.js")

const solve = (rawFile) => {
    let N = rawFile.length + 2

    let prefixSum = [0,]

    for (let i = 0; i < rawFile.length; i++) {
        let inc = 0
        if (rawFile[i].startsWith('addx')) {
            let [_, incStr] = rawFile[i].split(' ')
            inc = Number(incStr)
            prefixSum.push(0)
            prefixSum.push(inc)
        } else {
            prefixSum.push(0)
        }
        // console.log(i, prefixSum.at(-1))
    }

    console.log(prefixSum)
    let res = 0

    let x = 1
    let cycleCheck = 20

    for(let i = 1; i < prefixSum.length ; i++){
        if(i == cycleCheck){
            res += cycleCheck * x
            cycleCheck += 40
        }
        x += prefixSum[i]
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
    // expected sample.txt = 13140
    // expected input.txt = 14340
}

main()