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
import JobOffer from './pages/JobOffer'
import JobRequests from './pages/JobRequests'
import Profiles from './pages/Profiles'
import JobListings from './pages/JobListings'
import NewOffer from './pages/NewOffer'
import ProfileEmployee from './pages/ProfileEmployee'

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
            <Route path='/companies/company/:company_id' element={<Company />} />
            <Route path='/profiles/profile/:profile_id' element={<ProfileEmployee />} />
            <Route path='/jobs/job/:job_id' element={<JobOffer />} />
            <Route path='/jobRequests' element={<JobRequests />} />
            <Route path='/Profiles' element={<Profiles />} />
            <Route path='/profiles/profile/:profile_id' element={<ProfileEmployee />} />
            <Route path='/jobListings' element={<JobListings />} />
            <Route path='/newOffer' element={<NewOffer />} />
            <Route path='*' element={<div>error 404</div>} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
