// https://adventofcode.com/2022/day/14
const { readFile } = require("../lib.js")

const drawLine = (prev, curr, grid, offsetCol) => {
    let [r1, c1] = prev
    let [r2, c2] = curr
    let dr = Math.sign(r2 - r1)
    let dc = Math.sign(c2 - c1)

    let r = r1, c = c1 + offsetCol
    grid[r][c] = '#'
    while (r != r2 || c != c2 + offsetCol) {
        r += dr
        c += dc
        grid[r][c] = '#'
    }
}

const extractData = (rawFile) => {
    let ROW_MAX = 0
    let MIN_COL = Infinity
    let MAX_COL = -Infinity

    let dotsGroup = []
    for (let s of rawFile) {
        let dots = s.split(' -> ')
        let group = []
        dots.forEach(dStr => {
            let [c, r] = dStr.split(',')
            c = Number(c) - 500
            r = Number(r)

            ROW_MAX = Math.max(ROW_MAX, r)
            MIN_COL = Math.min(MIN_COL, c)
            MAX_COL = Math.max(MAX_COL, c)
            group.push([r, c])
        })
        dotsGroup.push(group)
    }

    let grid = Array.from(Array(ROW_MAX + 1), () => Array(MAX_COL - MIN_COL + 1).fill('.'))

    let offsetCol = Math.abs(MIN_COL)

    dotsGroup.forEach(dots => {
        for (let i = 1; i < dots.length; i++) {
            let prev = dots[i - 1]
            let curr = dots[i]
            drawLine(prev, curr, grid, offsetCol)
            // grid.forEach(row => console.log(row.join('')))
        }
    })

    return { grid, offsetCol }
}

const solve = (grid, offsetCol) => {
    // grid.forEach(row => console.log(row.join('')))

    let M = grid.length
    let N = grid[0].length

    console.log({ M, N })

    const canDrop = () => {
        return dfs(0, offsetCol)
    }

    const dfs = (r, c) => {
        if (c < 0 || c >= N || r >= M - 1) return false
        // console.log({M, N,r,c})

        let btm = grid[r + 1][c]
        let btmLeft = grid[r + 1][c - 1]
        let btmRight = grid[r + 1][c + 1]

        if (btm == '.') {
            return dfs(r + 1, c)
        } else if (btmLeft == '.' || c == 0) {
            return dfs(r + 1, c - 1)
        } else if (btmRight == '.' || c == N - 1) {
            return dfs(r + 1, c + 1)
        }

        if (grid[r][c] == '.') {
            grid[r][c] = 'O'
            return true
        }

        return false
    }

    let i = 1
    while (canDrop()) {
        // console.log({ i })
        i += 1
        // grid.forEach(row => console.log(row.join('')))
    }

    // grid.forEach(row => console.log(row.join('')))

    return i - 1
}

const main = async () => {
    // let rawFile = await readFile("sample.txt")
    let rawFile = await readFile("input.txt")
    rawFile = rawFile
        .replaceAll("\r", "")
        .split("\n")
    // console.log(rawFile)

    let { grid, offsetCol } = extractData(rawFile)

    let res = solve(grid, offsetCol)
    console.log(res)

    return res
    // expected sample.txt = 24
    // expected input.txt = 793
}

main()