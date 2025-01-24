// https://adventofcode.com/2022/day/8
const { readFile } = require("../lib.js")

const solve = (rawFile) => {
    let M = rawFile.length
    let N = rawFile[0].length

    let res = 0

    const checkLeft = (r, c) => {
        let count = 0
        let curr = rawFile[r][c]
        for (let col = c - 1; col >= 0; col--) {
            let nextT = rawFile[r][col]
            count += 1
            if (nextT >= curr) break
        }
        return count
    }


    const checkRight = (r, c) => {
        let count = 0
        let curr = rawFile[r][c]
        for (let col = c + 1; col < N; col++) {
            let nextT = rawFile[r][col]
            count += 1
            if (nextT >= curr) break
        }
        return count
    }

    const checkTop = (r, c) => {
        let count = 0
        let curr = rawFile[r][c]
        for (let row = r - 1; row >= 0; row--) {
            let nextT = rawFile[row][c]
            count += 1
            if (nextT >= curr) break
        }
        return count
    }

    const checkBottom = (r, c) => {
        let count = 0
        let curr = rawFile[r][c]
        for (let row = r + 1; row < M; row++) {
            let nextT = rawFile[row][c]
            count += 1
            if (nextT >= curr) break
        }
        return count
    }

    let highestScore = -Infinity
    for (let r = 0; r < M; r++) {
        for (let c = 0; c < N; c++) {
            if (r == 0 || r == M - 1 || c == 0 || c == N - 1) {    // edge
                res += 1
                continue
            }
            // inner
            //check left/right/top/bottom
            let left = checkLeft(r, c)
            let right = checkRight(r, c)
            let top = checkTop(r, c)
            let bottom = checkBottom(r, c)
            let score = left * right * top * bottom
            highestScore = Math.max(highestScore, score)
            console.log({ r, c, left, right, top, bottom, score }, rawFile[r][c])
        }
    }
    return highestScore
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
    // expected input.txt = 335580
}

main()