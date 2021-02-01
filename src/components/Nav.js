import React from 'react'
import { HiMenu } from 'react-icons/hi'

const Nav = () => {
  return (
    <div className='w-screen bg-black  fixed flex py-2 px-4 text-gray-50 text-2xl shadow-xl'>
      <HiMenu className='cursor-pointer' />
    </div>
  )
}

export default Nav
