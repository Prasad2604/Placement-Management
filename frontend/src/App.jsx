
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Header from './Components/Header'
import SignIn from './pages/SignIn'
import { StickyScroll } from './Components/stickyScroll'
import { StickyScrollRevealDemo } from './pages/DevPage'
import CompanyLogin from './Components/CompanyLogin'
import CoordinatorLogin from './Components/CoordinatorLogin'
import CompanyLanding from './pages/CompanyDashboard'
import CompanyRegister from './Components/CompanyRegister'
import StudentRegister from './Components/StudentRegister'
import ActiveJobOpenings from './pages/ActiveJobOpenings'
import { useState } from 'react'



function App() {
  const [jobPosts, setJobPosts] = useState([]);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage />}></Route>
          <Route path='/signin' element={<SignIn/>} ></Route>
          <Route path='/company' element={<CompanyLogin/>} ></Route>
          {/* <Route path='/companyhome' element={<CompanyLanding/>} ></Route> */}
          <Route path="/companyhome" element={
                    <CompanyLanding jobPosts={jobPosts} setJobPosts={setJobPosts} />
                } />
          <Route path='/register/company' element={<CompanyRegister/>} ></Route>
          <Route path='/register/student' element={<StudentRegister/>} ></Route>
          {/* <Route path='/signin?company' element={<SignIn/>} ></Route> */}
          <Route path='/coordinator' element={<CoordinatorLogin/>} ></Route>
          <Route path='/dev' element={<StickyScrollRevealDemo/>}></Route>
          {/* <Route path='/activejobopenings' element={<ActiveJobOpenings/>}></Route> */}
          {/* <Route path="/companyhome" exact>
                <CompanyLanding jobPosts={jobPosts} setJobPosts={setJobPosts} />
            </Route> */}
            <Route path='/activejobopenings' element={<ActiveJobOpenings jobPosts={jobPosts} setJobPosts={setJobPosts} />} />
        </Routes>
        
      </BrowserRouter>
    </>
  )
}

export default App
