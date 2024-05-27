import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Acceuil from './pages/acceuil'
import Profile from './pages/profile'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Jobs from './pages/Jobs'
import Companies from './pages/Companies'
import { Provider } from 'react-redux';
import { authStore } from './stores/authStore'
import Company from './pages/Company'
import JobOffer from './pages/JobOffer'
import JobRequests from './pages/JobRequests'
import Profiles from './pages/Profiles'
import JobListings from './pages/JobListings'
import NewOffer from './pages/NewOffer'
import ProfileEmployee from './pages/ProfileEmployee'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import Error404Page from './pages/Error404Page'
import EditJobOffer from './pages/EditJobOffer'

function App() {
  const client = new QueryClient()
  return (
    <>
      <Provider store={authStore}>
        <QueryClientProvider client={client}>
          <BrowserRouter>
            <NavBar />
            <Routes>
              <Route path='/' element={<Acceuil />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/jobs' element={<Jobs />} />
              <Route path='/companies' element={<Companies />} />
              <Route path='/companies/company/:company_id' element={<Company />} />
              <Route path='/jobs/job/:job_id' element={<JobOffer />} />
              <Route path='/jobRequests' element={<JobRequests />} />
              <Route path='/Profiles' element={<Profiles />} />
              <Route path='/profiles/profile/:employee_id' element={<ProfileEmployee />} />
              <Route path='/jobListings' element={<JobListings />} />
              <Route path='/newOffer' element={<NewOffer />} />
              <Route path='/editJobOffer/:jobOfferId' element={<EditJobOffer />} />
              <Route path='*' element={<Error404Page />} />
            </Routes>
            <Footer />
          </BrowserRouter>
        </QueryClientProvider>
      </Provider>
    </>
  )
}

export default App
