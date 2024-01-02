import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Acceuil from './pages/acceuil'
import Profile from './pages/profile'
import NavBar from './components/NavBar'

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
    </>
  )
}

export default App
