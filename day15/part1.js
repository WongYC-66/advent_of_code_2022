// https://adventofcode.com/2022/day/14
const { readFile } = require("../lib.js")

// const { Deque } = require('@datastructures-js/deque');

const extractData = (rawFile) => {
    let regex = /Sensor at x=(-?\d+), y=(-?\d+): closest beacon is at x=(-?\d+), y=(-?\d+)/

    let coords = []

    for (let s of rawFile) {
        let [_, c1, r1, c2, r2] = s.match(regex)
        coords.push([Number(r1), Number(c1), Number(r2), Number(c2)])
    }
    return coords
}

// const bfs = (r1, c1, r2, c2, seen) => {
//     const dirs = [[-1, 0], [+1, 0], [0, -1], [0, +1]]
//     let MAX_STEP = Math.abs(r2 - r1) + Math.abs(c2 - c1)
//     let q = new Deque()
//     q.pushBack([r1, c1, 0])

//     while (q.size()) {
//         let [r, c, step] = q.popFront()

//         if (!seen[r]) seen[r] = new Set()

//         if (seen[r].has(c)) continue
//         if (step > MAX_STEP) continue
//         seen[r].add(c)

//         for (let [dr, dc] of dirs) {
//             let nR = r + dr
//             let nC = c + dc
//             // if(seen[nR] && seen[nR].has(nC)) continue
//             q.pushBack([nR, nC, step + 1])
//         }
//     }
// }

const solve = (coords, target) => {
    console.log(coords, { target })

    let intervals = []
    let beacons = new Set()

    for (let [, , r2, c2] of coords) {
        beacons.add(`${r2},${c2}`)
    }
    beacons = [...beacons].map(s => s.split(',').map(Number))
    console.log({ beacons })

    // math, find possible intervals at RowTarget
    for (let [r1, c1, r2, c2] of coords) {
        // r1,c1 = sensor
        // r2,c2 = beacon
        //
        // 
        let dist = Math.abs(r2 - r1) + Math.abs(c2 - c1)
        if (Math.abs(r1 - target) >= dist) continue
        let remainDist = dist - Math.abs(r1 - target)
        intervals.push([c1 - remainDist, c1 + remainDist])
    }
    intervals.sort((a, b) => a[0] - b[0] || a[1] - b[1])
    console.log(intervals)

    // merge overlapping intervals
    let stack = []
    for (let [l, r] of intervals) {
        if (stack.length && stack.at(-1)[1] >= l) {
            let [prevL, prevR] = stack.pop()
            stack.push([prevL, Math.max(r, prevR)])
        } else {
            stack.push([l, r])
        }
    }
    console.log(stack)
    let res = 0
    stack.forEach(([l, r]) => res += r - l + 1)
    console.log(res)

    // check if already 1 Beacon in the target Row
    for (let [rB, cB] of beacons) {
        if (rB != target) continue
        let isBeaconInInterval = stack.some(([l, r]) => l <= cB && cB <= r)
        if (isBeaconInInterval) res -= 1
    }

    return res

    // let MIN_COL = Infinity
    // let MAX_COL = -Infinity
    // let MIN_ROW = Infinity
    // let MAX_ROW = -Infinity


    // for (let [r1, c1, r2, c2] of coords) {
    //     MIN_COL = Math.min(MIN_COL, c1, c2)
    //     MAX_COL = Math.max(MAX_COL, c1, c2)
    //     MIN_ROW = Math.min(MIN_ROW, r1, r2)
    //     MAX_ROW = Math.max(MAX_ROW, r1, r2)
    // }

    // let M = MAX_ROW - MIN_ROW + 1
    // let N = MAX_COL - MIN_COL + 1

    // console.log({ MIN_COL, MAX_COL, MIN_ROW, MAX_ROW, M, N })

    // let seen = {}
    // console.log(coords.length)

    // for (let i = 0 ; i < coords.length ; i++){
    //     let [r1, c1, r2, c2] = coords[i]
    //     console.log({i})
    //     bfs(r1, c1, r2, c2, seen)
    // }

    // console.log(seen[target])

    // return seen[target]?.size || 0
}

const main = async () => {
    // let rawFile = await readFile("sample.txt")
    let rawFile = await readFile("input.txt")
    rawFile = rawFile
        .replaceAll("\r", "")
        .split("\n")
    // console.log(rawFile)

    let coords = extractData(rawFile)

    // let res = solve(coords, 10)
    let res = solve(coords, 2000000)
    console.log(res)

    return res
    // expected sample.txt = 26 // y=10
    // expected input.txt = 4582667 // y=2000000
    // 4197101 too low
}

main()