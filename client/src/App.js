import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Cats from './components/Cats'
import Clients from './components/Client'
import CookieTest from './components/CookieTest'
import Dogs from './components/Dogs'
import LandingPage from './components/LandingPage'
import Login from './components/Login'
import Logout from './components/Logout'
import NavbarCont from './components/Navbar'
import './style.css'

const App = () => {
  return (
    <>
      {<NavbarCont />}
      <Router>
        <Routes>
          <Route path="/" exact element={<Login />} />
          <Route path="/home" element={<LandingPage />} />
          <Route path="/cookie" element={<CookieTest />} />
          <Route path="/http-cats" element={<Cats />} />
          <Route path="/dogs" element={<Dogs />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
