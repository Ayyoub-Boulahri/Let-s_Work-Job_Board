import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Accueil from './pages/Accueil'
import Footer from './components/accueilComponents/Footer'
import Navbar from './components/Navbar'
import Requests from './pages/Requests'
import JobOffers from './pages/JobOffers'
import Users from './pages/Users'

function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
          <Routes>
            <Route path='/' element={<Accueil />} />
            <Route path='/Requests' element={<Requests />} />
            <Route path='/jobOffers' element={<JobOffers />} />
            <Route path='/Users' element={<Users />} />
            <Route path='*' element={<div>error 404</div>} />
          </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
