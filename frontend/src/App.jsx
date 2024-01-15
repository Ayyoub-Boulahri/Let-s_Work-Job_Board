import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Acceuil from './pages/acceuil'
import Profile from './pages/profile'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Jobs from './pages/Jobs'
import Companies from './pages/companies'
import { Provider } from 'react-redux';
import { authStore } from './stores/authStore'
import Company from './pages/company'

function App() {
  return (
    <>
      <Provider store={authStore}>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path='/' element={<Acceuil />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/jobs' element={<Jobs />} />
            <Route path='/companies' element={<Companies />} />
            <Route path='/companies/company/:id' element={<Company />} />
            <Route path='*' element={<div>error 404</div>} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
