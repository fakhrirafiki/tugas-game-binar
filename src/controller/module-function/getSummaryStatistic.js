const statisticData = require('../../database/gameHistories.json')

let winnersArr = []
let playerHeroesArr = []
let compHeroesArr = []

statisticData.forEach(item => {
    let winner = item.winner
    winnersArr.push(winner)

    let playerHero = item.playerHeroes
    playerHeroesArr = [...playerHeroesArr, ...playerHero]

    let compHero = item.compHeroes
    compHeroesArr = [...compHeroesArr, ...compHero]
})

let playerWinTimes = winnersArr.filter(winner => {
    return winner === "PLAYER(YOU)"
}).length

let compWinTimes = winnersArr.length - playerWinTimes

let playerWinPercentage = (100 * playerWinTimes / winnersArr.length).toFixed(2);
let compWinPercentage = (100 - playerWinPercentage).toFixed(2);

let playerRockCount = playerHeroesArr.filter(hero => {
    return hero === "Rock"
}).length

let playerPaperCount = playerHeroesArr.filter(hero => {
    return hero === "Paper"
}).length

let playerScissorsCount = playerHeroesArr.filter(hero => {
    return hero === "Scissors"
}).length

let compRockCount = compHeroesArr.filter(hero => {
    return hero === "Rock"
}).length

let compPaperCount = compHeroesArr.filter(hero => {
    return hero === "Paper"
}).length

let compScissorsCount = compHeroesArr.filter(hero => {
    return hero === "Scissors"
}).length

let playerRockPercentage = playerRockCount / (playerHeroesArr.length)
let playerPaperPercentage = playerPaperCount / (playerHeroesArr.length)
let playerScissorsPercentage = playerScissorsCount / (playerHeroesArr.length)

let compRockPercentage = compRockCount / (compHeroesArr.length)
let compPaperPercentage = compPaperCount / (compHeroesArr.length)
let compScissorsPercentage = compScissorsCount / (compHeroesArr.length)

const summaryStat = {
    match: statisticData.length,
    playerWinTimes: playerWinTimes,
    compWinTimes: compWinTimes,
    playerWinPercentage: playerWinPercentage,
    compWinPercentage: compWinPercentage,
    playerRockCount: playerRockCount,
    playerPaperCount: playerPaperCount,
    playerScissorsCount: playerScissorsCount,
    compRockCount: compRockCount,
    compPaperCount: compPaperCount,
    compScissorsCount: compScissorsCount,
    playerRockPercentage: (playerRockPercentage * 100).toFixed(2),
    playerPaperPercentage: (playerPaperPercentage * 100).toFixed(2),
    playerScissorsPercentage: (playerScissorsPercentage * 100).toFixed(2),
    compRockPercentage: (compRockPercentage * 100).toFixed(2),
    compPaperPercentage: (compPaperPercentage * 100).toFixed(2),
    compScissorsPercentage: (compScissorsPercentage * 100).toFixed(2)
}

module.exports = summaryStat;