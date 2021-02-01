import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './components/Home'
import Game from './components/Game'
import Nav from './components/Nav'

import '../src/styles/styles.css'

export default function App() {
  return (
    <div className='w-screen height-screen bg-gray-gray-100'>
      <Nav />
      <Router>
        <Route path='/' exact component={Home} />
        <Route path='/game' component={Game} />
      </Router>
    </div>
  )
}
