import React from 'react'
import { Link } from 'react-router-dom'
import Loader from './Loader'

const Home = () => {
  return (
    <div className='container mx-auto text-center flex flex-col h-screen'>
      <div className='flex flex-col flex-1 h-full justify-around items-center'>
        <div>
          <p className='text-9xl font-bold py-3 text-blue-600'>NBA</p>
          <p className='text-3xl font-bold py-3'>Top Trumps *</p>
        </div>

        <Link to='/game'>
          <button className='text-2xl bg-black text-white font-bold px-4 py-3 shadow hover:bg-opacity-80'>
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
