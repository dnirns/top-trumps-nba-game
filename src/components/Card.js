import React from 'react'

const Card = ({ playerCards, isLoaded, handleSelection, }) => {
  return (
    <div>
      <>
        <h2 className='text-2xl p-4 text-gray-600'>Current Card:</h2>

        <div className='flex flex-col border-gray-500 rounded-lg shadow-2xl flex-1  py-4 px-28 justify-center items-center mx-20'>
          {playerCards.length > 0 && (
            <>
              <div className=''>
                <div className='flex flex-col py-4 items-center w-full flex-1'>
                  {isLoaded === true && (
                    <>
                      <h3 className='text-xl text-gray-700 py-4 font-bold w-full'>
                        {playerCards[0].firstName} {playerCards[0].lastName}
                      </h3>
                      <div className='text-gray-50 flex flex-col'>
                        <button
                          className='my-3 px-4 py-2 bg-blue-400 hover:bg-blue-300'
                          value='shooting'
                          onClick={handleSelection}
                        >
                          Shooting: {playerCards[0].shooting}
                        </button>
                        <button
                          className='my-3 px-4 py-2 bg-blue-400 hover:bg-blue-300'
                          value='dribbling'
                          onClick={handleSelection}
                        >
                          Handles: {playerCards[0].dribbling}
                        </button>
                        <button
                          className='my-3 px-4 py-2 bg-blue-400 hover:bg-blue-300'
                          value='passing'
                          onClick={handleSelection}
                        >
                          Passing: {playerCards[0].passing}
                        </button>
                        <button
                          className='my-3 px-4 py-2 bg-blue-400 hover:bg-blue-300'
                          value='blocks'
                          onClick={handleSelection}
                        >
                          Blocks: {playerCards[0].block}
                        </button>
                        <button
                          className='my-3 px-4 py-2 bg-blue-400 hover:bg-blue-300'
                          value='dunking'
                          onClick={handleSelection}
                        >
                          Dunking: {playerCards[0].dunking}
                        </button>
                        <button
                          className='my-3 px-4 py-2 bg-blue-400 hover:bg-blue-300'
                          value='steals'
                          onClick={handleSelection}
                        >
                          Steals: {playerCards[0].steal}
                        </button>
                        <button
                          className='my-3 px-4 py-2 bg-blue-400 hover:bg-blue-300'
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
