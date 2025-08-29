import React from 'react'
import { Routes,Route } from 'react-router-dom'
import StartPage from './pages/StartPage'
import UserSignup from './pages/UserSignup'
import UserLogin from './pages/UserLogin'
import Captainlogin from './pages/Captainlogin'
import CaptainSignup from './pages/CaptainSignup'
import Home from './pages/Home'
import ProtectedWrapper from './pages/ProtectedWrapper'

import UserLogout from './pages/UserLogout'

const App = () => {
  return (
    <>
    <Routes>
      <Route path='/' element={<StartPage/>}/>
      <Route path='/signup' element={<UserSignup/>}/>
      <Route path='/login' element={<UserLogin/>}/>
      <Route path='/captain-login' element={<Captainlogin/>}/>
      <Route path='/captain-signup' element={<CaptainSignup/>}/>
      <Route path='/home' element={
        <ProtectedWrapper>
          <Home/>
        </ProtectedWrapper>
      }/>
         <Route path='/user-logout' element={<ProtectedWrapper>
          <UserLogout/>
         </ProtectedWrapper>}/>
    </Routes>
 
      </>
  )
}

export default App