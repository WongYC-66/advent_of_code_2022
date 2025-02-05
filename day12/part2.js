// https://adventofcode.com/2022/day/12
const { readFile } = require("../lib.js")
const {
    PriorityQueue,
} = require('@datastructures-js/priority-queue');

const extractData = (rawFile) => {
    let M = rawFile.length
    let N = rawFile[0].length

    let grid = Array.from(Array(M), () => Array(N))

    let aArr = []

    for (let r = 0; r < M; r++) {
        for (let c = 0; c < N; c++) {
            let char = rawFile[r][c]
            let level = -1
            if (char == 'S') {
                level = 1
            } else if (char == 'E') {
                level = 26
            } else {
                level = char.charCodeAt(0) - 'a'.charCodeAt(0) + 1
            }
            grid[r][c] = { char, level }

            if (char == 'S' || char == 'a') {
                aArr.push([r, c])
            }
        }
    }
    return { grid, aArr }
}

const solve = (grid, aArr) => {
    console.log(grid, aArr)

    let dirs = [[-1, 0], [+1, 0], [0, -1], [0, +1]]

    let M = grid.length
    let N = grid[0].length

    let visited = Array.from(Array(M), () => Array(N).fill(Infinity))

    let minHeap = new PriorityQueue((a, b) => a.cost - b.cost)
    for (let [r, c] of aArr) {
        minHeap.enqueue({ r, c, cost: 0 })
    }

    while (minHeap.size()) {
        let { r, c, cost } = minHeap.dequeue()
        if (cost >= visited[r][c]) continue
        // console.log({r,c,cost}, grid[r][c].char)
        visited[r][c] = cost

        let { char, level } = grid[r][c]

        if (char == 'E') {
            return cost
        }

        for (let [dr, dc] of dirs) {
            let nR = r + dr
            let nC = c + dc
            if (nR < 0 || nR == M || nC < 0 || nC == N) continue
            let { level: nLevel } = grid[nR][nC]

            if (nLevel - level >= 2) continue
            minHeap.enqueue({ r: nR, c: nC, cost: cost + 1 })
        }
    }

}

const main = async () => {
    // let rawFile = await readFile("sample.txt")
    let rawFile = await readFile("input.txt")
    rawFile = rawFile
        .replaceAll("\r", "")
        .split("\n")
    console.log(rawFile)

    let { grid, aArr } = extractData(rawFile)

    let res = solve(grid, aArr)
    console.log(res)
    return res
    // expected sample.txt = 29
    // expected input.txt = 321

}

main()