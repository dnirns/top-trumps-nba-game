import React, { useState, useEffect } from 'react'
import data from '../data/data.json'
import Loader from './Loader'
import Card from './Card'

const Game = () => {
  const [playerCards, setPlayerCards] = useState([])
  const [computerCards, setComputerCards] = useState([])
  const [playerScore, setPlayerScore] = useState()
  const [computerScore, setComputerScore] = useState()
  const [isLoaded, setIsLoaded] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [winnerText, setWinnerText] = useState('')
  const [winnerCurrent, setWinnerCurrent] = useState({})
  const [loserCurrent, setLoserCurrent] = useState({})
  const [chosenAttribute, setChosenAttribute] = useState('')

  const [spinner, setSpinner] = useState(false)

  const [lastCardMsg, setLastCardMsg] = useState(false)

  //arrays to hold randomly shuffled cardData objects and shuffled deck split into two for each hand

  //converts data object from json into array of objects

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
    const dataArray = Object.keys(data).map((key) => {
      return data[key]
    })
    const split = () => {
      const halfDeck = Math.ceil(shuffledDeck.length / 2)
      playerDeck = shuffledDeck.splice(0, halfDeck)
      computerDeck = [...shuffledDeck]
      setPlayerCards(playerDeck)
      setComputerCards(computerDeck)
    }
    let counter = dataArray.length
    while (counter > 0) {
      let index = Math.floor(Math.random() * counter)
      counter--
      let temp = dataArray[counter]
      dataArray[counter] = dataArray[index]
      dataArray[index] = temp
    }
    shuffledDeck = [...dataArray]
    console.log(shuffledDeck)
    split()
    setSpinner(true)
    setTimeout(() => {
      setIsLoaded(true)
      setSpinner(false)
    }, 5000)
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
    setComputerScore(0)
    setPlayerScore(0)
    setPlayerCards([])
    setPlayerCards([])
  }

  //compare attributes
  const handleSelection = (e) => {
    const value = e.target.value
    let player = 0
    let comp = 0
    if (value === 'shooting') {
      player = playerCards[0].shooting
      comp = computerCards[0].shooting
    } else if (value === 'dribbling') {
      player = playerCards[0].dribbling
      comp = computerCards[0].dribbling
    } else if (value === 'passing') {
      player = playerCards[0].passing
      comp = computerCards[0].passing
    } else if (value === 'blocks') {
      player = playerCards[0].block
      comp = computerCards[0].block
    } else if (value === 'dunking') {
      player = playerCards[0].dunking
      comp = computerCards[0].dunking
    } else if (value === 'steals') {
      player = playerCards[0].steal
      comp = computerCards[0].steal
    } else if (value === 'rebounds') {
      player = playerCards[0].rebound
      comp = computerCards[0].rebound
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

    setChosenAttribute(e.target.value)

    setLastCardMsg(true)
    setIsLoaded(true)
  }

  //smaller JSX bits to conditionally render

  const winner = gameOver && <div>{winnerText}</div>

  const whoWonMessage = lastCardMsg === true && gameOver === false && (
    <h4>
      {winnerText} - {winnerCurrent.firstName} {winnerCurrent.lastName} beats{' '}
      {loserCurrent.firstName} {loserCurrent.lastName} in {chosenAttribute}...
    </h4>
  )

  const startButton = !isLoaded && (
    <div className='container mx-auto flex flex-col text-center flex-1 h-screen items-center justify-center leading-8'>
      <p className='text-md px-8 my-20'>
        Shuffle the deck of <strong>240</strong> NBA player and split them
        evenly between you and your computer opponent to begin:
      </p>

      {!spinner ? (
        <button
          onClick={shuffle}
          className='text-2xl bg-black text-white font-bold p-3 shadow hover:bg-opacity-80 w-1/2 item-center'
        >
          DEAL CARDS
        </button>
      ) : (
        <p className='text-xl font-bold'>SHUFFLING PLAYERS...</p>
      )}

      {spinner && (
        <div className='my-10 py-10'>
          <Loader />
        </div>
      )}
    </div>
  )

  const resetButton = gameOver === true && (
    <button className='reset-btn' onClick={handleReset}>
      Rematch
    </button>
  )

  return (
    <div className='container mx-auto flex flex-col pt-20 text-center'>
      <div className='text-xl font-bold text-gray-700'>{whoWonMessage}</div>

      {isLoaded && !gameOver && (
        <Card
          playerCards={playerCards}
          isLoaded={isLoaded}
          handleSelection={handleSelection}
        />
      )}

      {startButton}
      {winner}
      {resetButton}
    </div>
  )
}

export default Game
