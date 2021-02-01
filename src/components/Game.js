import React, { useState, useEffect } from 'react'
import data from '../data/data.json'

import { TiTick } from 'react-icons/ti'
import { FaSkullCrossbones } from 'react-icons/fa'
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
    }, 4000)
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
    if (value === 'Shooting') {
      player = playerCards[0].shooting
      comp = computerCards[0].shooting
    } else if (value === 'Dribbling') {
      player = playerCards[0].dribbling
      comp = computerCards[0].dribbling
    } else if (value === 'Passing') {
      player = playerCards[0].passing
      comp = computerCards[0].passing
    } else if (value === 'Blocks') {
      player = playerCards[0].block
      comp = computerCards[0].block
    } else if (value === 'Dunking') {
      player = playerCards[0].dunking
      comp = computerCards[0].dunking
    } else if (value === 'Steals') {
      player = playerCards[0].steal
      comp = computerCards[0].steal
    } else if (value === 'Rebounds') {
      player = playerCards[0].rebound
      comp = computerCards[0].rebound
    }
    if (player > comp) {
      setWinnerCurrent(playerCards[0])
      setLoserCurrent(computerCards[0])
      setWinnerText(<TiTick />)
      removeCompCard()
    } else {
      setWinnerCurrent(computerCards[0])
      setLoserCurrent(playerCards[0])
      setWinnerText(<FaSkullCrossbones />)
      removePlayerCard()
    }

    setChosenAttribute(e.target.value)

    setLastCardMsg(true)
    setIsLoaded(true)
  }

  const winner = gameOver && <div>{winnerText}</div>

  const startButton = !isLoaded && (
    <div className='flex flex-col text-center flex-1 h-screen items-center mt-20 leading-8'>
      <p className='text-md px-8 my-10'>
        Click to shuffle the deck of <strong>240</strong> current NBA players
        and split them evenly between you and your computer opponent:
      </p>

      {!spinner ? (
        <button
          onClick={shuffle}
          className='text-xl bg-blue-900 text-gray-50 font-bold px-8 py-5 rounded-lg shadow-lg active:bg-blue-800'
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
    <div className='container mx-auto flex flex-1 h-screen flex-col pt-6 text-center'>
      {isLoaded && !gameOver && (
        <Card
          winnerText={winnerText}
          winnerCurrent={winnerCurrent}
          loserCurrent={loserCurrent}
          chosenAttribute={chosenAttribute}
          playerCards={playerCards}
          computerCards={computerCards}
          isLoaded={isLoaded}
          handleSelection={handleSelection}
          gameOver={gameOver}
          lastCardMsg={lastCardMsg}
        />
      )}

      {startButton}
      {winner}
      {resetButton}
    </div>
  )
}

export default Game
