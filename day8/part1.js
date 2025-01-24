// https://adventofcode.com/2022/day/8
const { readFile } = require("../lib.js")

const solve = (rawFile) => {
    let M = rawFile.length
    let N = rawFile[0].length

    let res = 0

    const checkLeft = (r, c) => {
        let curr = rawFile[r][c]
        for (let col = c - 1; col >= 0; col--) {
            if (rawFile[r][col] >= curr) return false
        }
        return true
    }

    const checkRight = (r, c) => {
        let curr = rawFile[r][c]
        for (let col = c + 1; col < N; col++) {
            if (rawFile[r][col] >= curr) return false
        }
        return true
    }

    const checkTop = (r, c) => {
        let curr = rawFile[r][c]
        for (let row = r - 1; row >= 0; row--) {
            if (rawFile[row][c] >= curr) return false
        }
        return true
    }

    const checkBottom = (r, c) => {
        let curr = rawFile[r][c]
        for (let row = r + 1; row < M; row++) {
            if (rawFile[row][c] >= curr) return false
        }
        return true
    }

    for (let r = 0; r < M; r++) {
        for (let c = 0; c < N; c++) {
            if (r == 0 || r == M - 1 || c == 0 || c == N - 1) {    // edge
                res += 1
                continue
            }

            // inner
            //check left/right/top/bottom
            let isBiggerThanLeft = checkLeft(r, c)
            let isBiggerThanRight = checkRight(r, c)
            let isBiggerThanTop = checkTop(r, c)
            let isBiggerThanBottom = checkBottom(r, c)
            res += isBiggerThanLeft || isBiggerThanRight || isBiggerThanTop || isBiggerThanBottom
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

    let res = solve(rawFile)
    console.log(res)
    return res
    // expected sample.txt = 21
    // expected input.txt = 1827
}

main()