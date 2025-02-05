// https://adventofcode.com/2022/day/13
const { readFile } = require("../lib.js")

const strToArr = (s) => {
    if (s[0] + s.at(-1) != '[]') return Number(s)
    if (s == '[]') return []

    let arr = []
    let remain = s.slice(1, -1) + ','

    let tmp = ''
    let open = 0
    let close = 0
    let hasBracket = false

    for (let c of remain) {
        if (c == ',' && (!hasBracket || open == close)) {
            arr.push(strToArr(tmp))
            tmp = ''
        } else {
            tmp += c
            if (c == '[') hasBracket = true
            open += c == '['
            close += c == ']'
        }
    }

    return arr
}

const extractData = (rawFile) => {
    rawFile.push('')

    let pairs = []

    let pair = []
    for (let s of rawFile) {
        if (s == "") {
            pairs.push(pair)
            pair = []
        } else {
            let arr = strToArr(s)
            pair.push(arr)
        }
    }

    return pairs
}

let isInOrder = (arr1, arr2) => {

    for (let i = 0; i < arr1.length; i++) {
        // console.log({i})
        if (i >= arr2.length) return false

        let left = arr1[i]
        let right = arr2[i]

        let arrayCount = 0
        if (Array.isArray(left)) arrayCount += 1
        if (Array.isArray(right)) arrayCount += 1

        let leftRightInOrder = undefined

        if (arrayCount == 2) {
            leftRightInOrder = isInOrder(left, right)
        } else if (arrayCount === 1) {
            // 1 integer. 1 array
            if (!Array.isArray(left)) left = [left]
            if (!Array.isArray(right)) right = [right]
            leftRightInOrder = isInOrder(left, right)
        } else {
            // both integer
            if (left == right) continue
            leftRightInOrder = left < right
        }

        // console.log({ left, right, leftRightInOrder })

        if (leftRightInOrder) return true
        if (!leftRightInOrder) return false
    }

    return true
}

const solve = (pairs) => {
    console.log(pairs)

    let res = 0

    for (let i = 0; i < pairs.length; i++) {
        let [arr1, arr2] = pairs[i]

        if (isInOrder(arr1, arr2)) {
            console.log("----- in order, ", i + 1, { arr1, arr2 })
            console.log("")
            res += i + 1
        }
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

    let pairs = extractData(rawFile)

    let res = solve(pairs)
    console.log(res)

    return res
    // expected sample.txt = 13
    // expected input.txt = 6568
}

main()