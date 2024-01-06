import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Acceuil from './pages/acceuil'
import Profile from './pages/profile'
import NavBar from './components/NavBar'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <NavBar />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Acceuil />}/>
          <Route path='/profile' element={<Profile />}/>
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  )
}

export default App
