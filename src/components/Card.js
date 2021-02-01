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
}) => {
  const whoWonMessage =
    lastCardMsg === true && gameOver === false ? (
      <div className='p-4 text-center flex flex-col items-center'>
        <p className='text-base py-4'>
          <strong>
            {winnerCurrent.firstName} {winnerCurrent.lastName}
          </strong>{' '}
          beat{' '}
          <strong>
            {loserCurrent.firstName} {loserCurrent.lastName}
          </strong>{' '}
          at <strong>{chosenAttribute}</strong>
        </p>
      </div>
    ) : (
      <p className='text-sm px-4'>SELECT A PLAYERS ATTRIBUTES ATTRIBUTE:</p>
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
                      <h3 className='text-4xl text-gray-700 py-6 font-bold w-full'>
                        {playerCards[0].firstName} {playerCards[0].lastName}
                      </h3>
                      <div className='text-base md:text-lg text-gray-50 flex flex-wrap justify-center'>
                        <button
                          className='w-5/12 m-3 p-5 bg-blue-900 hover:bg-opacity-70'
                          value='shooting'
                          onClick={handleSelection}
                        >
                          Shooting: {playerCards[0].shooting}
                        </button>
                        <button
                          className='w-5/12  m-3 p-5 bg-blue-900 hover:hover:bg-opacity-70'
                          value='dribbling'
                          onClick={handleSelection}
                        >
                          Handles: {playerCards[0].dribbling}
                        </button>
                        <button
                          className='w-5/12  m-3 p-5 bg-blue-900 hover:bg-opacity-70'
                          value='passing'
                          onClick={handleSelection}
                        >
                          Passing: {playerCards[0].passing}
                        </button>
                        <button
                          className='w-5/12 m-3 p-5 bg-blue-900 hover:bg-opacity-70'
                          value='blocks'
                          onClick={handleSelection}
                        >
                          Blocks: {playerCards[0].block}
                        </button>
                        <button
                          className='w-5/12 m-3 p-5 bg-blue-900 hover:bg-opacity-70'
                          value='dunking'
                          onClick={handleSelection}
                        >
                          Dunking: {playerCards[0].dunking}
                        </button>
                        <button
                          className='w-5/12 m-3 p-5 bg-blue-900 hover:bg-opacity-70'
                          value='steals'
                          onClick={handleSelection}
                        >
                          Steals: {playerCards[0].steal}
                        </button>
                        <button
                          className='w-5/12  m-3 p-5 bg-blue-900 hover:bg-opacity-70'
                          value='rebounds'
                          onClick={handleSelection}
                        >
                          Rebounds: {playerCards[0].rebound}
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
