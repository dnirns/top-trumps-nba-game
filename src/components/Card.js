import React from 'react'

import { IoPerson, IoGameControllerSharp } from 'react-icons/io5'

const Card = ({
  playerCards,
  computerCards,
  isLoaded,
  handleSelection,
  winnerText,
  winnerCurrent,
  loserCurrent,
  chosenAttribute,
  gameOver,
  lastCardMsg,
  winnerAttribute,
  loserAttribute,
}) => {
  const whoWonMessage =
    lastCardMsg === true && gameOver === false ? (
      <div className='p-4 text-center flex flex-col items-center'>
        <p className='text-base py-4'>
          <strong>
            {winnerCurrent.player.firstName} {winnerCurrent.player.lastName}
          </strong>{' '}
          beat{' '}
          <strong>
            {loserCurrent.player.firstName} {loserCurrent.player.lastName}
          </strong>{' '}
          at <strong>{chosenAttribute}</strong>
          <br /> <strong>{winnerAttribute}</strong> vs{' '}
          <strong>{loserAttribute}</strong>
        </p>
      </div>
    ) : (
      <p className='text-sm px-4'>SELECT A PLAYERS ATTRIBUTE:</p>
    )

  return (
    <div className='container mx-auto ween py-10 card'>
      <>
        <div className='flex flex-col'>
          <div className='flex text-center justify-between items-around px-8 mb-4'>
            <div className='flex flex-col items-center justify-center'>
              <p className='text-3xl md:text-6xl'>
                <IoPerson />
              </p>
              <p className='text-lg pt-4 md:text-2xl font-bold'>
                {playerCards.length}
              </p>
            </div>
            <div>
              <p className='text-6xl md:text-8xl'>{winnerText}</p>
            </div>
            <div>
              <p className='text-3xl md:text-6xl'>
                <IoGameControllerSharp />
              </p>
              <p className='text-lg pt-4 md:text-2xl font-bold'>
                {computerCards.length}
              </p>
            </div>
          </div>
        </div>

        {whoWonMessage}

        <div className='flex items-end justify-center'>
          {playerCards.length > 0 && (
            <>
              <div className=''>
                <div className='flex flex-col py-2 items-center w-full jusify-between items-between'>
                  {isLoaded === true && (
                    <>
                      <p className='text-4xl text-gray-700 py-1 font-bold w-full'>
                        {playerCards[0].player.firstName}{' '}
                        {playerCards[0].player.lastName}
                      </p>
                      <p className='text-lg'>
                        of the{' '}
                        <span className='text-xl font-bold text-gray-600 py-1'>
                          {playerCards[0].team}
                        </span>
                      </p>
                      <div className='text-base md:text-lg text-gray-50 flex flex-wrap justify-center pt-8'>
                        <button
                          className='card-btn'
                          value='Shooting'
                          onClick={handleSelection}
                        >
                          Shooting: {playerCards[0].player.shooting}
                        </button>
                        <button
                          className='card-btn'
                          value='Dribbling'
                          onClick={handleSelection}
                        >
                          Handles: {playerCards[0].player.dribbling}
                        </button>
                        <button
                          className='card-btn'
                          value='Passing'
                          onClick={handleSelection}
                        >
                          Passing: {playerCards[0].player.passing}
                        </button>
                        <button
                          className='card-btn'
                          value='Blocks'
                          onClick={handleSelection}
                        >
                          Blocks: {playerCards[0].player.block}
                        </button>
                        <button
                          className='card-btn'
                          value='Dunking'
                          onClick={handleSelection}
                        >
                          Dunking: {playerCards[0].player.dunking}
                        </button>
                        <button
                          className='card-btn'
                          value='Steals'
                          onClick={handleSelection}
                        >
                          Steals: {playerCards[0].player.steal}
                        </button>
                        <button
                          className='card-btn'
                          value='Rebounds'
                          onClick={handleSelection}
                        >
                          Rebounds: {playerCards[0].player.rebound}
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </>
    </div>
  )
}

export default Card
