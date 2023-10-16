import { Route, Routes } from 'react-router-dom';
import './App.css';
import  {HomepageRoutes, HomePageOutlet } from './module/homepage/Routes.js';
import { DashboardOutlet, DashboardRoutes } from './module/dashboard/routes';
import { AIRoutes } from './module/AI section/routes';
import {ExtraRoutes , ExtraPagesOutlet} from './module/ExtraPages/Routes';
import { useEffect, useState } from 'react';
import PrivateRoutes from './module/dashboard/PrivateRoute.js';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



function App() {
const [loggedIn,setLoggedIn]=useState(false)
const updateLoggedInStatus = (status)=> {
  setLoggedIn(status);
}
  useEffect(()=>{
    const token=localStorage.getItem("token");
    setLoggedIn(!!token);

  },[])


  return (
    <>
    <Routes>
      <Route path='/' element={<HomePageOutlet loggedIn={loggedIn} updateLoggedInStatus={updateLoggedInStatus}/>}>
        {HomepageRoutes}
      </Route>
      <Route element= {<PrivateRoutes/>}>
      <Route path='/dashboard' element={<DashboardOutlet/>}>
        {DashboardRoutes}
      </Route>

      <Route path='/'>
        {AIRoutes}
      </Route>
      </Route>    
      <Route path='/' element={<ExtraPagesOutlet loggedIn={loggedIn} updateLoggedInStatus={updateLoggedInStatus}/>}>{ExtraRoutes}</Route>
    </Routes>
    <ToastContainer />

    </>

  );
}

export default App;
