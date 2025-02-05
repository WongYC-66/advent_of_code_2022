// https://adventofcode.com/2022/day/11
const { readFile } = require("../lib.js")

const extractData = (rawFile) => {
    let s = rawFile
    rawFile.push('')

    let monkeys = []
    let monkey = {}

    for (let i = 0; i < rawFile.length; i) {
        if (s[i] == '') {
            monkeys.push(monkey)
            monkey = {}
        } else {
            // monkey
            // i , monkeyId
            // i + 1 = starting items
            let starts = s[i + 1].split(':').at(-1).trim()
            monkey['start'] = starts.split(', ').map(Number)

            // i + 2 = operant + constant
            let hasPlus = s[i + 2].includes('+')
            if (hasPlus) {
                monkey['op'] = '+'
            } else {
                monkey['op'] = '*'
            }
            let lastSpaceI = s[i + 2].lastIndexOf(' ')
            monkey['opConstant'] = s[i + 2].slice(lastSpaceI + 1,)

            // i + 3 = test value
            let testVal = s[i + 3].split(' ').at(-1)
            monkey['testVal'] = Number(testVal)

            // i + 4 = nextTrue
            let nextTrue = s[i + 4].split(' ').at(-1)
            monkey['nextTrue'] = Number(nextTrue)

            // i + 5 = nextFalse
            let nextFalse = s[i + 5].split(' ').at(-1)
            monkey['nextFalse'] = Number(nextFalse)

            i += 5
        }

        i += 1
    }

    return monkeys
}

const solve = (monkeys) => {
    console.log(monkeys)
    let monkeySize = monkeys.length

    let MAX_ROUND = 10000
    let monkeyCount = {}

    let commonMod = 1
    monkeys.forEach(m => commonMod *= m.testVal)

    for (let round = 0; round < MAX_ROUND; round++) {

        for(let i = 0 ; i < monkeySize ; i++){
            let {start, op, opConstant, testVal, nextTrue,nextFalse} = monkeys[i]

            let itemSize = start.length
            monkeyCount[i] ??= 0
            monkeyCount[i] += itemSize

            for(let j = 0 ; j < itemSize ; j++){
                let n = start.shift()
                let opVal = opConstant == 'old' ? n : Number(opConstant)
                let nextN = op == '+' ? n + opVal : n * opVal 
                // nextN = Math.floor(nextN / 3)
                nextN %= commonMod

                if(nextN % testVal === 0){
                    monkeys[nextTrue]['start'].push(nextN)
                    // console.log(nextN, ' => ', nextTrue)
                } else {
                    monkeys[nextFalse]['start'].push(nextN)
                    // console.log(nextN, ' => ', nextFalse)
                }   
            }

        }
        
        // console.log({round})
        // monkeys.forEach(m => console.log(m.start))

    }
    
    console.log(monkeyCount)

    let counts = Object.values(monkeyCount).sort((a, b) => a - b)
    return counts.at(-1) * counts.at(-2)
}

const main = async () => {
    // let rawFile = await readFile("sample.txt")
    let rawFile = await readFile("input.txt")
    rawFile = rawFile
        .replaceAll("\r", "")
        .split("\n")
    console.log(rawFile)

    let monkeys = extractData(rawFile)

    let res = solve(monkeys)
    console.log(res)
    return res
    // expected sample.txt = 2713310158
    // expected input.txt = 12729522272
    
}

main()