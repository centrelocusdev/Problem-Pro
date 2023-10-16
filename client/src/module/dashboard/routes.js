import React,{useState, useEffect} from 'react'
import { Outlet, Route } from 'react-router-dom'
import { styled } from 'styled-components'
import DashboardSideabar from '../../core/common/DashboardSideabar'
import Profile from './pages/Profile'
import Classes from './pages/Classes'
import History from './pages/History'
import Class from './pages/Class';
import Output from '../AI section/container/History/Right';
import ChangePassword from './pages/ChangePassword';
import { device } from "../../assets/css/mediaQueries";

let profileElement;

export  function DashboardOutlet() {
  return (
    <>
        <Main>
          <DashboardSideabar />
          <div className="outlet">
            <Outlet />
          </div>
        </Main>
    </>
  )
}
profileElement = <Profile />;

export const DashboardRoutes=[
  <Route index element={profileElement} />,
  <Route path="classes" element={<Classes/>}/>,
  <Route path="history" element={<History/>}/>,
  <Route path="class" element={<Class/>}/>,
  <Route path="output-page" element={<Output/>}/>,
  <Route path="change-password" element={<ChangePassword/>}/>
  // <Route path="classes" element={<Classes/>}/>,
]

const Main=styled.div`
display: flex;
flex-direction: row;
gap: 50px;
background: linear-gradient(298deg, #5A60F1 2.46%, #FFF 97.8%);
min-height: 100vh;
padding: 40px 20px ;
justify-content:center;
margin: 0 auto;
.outlet{
  padding-top: 10px;
  flex:1;
  width:75%;
}


@media ${device.tablet}{
  flex-direction:column;
  align-items:center;
  padding: 40px 20px ;

  div{
    width:100%;
  }
 .outlet{
  width:100%;

 }
}


@media ${device.mobileS}{
  padding: 15px 5px;
}
`

