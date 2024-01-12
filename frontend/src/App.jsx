import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Acceuil from './pages/acceuil'
import Profile from './pages/profile'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Jobs from './pages/Jobs'
import { createContext, useState } from 'react'

export const SignInContext = createContext()

function App() {
  const [isSignIn, setIsSignIn] = useState(false)
  const [userType, setUserType] = useState("")
  return (
    <>
      <SignInContext.Provider value={{ isSignIn, setIsSignIn, userType, setUserType }}>

        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path='/' element={<Acceuil />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/jobs' element={<Jobs />} />
          </Routes>
          <Footer />
        </BrowserRouter>

      </SignInContext.Provider >
    </>
  )
}

export default App
