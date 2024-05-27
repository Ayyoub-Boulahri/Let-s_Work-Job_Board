import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Acceuil from './pages/acceuil'
import Profile from './pages/profile'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Jobs from './pages/Jobs'
import { Provider } from 'react-redux';
import { authStore } from './stores/authStore'
import Company from './pages/company'
import JobOffer from './pages/JobOffer'
import JobRequests from './pages/JobRequests'
import Profiles from './pages/Profiles'
import JobListings from './pages/JobListings'
import NewOffer from './pages/NewOffer'
import ProfileEmployee from './pages/ProfileEmployee'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import Error404Page from './pages/Error404Page'
import EditJobOffer from './pages/EditJobOffer'
import React, { useEffect, useState } from 'react'
import styles from '../../style'
import CompanyLeading from '../../components/companieComponents/CompanyLeading'
import SearchSection from '../../components/companieComponents/SearchSection'
import { Divider } from "@nextui-org/react";
import { useNavigate } from 'react-router-dom';
import handleLogout from '../../services/handleLogout';
import { useDispatch} from 'react-redux';
import { setLoginOut } from '../../stores/authStore';
import "../../css/height.css"


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




function Companies() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [searchTxt, setSearchTxt] = useState("")

  useEffect(() => {
    const typeUser = localStorage.getItem('typeUser');
    if (typeUser != "employee") {
      handleLogout();
      dispatch(setLoginOut());
      navigate("/");
    }
  }, [])

  return (
    <div className={`${styles.flexStart} ${styles.paddingX} bg-section-dark-bg pt-20 xl:pb-4`}>
      <div className={`${styles.boxWidth} HeightTall`}>
        <CompanyLeading searchTxt={searchTxt} setSearchTxt={setSearchTxt} />
        <Divider className="my-4 bg-[#3D3D3D] sm:block hidden" />
        <SearchSection searchTxt={searchTxt} setSearchTxt={setSearchTxt} />
      </div>
    </div>
  )
}

