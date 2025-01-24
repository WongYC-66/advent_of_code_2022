// https://adventofcode.com/2022/day/6
const { readFile } = require("../lib.js")

const solve = (rawFile) => {
    rawFile = rawFile[0]
    const MAX_LEN = 4
    let seen = new Set()

    let l = 0
    for(let r = 0 ; r < rawFile.length ; r++){
        let curr = rawFile[r]
        
        // shrink
        while(seen.has(curr)){
            seen.delete(rawFile[l])
            l += 1
        }

        // expand
        seen.add(curr)

        if(seen.size == MAX_LEN) return r + 1
    }

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
    // expected sample.txt = 11
    // expected input.txt = 1655
}

main()