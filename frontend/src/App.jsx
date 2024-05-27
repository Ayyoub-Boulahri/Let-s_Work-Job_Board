import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Acceuil from './pages/acceuil'
import Profile from './pages/profile'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Jobs from './pages/Jobs'
import Companies from './pages/companies'
import { Provider } from 'react-redux';
import { authStore } from './stores/authStore'
import JobOffer from './pages/JobOffer'
import JobRequests from './pages/JobRequests'
import Profiles from './pages/Profiles'
import JobListings from './pages/JobListings'
import NewOffer from './pages/NewOffer'
import ProfileEmployee from './pages/ProfileEmployee'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import Error404Page from './pages/Error404Page'
import EditJobOffer from './pages/EditJobOffer'



import { useNavigate, useParams } from 'react-router-dom';
import styles from '../style';
import mac from '../assets/mac.png';
import macCover from '../assets/macCover.webp';
import { Avatar, Button, Spinner } from "@nextui-org/react";
import { useState } from 'react';
import { MdNotificationAdd } from "react-icons/md";
import '../css/Company.css'
import AboutCompany from '../components/companyProfileComponents/AboutCompany';
import CompanyJobOffers from '../components/companyProfileComponents/CompanyJobOffers';
import Suggestions from '../components/companyProfileComponents/Suggestions';
import { MdNotificationsActive } from "react-icons/md";
import "../css/height.css"
import { getCompanyById, updateCompanyCoverPhoto, updateCompanyProfilePhoto } from '../services/companyServices';
import { convertBufferToDataURL, fileToBase64, formatNumFollowers } from '../services/convertFunctions';
import { followCompany, isFollower, unfollowCompany } from '../services/followServices';
import { useSelector } from 'react-redux';
import CompanyProfileInfos from '../components/companyProfileComponents/CompanyProfileInfos';
import { MdEdit } from "react-icons/md";
import FollowersModel from '../components/companyProfileComponents/FollowersModel';
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




function Company() {
  const [isAbout, setIsAbout] = useState(true);
  const [isFollowed, setIsFollowed] = useState(false);
  const { company_id } = useParams();
  const [companyInfos, setCompanyInfos] = useState(null)
  const authInfo = useSelector((state) => state.isAuthenticated.value);
  const [isProfilePhotoHovered, setIsProfilePhotoHovered] = useState(false);
  const [isCoverPhotoHovered, setIsCoverPhotoHovered] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    const chekcisCompany = async () => {
      if (await authInfo?.typeUser === "company") {
        if (company_id != authInfo?.userId)
          navigate("/companies/company/" + authInfo?.userId)
      }
    }
    chekcisCompany()


    const getCompanyInfos = async () => {
      getCompanyById(company_id).then((company) => {
        setCompanyInfos(company.data.companyInfos);
      }).catch((error) => { console.log(error) });
    }

    getCompanyInfos()

    const checkFollow = async () => {
      try {
        const isFollowCompany = await isFollower(company_id, authInfo.userId)
        if (isFollowCompany)
          setIsFollowed(true)
        else
          setIsFollowed(false)
      } catch (error) {
        console.error(error);
      }
    }

    checkFollow()
    window.scrollTo(0, 0);
  }, [authInfo, company_id])

  const handleImageChange = async (event, type) => {
    const photo = event.target.files[0];

    if (photo) {
      const reader = new FileReader();

      reader.readAsDataURL(photo);

      try {
        const formData = new FormData();
        formData.append('file', photo);

        let fileData = formData.get('file');
        let base64String = fileData instanceof Blob ? await fileToBase64(fileData) : fileData;

        const response =
          type == "profile" ? await updateCompanyProfilePhoto(company_id, base64String)
            : await updateCompanyCoverPhoto(company_id, base64String)

        window.location.reload();
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };

  const handleFollow = () => {
    if (!isFollowed) {
      followCompany(company_id, authInfo?.userId)
        .then(() => {
          setCompanyInfos(prev => {
            return {
              ...prev,
              followersCount: prev.followersCount + 1
            };
          });
          setIsFollowed((prev) => !prev)
        })
        .catch((error) => { console.log(error) });
    }
    else {
      unfollowCompany(company_id, authInfo?.userId)
        .then(() => {
          setCompanyInfos(prev => {
            return {
              ...prev,
              followersCount: prev.followersCount - 1
            };
          });
          setIsFollowed((prev) => !prev)
        })
        .catch((error) => { console.log(error) });
    }
  }

  return (
    <div className={`${styles.flexStart} ${styles.paddingX} bg-section-dark-bg pt-20 xl:pb-4`}>
      <div className={`${styles.boxWidth} HeightTall`}>
        {
          !companyInfos
            ? <div className='h-[1000px] flex justify-center items-start'><Spinner size='lg' /> </div>
            : <div className='sm:my-[12px] bg-[#121212] sm:p-4 rounded-md'>  {/* CONTAINER */}
              <div className='bg-image rounded-md' style={{ backgroundImage: `url(${convertBufferToDataURL(companyInfos.company_cover)})`, backgroundSize: "cover", backgroundPosition: "center" }}>
                {/* Cover Photo */}
                <div className='h-[200px] relative'
                  onMouseEnter={() => setIsCoverPhotoHovered(true)}
                  onMouseLeave={() => setIsCoverPhotoHovered(false)}>
                  {isCoverPhotoHovered && authInfo?.typeUser == "company" &&

                    <div className='absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 rounded-tl-md rounded-tr-md'>
                      <label htmlFor='coverUpload' className='flex items-center justify-center w-full h-full cursor-pointer'>
                        <MdEdit color='white' size={40} />
                      </label>
                    </div>
                  }
                  <input
                    type='file'
                    id='coverUpload'
                    accept='.png, .jpg, .jpeg'
                    onChange={(e) => handleImageChange(e, "cover")}
                    hidden={true}
                  />
                </div>

                {/* Profile Section */}
                <div className='flex flex-col justify-end h-[100px] bg-[#191919] rounded-b-md'>
                  {/* Profile Picture and Info */}
                  <div className="flex sm:items-center justify-between gap-4 px-6 pb-4">
                    <div className="flex sm:flex-row flex-col sm:items-center sm:gap-6 gap-2">
                      <div className='relative'>
                        <div
                          className='flex items-center justify-center relative sm:w-24 sm:h-24 w-20 h-20'
                          onMouseEnter={() => setIsProfilePhotoHovered(true)}
                          onMouseLeave={() => setIsProfilePhotoHovered(false)}
                        >
                          <Avatar
                            isBordered
                            color='primary'
                            src={convertBufferToDataURL(companyInfos.company_photo)}
                            className='w-full h-full'
                          />
                          {isProfilePhotoHovered && authInfo?.typeUser == "company" && (
                            <div className='absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 rounded-full'>
                              <label htmlFor='imageUpload' className='flex items-center justify-center w-full h-full cursor-pointer'>
                                <MdEdit color='white' size={30} />
                              </label>
                            </div>
                          )}
                        </div>
                        <input
                          type='file'
                          id='imageUpload'
                          accept='.png, .jpg, .jpeg'
                          onChange={(e) => handleImageChange(e, "profile")}
                          hidden={true}
                        />
                      </div>
                      <div className="flex flex-col">
                        <h1 className="sm:text-3xl text-xl font-bold text-white ">{companyInfos.company_name}</h1>
                        {authInfo.typeUser == "company"
                          ? <FollowersModel followersCount={companyInfos.followersCount} company_id={companyInfos._id} />
                          : <h1 className='font-bold text-primary-600 text-[18px]'>{formatNumFollowers(companyInfos.followersCount)}&nbsp;&nbsp;<span className='font-semibold text-default-400'>followers</span></h1>
                        }
                      </div>
                    </div>

                    {
                      authInfo.typeUser == "employee" &&
                      <div className="flex sm:items-center items-end justify-between">
                        <Button startContent={isFollowed ? <MdNotificationsActive /> : <MdNotificationAdd />} className={`${isFollowed ? "bg-rose-600 " : "bg-primary-400"} font-bold`} onClick={handleFollow}>
                          {isFollowed ? "Following" : "Follow"}
                        </Button>
                      </div>
                    }

                  </div>

                  {/* Follow Button and Followers Count */}

                </div>
              </div>

              {/* Description Section */}
              <div className="mt-4 flex sm:flex-row flex-col gap-4">

                <div className={`${authInfo.typeUser == "employee" ? "sm:w-[60%] w-[100%]" : "w-[100%]"} bg-[#191919] rounded-lg px-4 pb-4 h-fit`}>
                  <div className='flex justify-between p-2 rounded-md gap-2'>
                    <button className={`w-[50%] flex justify-center  ${isAbout && 'selected'} ${authInfo.typeUser === "company" && 'w-full'} p-4 font-bold text-default-600`} onClick={() => {
                      setIsAbout(true)
                    }}>
                      {authInfo.typeUser == "company" ? "Company Information" : "About us"}
                    </button>
                    {
                      authInfo.typeUser == "employee" &&
                      <button className={`w-[50%] flex justify-center  ${!isAbout && 'selected'} p-4 font-bold text-default-600`} onClick={() => {
                        setIsAbout(false)
                      }}>
                        Job Offers
                      </button>
                    }
                  </div>
                  {isAbout
                    ? authInfo.typeUser == "company"
                      ? <CompanyProfileInfos company={{ company_id: companyInfos._id, description: companyInfos.description, password: companyInfos.password, company_name: companyInfos.company_name, email: companyInfos.company_email, city: companyInfos.city, country: companyInfos.country, industry: companyInfos.industry, phone: companyInfos.company_phone, address: companyInfos.address, founded_year: companyInfos.founded_year, size: companyInfos.size }} />
                      : <AboutCompany company={{ description: companyInfos.description, email: companyInfos.company_email, city: companyInfos.city, country: companyInfos.country, industry: companyInfos.industry, phone: companyInfos.company_phone, address: companyInfos.address, founded_year: companyInfos.founded_year, size: companyInfos.size }} />
                    : authInfo.typeUser == "employee" && <CompanyJobOffers company_id={company_id} city={companyInfos.city} country={companyInfos.country} company_photo={companyInfos.company_photo} company_name={companyInfos.company_name} typeUser={authInfo.typeUser} />
                  }
                </div>
                {
                  authInfo.typeUser == "employee" &&
                  <Suggestions industry={companyInfos.industry} company_id={companyInfos._id} />
                }
              </div>
            </div>}
      </div>
    </div>
  );
}