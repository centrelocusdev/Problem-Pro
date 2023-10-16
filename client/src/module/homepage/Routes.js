import React from 'react'
import { Outlet, Route } from 'react-router-dom'
import Footer from '../../core/common/Footer'
import { HomepageBanner } from './pages/HomepageBanner'
import HomepageNavbar from '../../core/common/HomepageNavbar'
import { HomepageRequestForm } from './pages/RequestForm'
import { styled } from 'styled-components'
import NOTFOUND404 from '../../core/common/NOTFOUND404'
import Login from '../../core/common/Login'
import Signup from '../../core/common/Signup'
import ResetPassword from '../../core/common/ResetPassword';
import ForgotPassword from '../../core/common/ForgotPassword';



export const HomepageRoutes=[
  <Route index element={<HomepageBanner/>}/>,
  <Route path="login" element={<Login/>}/>,
  <Route path="signup" element={<Signup/>}/>,
  <Route path="/*" element={<NOTFOUND404/>}/>,
  <Route path="reset-password" element={<ResetPassword/>}/>,
  <Route path="forgot-password"  element={<ForgotPassword/>}/> ,
]


export  function HomePageOutlet({loggedIn , updateLoggedInStatus}) {
  return (
    <>
        <Main>
          <HomepageNavbar loggedIn={loggedIn} updateLoggedInStatus={updateLoggedInStatus}/>
        </Main>
        <Outlet loggedIn={loggedIn}/>
        <Footer/>
    
    </>
  )
}

const Main=styled.div`
position:absolute;
top: 0;
width: 100vw;
z-index: 99;
`

