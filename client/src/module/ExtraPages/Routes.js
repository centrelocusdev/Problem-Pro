import ContactUs from '../../core/common/ContactUs/ContactUs';
import React from 'react'
import { Outlet, Route } from 'react-router-dom'
import Plans from '../../core/common/StripePayment/Plans'
import Success from '../../core/common/StripePayment/SuccessStripe'
import Cancel from '../../core/common/StripePayment/CancelStripe'
import HomepageNavbar from '../../core/common/HomepageNavbar';
import { styled } from 'styled-components'

export const ExtraRoutes=[
    <Route path="/contact" element={<ContactUs/>}/>,
    <Route path="/plans" element={<Plans/>}/>,
    <Route path="/success" element={<Success/>}/>,
    <Route path="/cancel" element={<Cancel/>}/>,
  ]

  export  function ExtraPagesOutlet({loggedIn , updateLoggedInStatus}) {
    return (
      <>
          <Main>
            <HomepageNavbar loggedIn={loggedIn} updateLoggedInStatus={updateLoggedInStatus}/>
          </Main>
          <Outlet/>
      
      </>
    )
  }


  const Main=styled.div`
position:absolute;
top: 0;
width: 100vw;
z-index: 99;
`