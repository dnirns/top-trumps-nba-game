import React from 'react'
import { HiMenu } from 'react-icons/hi'

const Nav = () => {
  return (
    <div className='w-screen bg-opacity-0 fixed flex py-3 px-4 text-gray-900 text-4xl'>
      <HiMenu className='cursor-pointer' />
    </div>
  )
}

export default Nav
