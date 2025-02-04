// https://adventofcode.com/2022/day/9
const { readFile } = require("../lib.js")

const extractData = (rawFile) => {
    let steps = []
    for (let s of rawFile) {
        let [dir, step] = s.split(' ')
        steps.push([dir, Number(step)])
    }
    return steps
}

const moveT = (T, H) => {
    let dr = H[0] - T[0];
    let dc = H[1] - T[1];

    if (Math.abs(dr) > 1 || Math.abs(dc) > 1) {
        // Move tail closer to head
        return [T[0] + Math.sign(dr), T[1] + Math.sign(dc)];
    }
    return T;
};

const solve = (steps) => {
    let dirs = {
        'R': [0, +1],
        'L': [0, -1],
        'U': [+1, 0],
        'D': [-1, 0],
    };

    let visitedT = new Set();
    let H = [0, 0];
    let T = Array.from(Array(9), () => [0, 0]);

    visitedT.add(`${0},${0}`);

    for (let [dir, step] of steps) {
        let [dr, dc] = dirs[dir];
        for (let i = 0; i < step; i++) {
            H = [H[0] + dr, H[1] + dc];
            T[0] = moveT(T[0], H);

            for (let i = 0; i < 8; i++) {
                T[i + 1] = moveT(T[i + 1], T[i]);
            }

            let lastT = T.at(-1);
            visitedT.add(`${Math.round(lastT[0])},${Math.round(lastT[1])}`);
        }
    }
    return visitedT.size;
};

const main = async () => {
    // let rawFile = await readFile("sample.txt")
    // let rawFile = await readFile("sample2.txt")
    let rawFile = await readFile("input.txt")
    rawFile = rawFile
        .replaceAll("\r", "")
        .split("\n")
    console.log(rawFile)

    let steps = extractData(rawFile)

    let res = solve(steps)
    console.log(res)
    return res
    // expected sample.txt = 36
    // expected input.txt = 2665
}

main()