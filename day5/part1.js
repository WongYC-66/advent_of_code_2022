// https://adventofcode.com/2022/day/1
const { readFile } = require("../lib.js")

const extractData = (rawFile) => {
    let stacks = []
    let procedures = []

    let proceRegex = /move (\d+) from (\d+) to (\d+)/

    let isProcedure = false
    for (let s of rawFile) {
        if (s == '') {
            isProcedure = true
        } else if (isProcedure) {
            let [_, count, from, to] = s.match(proceRegex)
            procedures.push([Number(count), Number(from) - 1, Number(to) - 1])
        } else {
            // is stacks
            for (let i = 1; i < s.length; i += 4) {
                let sIdx = Math.floor(i / 4)
                if (!stacks[sIdx]) stacks[sIdx] = []
                if (s[i] != ' ') stacks[sIdx].unshift(s[i])
            }
        }
    }

    stacks.forEach(stack => stack.shift())

    return { stacks, procedures }
}

const solve = (stacks, procedures) => {
    console.log({ stacks, procedures })

    for (let [count, from, to] of procedures) {
        for (let i = 0; i < count; i++) {
            if (!stacks[from].length) break
            stacks[to].push(stacks[from].pop())
        }
        // console.log({ stacks })
    }

    return stacks.reduce((prefix, stack) => prefix + stack.at(-1), '')
}

const main = async () => {
    // let rawFile = await readFile("sample.txt")
    let rawFile = await readFile("input.txt")
    rawFile = rawFile
        .replaceAll("\r", "")
        .split("\n")
    console.log(rawFile)

    const stackCount = 3
    // const stackCount = 9
    let { stacks, procedures } = extractData(rawFile, stackCount)

    let res = solve(stacks, procedures)
    console.log(res)
    return res
    // expected sample.txt = "CMZ"
    // expected input.txt = PTWLTDSJV
}

main()