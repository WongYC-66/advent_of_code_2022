// https://adventofcode.com/2022/day/4
const { readFile } = require("../lib.js")

const extractData = (rawFile) => {
    let groups = []
    let regex = /(\d+)-(\d+),(\d+)-(\d+)/
    for (let s of rawFile) {
        let [_, x1, y1, x2, y2] = s.match(regex)
        groups.push([Number(x1), Number(y1), Number(x2), Number(y2)])
    }
    return groups
}

const solve = (groups) => {
    console.log(groups)
    let res = 0
    for (let [x1, y1, x2, y2] of groups) {
        if(x2 >= x1 && y2 <= y1 || x1 >= x2 && y1 <= y2){
            res += 1
        }
        console.log({x1,y1,x2,y2,res})
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

    let groups = extractData(rawFile)

    let res = solve(groups)
    console.log(res)
    return res
    // expected sample.txt = 2
    // expected input.txt = 518
}

main()