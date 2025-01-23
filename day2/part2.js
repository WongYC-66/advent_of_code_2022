// https://adventofcode.com/2022/day/1
const { readFile } = require("../lib.js")

const solve = (rawFile) => {
    let myScore = {
        'rock': 1,
        'paper': 2,
        'scissors': 3
    }

    let myTurn = {
        X: 'lose',    // rock beat by paper
        Y: 'draw',    // paper beat by scissors
        Z: 'win',    // scissors beat by rock
    }

    let turnScore = {
        'lose': 0,
        'draw': 3,
        'win': 6,
    }

    let generalTerm = {
        A: 'rock',
        B: 'paper',
        C: 'scissors',
    }

    let winChoice = {
        'rock': 'paper',
        'paper': 'scissors',
        'scissors': 'rock'
    }

    let loseChoice = {
        'rock': 'scissors',
        'paper': 'rock',
        'scissors': 'paper'
    }


    let res = 0
    for (let s of rawFile) {
        let [opp, turn] = s.split(" ")
        opp = generalTerm[opp]
        turn = myTurn[turn]

        let myChoice = null

        if (turn == 'draw') {
            myChoice = opp
        } else if (turn == 'win') {
            myChoice = winChoice[opp]
        } else {
            myChoice = loseChoice[opp]
        }

        res += myScore[myChoice]
        res += turnScore[turn]
        console.log({ opp, turn, myChoice, res })
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
    // expected sample.txt = 12
    // expected input.txt = 11998
}

main()