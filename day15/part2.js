// https://adventofcode.com/2022/day/15
const { readFile } = require("../lib.js")

const extractData = (rawFile) => {
    let regex = /Sensor at x=(-?\d+), y=(-?\d+): closest beacon is at x=(-?\d+), y=(-?\d+)/

    let coords = []

    for (let s of rawFile) {
        let [_, c1, r1, c2, r2] = s.match(regex)
        coords.push([Number(r1), Number(c1), Number(r2), Number(c2)])
    }
    return coords
}

const mergeOverlap = (intervals) => {
    // merge overlapping intervals
    intervals.sort((a, b) => a[0] - b[0] || a[1] - b[1])
    let stack = []
    for (let [l, r] of intervals) {
        if (stack.length && stack.at(-1)[1] >= l) {
            let [prevL, prevR] = stack.pop()
            stack.push([prevL, Math.max(r, prevR)])
        } else {
            stack.push([l, r])
        }
    }
    return stack
}

const mergeIfClose = (intervals) => {
    // merge overlapping intervals
    let stack = []
    for (let [l, r] of intervals) {
        if (stack.length && stack.at(-1)[1] + 1 == l) {
            let [prevL,] = stack.pop()
            stack.push([prevL, r])
        } else {
            stack.push([l, r])
        }
    }
    return stack
}

const findImpossibleBeacon = (r1, c1, r2, c2, rowToImpoBeacon, MAX_VAL) => {
    // r1,c1 = sensor
    // r2,c2 = beacon
    let shortestDist = Math.abs(r2 - r1) + Math.abs(c2 - c1)

    let minR = Math.max(0, r1 - shortestDist)
    let maxR = Math.min(MAX_VAL, r1 + shortestDist)

    // check row & above
    for (let targetR = minR; targetR <= maxR; targetR++) {
        if (!rowToImpoBeacon.has(targetR)) rowToImpoBeacon.set(targetR, [])

        let remainDist = shortestDist - Math.abs(targetR - r1)
        let lower = Math.max(0, c1 - remainDist)
        let upper = Math.min(MAX_VAL, c1 + remainDist)
        rowToImpoBeacon.get(targetR).push([lower, upper])
    }
}

const solve = (coords, MAX_VAL) => {

    let beacons = new Set()
    let sensors = []

    for (let [r1, c1, r2, c2] of coords) {
        beacons.add(`${r2},${c2}`)
        sensors.push([r1, c1])
    }
    beacons = [...beacons].map(s => s.split(',').map(Number))

    console.log({ beacons })
    // console.log({ sensors })

    let rowToImpoBeacon = new Map()

    // find eachRow, imposible range
    for (let i = 0; i < coords.length; i++) {
        console.log({ i })
        let [r1, c1, r2, c2] = coords[i]
        findImpossibleBeacon(r1, c1, r2, c2, rowToImpoBeacon, MAX_VAL)
    }

    // console.log(rowToImpoBeacon)


    // add used space by Beacon/Sensor
    console.log("adding spaced used by beacons/sensors")
    sensors.forEach(([r, c]) => {
        if (r < 0 || r > MAX_VAL) return
        if (c < 0 || c > MAX_VAL) return
        rowToImpoBeacon.get(r).push([c, c])
    })
    beacons.forEach(([r, c]) => {
        if (r < 0 || r > MAX_VAL) return
        if (c < 0 || c > MAX_VAL) return
        rowToImpoBeacon.get(r).push([c, c])
    })


    // merge intervals
    console.log("merging interval overlap")
    for (let [r, interval] of rowToImpoBeacon) {
        rowToImpoBeacon.set(r, mergeOverlap(interval))
    }

    // merge intervals by 1
    console.log("merging by 1 offset")
    for (let [r, interval] of rowToImpoBeacon) {
        rowToImpoBeacon.set(r, mergeIfClose(interval))
    }

    // console.log(rowToImpoBeacon)

    let res = 0
    for (let [r, interval] of rowToImpoBeacon) {
        if (r < 0 || r >= MAX_VAL) continue
        if(interval.length <= 1) continue
        console.log({ r }, interval)    // { r: 2625406 } [ [ 0, 2740278 ], [ 2740280, 4000000 ] ]
        let X = interval[0][1] + 1
        let Y = r
        res = 4000000 * X + Y
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

    // let MAX_VAL = 20        // sample.txt
    let MAX_VAL = 4000000    // input.txt
    let coords = extractData(rawFile)

    let res = solve(coords, MAX_VAL)
    console.log(res)

    return res
    // expected sample.txt = 56000011 
    // expected input.txt = 10961118625406
}

main()