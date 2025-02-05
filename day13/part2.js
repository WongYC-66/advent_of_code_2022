// https://adventofcode.com/2022/day/13
const { readFile } = require("../lib.js")

const strToArr = (s, count) => {
    if (s[0] + s.at(-1) != '[]') {
        let n = Number(s)
        count[n] = (count[n] || 0) + 1
        return n
    }
    if (s == '[]') return []

    let arr = []
    let remain = s.slice(1, -1) + ','

    let tmp = ''
    let open = 0
    let close = 0
    let hasBracket = false

    for (let c of remain) {
        if (c == ',' && (!hasBracket || open == close)) {
            arr.push(strToArr(tmp, count))
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
    let count = {}
    let pair = []
    for (let s of rawFile) {
        if (s == "") {
            pairs.push(pair)
            pair = []
        } else {
            let arr = strToArr(s, count)
            pair.push(arr)
        }
    }
    console.log(count)
    return pairs
}

let sortAlgo = (arr1, arr2) => {

    for (let i = 0; i < Math.max(arr1.length, arr2.length); i++) {
        if (i >= arr2.length) return +1
        if (i >= arr1.length) return -1

        let left = arr1[i]
        let right = arr2[i]

        let arrayCount = 0
        if (Array.isArray(left)) arrayCount += 1
        if (Array.isArray(right)) arrayCount += 1

        if (arrayCount == 2) {
            let res = sortAlgo(left, right)
            if (res) return res
        } else if (arrayCount === 1) {
            // 1 integer. 1 array
            if (!Array.isArray(left)) left = [left]
            if (!Array.isArray(right)) right = [right]
            let res = sortAlgo(left, right)
            if (res) return res
        } else {
            // both integer
            if (left === right) continue
            if (left > right) {
                return +1
            } else if (right > left) {
                return -1
            }
        }
    }
    return 0
}

const solve = (pairs) => {
    console.log(pairs)

    let all = []

    for (let i = 0; i < pairs.length; i++) {
        let [arr1, arr2] = pairs[i]
        all.push(arr1)
        all.push(arr2)
    }

    all.push([[2]])
    all.push([[6]])
    all.sort(sortAlgo)

    let two_i = all.findIndex(arr => JSON.stringify(arr) == JSON.stringify([[2]])) + 1
    let six_i = all.findIndex(arr => JSON.stringify(arr) == JSON.stringify([[6]])) + 1

    all.forEach((arr, i) => console.log(i, JSON.stringify(arr)))

    console.log({ two_i, six_i })


    return two_i * six_i
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
    // expected sample.txt = 140
    // expected input.txt = ???
    // 18715 too low
    // 25773 too high
}

main()

