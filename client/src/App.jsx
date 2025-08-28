import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import UserSignup from './pages/UserSignup'
import UserLogin from './pages/UserLogin'
import Captainlogin from './pages/Captainlogin'
import CaptainSignup from './pages/CaptainSignup'

const App = () => {
  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/signup' element={<UserSignup/>}/>
      <Route path='/login' element={<UserLogin/>}/>
      <Route path='/captain-login' element={<Captainlogin/>}/>
      <Route path='/captain-signup' element={<CaptainSignup/>}/>
    </Routes>
      </>
  )
}

export default App