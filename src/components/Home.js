import React from 'react'
import { Link } from 'react-router-dom'
import Loader from './Loader'

const Home = () => {
  return (
    <div className='container mx-auto text-center flex flex-col h-screen'>
      <div className='flex flex-col flex-1 h-full justify-around items-center'>
        <div>
          <p className='text-9xl font-bold py-3 text-blue-700'>NBA</p>
          <p className='text-3xl font-bold py-3 text-gray-800'>Top Trumps *</p>
        </div>

        <Link to='/game'>
          <button className='text-xl bg-blue-900 active:bg-blue-800 text-gray-50 font-bold px-8 py-5 rounded-lg shadow-lg'>
            PLAY A GAME
          </button>
        </Link>

        <p className='text-xs px-8'>
          * disclaimer, not afiliated with the NBA or Top Trumps, (please don't
          sue me).
        </p>
      </div>
    </div>
  )
}

export default Home
