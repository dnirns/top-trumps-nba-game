import React, { useState, useEffect } from 'react'

import cardData from '../data/cardData'
import data from '../data/data.json'

import NbaDataMap from '../components/NbaDataMap'

const Game = () => {
  const [playerCards, setPlayerCards] = useState([])
  const [computerCards, setComputerCards] = useState([])
  const [playerScore, setPlayerScore] = useState(cardData.length / 2)
  const [computerScore, setComputerScore] = useState(cardData.length / 2)
  const [isLoaded, setIsLoaded] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [winnerText, setWinnerText] = useState('')
  const [winnerCurrent, setWinnerCurrent] = useState({})
  const [loserCurrent, setLoserCurrent] = useState({})
  const [attributeCurrent, setAttributeCurrent] = useState('')

  const [lastCardMsg, setLastCardMsg] = useState(false)

  //arrays to hold randomly shuffled cardData objects and shuffled deck split into two for each hand
  let shuffledDeck = []
  let playerDeck = []
  let computerDeck = []

  useEffect(() => {
    if (playerScore === 0 || computerScore === 0) {
      setGameOver(true)
      playerScore === 0
        ? setWinnerText('You got beat 😭')
        : setWinnerText('You won 🥳')
    } else {
      return
    }
  }, [playerScore, computerScore])

  //shuffling and splitting the deck into two hands from cardData.js
  const shuffle = () => {
    const split = () => {
      const halfDeck = Math.ceil(shuffledDeck.length / 2)
      playerDeck = shuffledDeck.splice(0, halfDeck)
      computerDeck = [...shuffledDeck]
      setPlayerCards(playerDeck)
      setComputerCards(computerDeck)
    }
    let counter = cardData.length
    while (counter > 0) {
      let index = Math.floor(Math.random() * counter)
      counter--
      let temp = cardData[counter]
      cardData[counter] = cardData[index]
      cardData[index] = temp
    }
    shuffledDeck = [...cardData]
    split()
    setIsLoaded(true)
    console.log('player starting deck:')
    console.log(playerDeck)
    console.log('computer starting deck')
    console.log(computerDeck)
  }

  //functions to handle adding/removing of cards when one wins/loses

  const removeCompCard = () => {
    //move current player card to end of array
    playerCards.push(playerCards.shift())
    setPlayerCards([...playerCards])
    //remove first comp card & store in const, then set comp cards array to itself
    const removedCard = computerCards.shift()
    setComputerCards([...computerCards])
    //add removed comp card to end of player cards array, then set player cards to itself
    playerCards.push(removedCard)
    setPlayerCards([...playerCards])
    //update score - all the cards in each hand (length of array)
    setComputerScore(computerCards.length)
    setPlayerScore(playerCards.length)
    if (playerCards === 0 || computerCards === 0) {
      setIsLoaded(false)
    }
  }

  const removePlayerCard = () => {
    computerCards.push(computerCards.shift())
    setComputerCards([...computerCards])
    const removedCard = playerCards.shift()
    setPlayerCards([...playerCards])
    computerCards.push(removedCard)
    setComputerCards([...computerCards])
    setComputerScore(computerCards.length)
    setPlayerScore(playerCards.length)
    if (playerCards === 0 || computerCards === 0) {
      setIsLoaded(false)
    }
  }

  const handleReset = () => {
    setIsLoaded(false)
    setGameOver(false)
    setLastCardMsg(false)
    setComputerScore(cardData.length / 2)
    setPlayerScore(cardData.length / 2)
    setPlayerCards([])
    setPlayerCards([])
  }

  //compare attributes
  const handleSelection = (e) => {
    const value = e.target.value
    let player = null
    let comp = null
    if (value === 'health') {
      player = playerCards[0].health
      comp = computerCards[0].health
    } else if (value === 'strength') {
      player = playerCards[0].strength
      comp = computerCards[0].strength
    } else if (value === 'attack') {
      player = playerCards[0].attack
      comp = computerCards[0].attack
    } else if (value === 'speed') {
      player = playerCards[0].speed
      comp = computerCards[0].speed
    } else if (value === 'defence') {
      player = playerCards[0].defence
      comp = computerCards[0].defence
    }
    if (player > comp) {
      setWinnerCurrent(playerCards[0])
      setLoserCurrent(computerCards[0])
      setWinnerText('You won')
      removeCompCard()
    } else {
      setWinnerCurrent(computerCards[0])
      setLoserCurrent(playerCards[0])
      setWinnerText('You lost')
      removePlayerCard()
    }
    console.log('new player deck:')
    console.log(playerCards)
    console.log('new computer deck:')
    console.log(computerCards)
    setLastCardMsg(true)
  }

  //smaller JSX bits to conditionally render

  const winner = gameOver && <div>{winnerText}</div>

  const whoWonMessage = lastCardMsg === true && gameOver === false && (
    <h4>
      {winnerText}, {winnerCurrent.name} beat {loserCurrent.name}
    </h4>
  )

  const startButton = !isLoaded && (
    <button className="shuffle-button" onClick={shuffle}>
      Deal Cards
    </button>
  )

  const resetButton = gameOver === true && (
    <button className="reset-btn" onClick={handleReset}>
      Rematch
    </button>
  )

  return (
    <div className="container">
      <div className="result">{whoWonMessage}</div>

      <div className="game">
        {isLoaded && !gameOver && (
          <>
            <div className="cards-wrapper">
              {playerCards.length > 0 && (
                <>
                  <div className="card-info">
                    <div className="card">
                      {isLoaded === true && (
                        <>
                          <h3>{playerCards[0].name}</h3>
                          <button value="health" onClick={handleSelection}>
                            Health: {playerCards[0].health}
                          </button>
                          <button value="strength" onClick={handleSelection}>
                            Strength: {playerCards[0].strength}
                          </button>
                          <button value="attack" onClick={handleSelection}>
                            Attack: {playerCards[0].attack}
                          </button>
                          <button value="speed" onClick={handleSelection}>
                            Speed: {playerCards[0].speed}
                          </button>
                          <button value="defence" onClick={handleSelection}>
                            Defence: {playerCards[0].defence}
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="card-list">
                    <h3>Your Deck</h3>
                    <h3>{playerScore} Cards</h3>

                    {playerCards.map((card, index) => {
                      return <li key={card.name}>{card.name}</li>
                    })}
                  </div>
                </>
              )}

              {/* {computerCards.length > 0 && (
              <>
                <div>
                  <div>
                    <h2>Computer Cards</h2>
                    {computerCards.map((card, index) => {
                      return (
                        <li key={card.name}>
                          {index} - {card.name}
                        </li>
                      )
                    })}
                  </div>
                  <div className="card">
                    <h3>Computer Current</h3>
                    {isLoaded === true && (
                      <>
                        <h4>{computerCards[0].name}</h4>
                        <p>Health: {computerCards[0].health}</p>
                        <p>Strength: {computerCards[0].strength}</p>
                        <p>Attack: {computerCards[0].attack}</p>
                        <p>Speed: {computerCards[0].speed}</p>
                        <p>Speed: {computerCards[0].defence}</p>
                      </>
                    )}
                  </div>
                </div>
                <div className="score">
                  <h1>{computerScore}</h1>
                </div>
              </>
            )} */}
            </div>
          </>
        )}
      </div>
      {startButton}
      {winner}
      {resetButton}
    </div>
  )
}

export default Game
