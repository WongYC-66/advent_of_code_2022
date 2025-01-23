// https://adventofcode.com/2022/day/1
const { readFile } = require("../lib.js")

const preProcess = (rawFile) => {
    let groups = []

    let sets = []
    for(let i = 0 ; i < rawFile.length ; i++){
        sets.push(new Set(rawFile[i]))
        if(sets.length == 3){
            groups.push(sets.slice())
            sets = []
        }
    }

    return groups
}

const solve = (groups) => {

    let lowerRegex = /[a-z]/

    const findType = (set1, set2, set3) => {
        let count = {}
        set1.forEach(c => count[c] = (count[c] || 0) + 1)
        set2.forEach(c => count[c] = (count[c] || 0) + 1)
        for(let c of set3){
            if(count[c] + 1 == 3) return c
        }
    }

    const findScore = (c) => {
        let typeOfA = lowerRegex.test(c) ? 'a' : 'A'
        let shift = typeOfA == 'A' ? 26 : 0
        return c.charCodeAt(0) - typeOfA.charCodeAt(0) + 1 + shift
    }

    let res = 0
    for(let [s1,s2,s3] of groups){
        let itemType = findType(s1, s2, s3)

        let score = findScore(itemType)
        res += score
    }
    return res
}

const main = async () => {
    // let rawFile = await readFile("sample.txt")
    let rawFile = await readFile("input.txt")
    rawFile = rawFile
        .replaceAll("\r", "")
        .split("\n")
    // console.log(rawFile)

    const groups = preProcess(rawFile)

    let res = solve(groups)
    console.log(res)
    return res
    // expected sample.txt = 70
    // expected input.txt = 2689
}

main()