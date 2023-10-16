import React, {useEffect, useState} from 'react'
import { NavLink } from "react-router-dom";
import { styled } from 'styled-components'
import profile from "./../../assets/images/common/Ellipse 21.png"
import user from "./../../assets/images/common/Male User.png"
import history from "./../../assets/images/common/Historical.png"
import classes from "./../../assets/images/common/Classroom.png"
import setting from "./../../assets/images/common/Settings.png"
import arrow from "./../../assets/images/common/Chevron Right.png"
import { device } from "../../assets/css/mediaQueries";
import {auth} from '../../request/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";



export default function DashboardSideabar() {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const [activeTab , setActiveTab]= useState("profile");
  const defaultImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAPFBMVEXk5ueutLepsLPo6uursbXJzc/p6+zj5ea2u76orrKvtbi0ubzZ3N3O0dPAxcfg4uPMz9HU19i8wcPDx8qKXtGiAAAFTElEQVR4nO2d3XqzIAyAhUD916L3f6+f1m7tVvtNINFg8x5tZ32fQAIoMcsEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQTghAJD1jWtnXJPP/54IgNzZQulSmxvTH6oYXX4WS+ivhTbqBa1r26cvCdCu6i0YXbdZ0o4A1rzV+5IcE3YE+z58T45lqo7g1Aa/JY5tgoqQF3qb382x7lNzBLcxft+O17QUYfQI4IIeklKsPSN4i6LKj/7Zm8n99RbHJpEw9gEBXNBpKIYLJqKYRwjOikf//r+J8ZsVuacbqCMNleI9TqGLGqMzhnVdBOdd6F/RlrFijiCoVMk320CBIahUxTWI0KKEcJqKbMdpdJb5QvdHq6wCI5qhKlgGMS/RBHkubWDAE+QZxB4xhCyDiDkLZxgGEVdQldzSKbTIhmZkFkSEPcVvmBn2SMuZB9od7fQDsMiDdKJjFUSCQarM5WirZ3C2TT/htYnyPcPfgrFHWz0BI74gr6J/IZiGUxAZGQLqmvQLTrtE/Go4YxhVRIpEw+sww1IIcqr5NKmUUzLF3d4/qPkYIp2T/obPuemlojFUR4t9Q2Vojhb7BmgElWHzLPH8hucfpefPNFTVgs9h1AdU/Pin96vwWbWdf+X9Absn3OdO34aMdsDnP8WgKYisTqI6CkNGqZQo1XA6Ef6AU32SJzOcBukHPF07/xNSgmHKa5BOhtezv6mA/rYJpwXNAnbRZ1XuF3BzDcO3vpA3+ny2909gbqE4hhD3LIPhLLyBNhPZvbZ3B+3tPYa18A7auSlXQayKwTPNLKDcuOB0xPYKDPFTkWsevQPRZ1J8Hji9I1KQ34r7hZhrwNwOZ97QxNx0drwn4QI0wQk1DcEsfKCWKdxVvxPSNUIp/knmAXT+nT+Ko3+0H96rcNb3m1fx7MBTJdeBJ7uFcWsc0wvgAsC4pROW0l2inbAmIBv/7GZmuhQH6API2rr8T0e6yuZJ+80A9LZeG62T3tik31XwxtwZcizKuTHkMjB1WdZde4Kmic/A5ZI3rr1ae21d08PlVHYfAaxw9G9CYRbJ+8ZdbTcMRV1XM3VdF0M32vtoTdZ0+u29s0OttJ5bz64UwinjaFMVY9vkqc3KKSxN21Xl+0L4Q3Vuv1tYl0pqnX6ms4XetFz7gdZVAgUEoJntfOUe4ZwsHd9FzqQ3Vv6xe41l0XJcqcKl6TZvlv7ClAW3BsqQW4X7ypApB8dmTgK4IX5wvqIVj33HtD2qSG4BqznxdIefL27Y4sahi0MdIdvUsDva8agGGbCtITmCY31MHD2O0uIdh/0rJDQ1VX5Zdxz3rR2QDbv6qXl9vudzqQtGm1Jv9LDXOsfvvB7VcZ8PDKD0mQ1VHPYQ9O+Yj4hR1IUD8rBnn3ho2m8oQMxbCFiKlL2ioSW5heeJqegED52CzxCtcGD3Kv8Wms9EYLyUhwaFIhSMBClevWEmiK/Iaogu4H7sg6ppQhQG8RUqivuTGOAJOg6FfgW0q0M0PQMRMEgXaeNf3SYDZ8PIMI0+wHgr/MgN7wYwpiLjCCqM6ydUDZLQiB6nDdNC8SDyig3jPPpFXGcC9O8BUBDVmgBY59E7Md/35Loe/UVEECEJwYggJjELZ4J71SaQSBeC02n4Da29CayJNA28SAhd2CQyC1Xw6pSmGSINQVuMhAZp4DClan9MgmkDDNmezqwS8sgtlXK/EPBhoaSmYVC/F7IO1jQEdHOlabpKh3+jzLQSTUiq4X2I+Ip/zU8rlaqAvkS21ElR+gqu3zbjjL+hIAiCIAiCIAiCIAiCsCf/AKrfVhSbvA+DAAAAAElFTkSuQmCC";
  const [fetchedImage, setFetchedImage] = useState("");
  const [profileImage, setProfileImage] = useState("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAPFBMVEXk5ueutLepsLPo6uursbXJzc/p6+zj5ea2u76orrKvtbi0ubzZ3N3O0dPAxcfg4uPMz9HU19i8wcPDx8qKXtGiAAAFTElEQVR4nO2d3XqzIAyAhUD916L3f6+f1m7tVvtNINFg8x5tZ32fQAIoMcsEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQTghAJD1jWtnXJPP/54IgNzZQulSmxvTH6oYXX4WS+ivhTbqBa1r26cvCdCu6i0YXbdZ0o4A1rzV+5IcE3YE+z58T45lqo7g1Aa/JY5tgoqQF3qb382x7lNzBLcxft+O17QUYfQI4IIeklKsPSN4i6LKj/7Zm8n99RbHJpEw9gEBXNBpKIYLJqKYRwjOikf//r+J8ZsVuacbqCMNleI9TqGLGqMzhnVdBOdd6F/RlrFijiCoVMk320CBIahUxTWI0KKEcJqKbMdpdJb5QvdHq6wCI5qhKlgGMS/RBHkubWDAE+QZxB4xhCyDiDkLZxgGEVdQldzSKbTIhmZkFkSEPcVvmBn2SMuZB9od7fQDsMiDdKJjFUSCQarM5WirZ3C2TT/htYnyPcPfgrFHWz0BI74gr6J/IZiGUxAZGQLqmvQLTrtE/Go4YxhVRIpEw+sww1IIcqr5NKmUUzLF3d4/qPkYIp2T/obPuemlojFUR4t9Q2Vojhb7BmgElWHzLPH8hucfpefPNFTVgs9h1AdU/Pin96vwWbWdf+X9Absn3OdO34aMdsDnP8WgKYisTqI6CkNGqZQo1XA6Ef6AU32SJzOcBukHPF07/xNSgmHKa5BOhtezv6mA/rYJpwXNAnbRZ1XuF3BzDcO3vpA3+ny2909gbqE4hhD3LIPhLLyBNhPZvbZ3B+3tPYa18A7auSlXQayKwTPNLKDcuOB0xPYKDPFTkWsevQPRZ1J8Hji9I1KQ34r7hZhrwNwOZ97QxNx0drwn4QI0wQk1DcEsfKCWKdxVvxPSNUIp/knmAXT+nT+Ko3+0H96rcNb3m1fx7MBTJdeBJ7uFcWsc0wvgAsC4pROW0l2inbAmIBv/7GZmuhQH6API2rr8T0e6yuZJ+80A9LZeG62T3tik31XwxtwZcizKuTHkMjB1WdZde4Kmic/A5ZI3rr1ae21d08PlVHYfAaxw9G9CYRbJ+8ZdbTcMRV1XM3VdF0M32vtoTdZ0+u29s0OttJ5bz64UwinjaFMVY9vkqc3KKSxN21Xl+0L4Q3Vuv1tYl0pqnX6ms4XetFz7gdZVAgUEoJntfOUe4ZwsHd9FzqQ3Vv6xe41l0XJcqcKl6TZvlv7ClAW3BsqQW4X7ypApB8dmTgK4IX5wvqIVj33HtD2qSG4BqznxdIefL27Y4sahi0MdIdvUsDva8agGGbCtITmCY31MHD2O0uIdh/0rJDQ1VX5Zdxz3rR2QDbv6qXl9vudzqQtGm1Jv9LDXOsfvvB7VcZ8PDKD0mQ1VHPYQ9O+Yj4hR1IUD8rBnn3ho2m8oQMxbCFiKlL2ioSW5heeJqegED52CzxCtcGD3Kv8Wms9EYLyUhwaFIhSMBClevWEmiK/Iaogu4H7sg6ppQhQG8RUqivuTGOAJOg6FfgW0q0M0PQMRMEgXaeNf3SYDZ8PIMI0+wHgr/MgN7wYwpiLjCCqM6ydUDZLQiB6nDdNC8SDyig3jPPpFXGcC9O8BUBDVmgBY59E7Md/35Loe/UVEECEJwYggJjELZ4J71SaQSBeC02n4Da29CayJNA28SAhd2CQyC1Xw6pSmGSINQVuMhAZp4DClan9MgmkDDNmezqwS8sgtlXK/EPBhoaSmYVC/F7IO1jQEdHOlabpKh3+jzLQSTUiq4X2I+Ip/zU8rlaqAvkS21ElR+gqu3zbjjL+hIAiCIAiCIAiCIAiCsCf/AKrfVhSbvA+DAAAAAElFTkSuQmCC");
  
  const getUserData = async() => {
    try{
    const userData = await auth.getUserData();
    if(userData && userData.data.data){
    const data = userData.data.data[0];
    setFetchedImage(data.avatar);
    }
    }catch(err){
        console.log("Error" , err);
    }
    
}

const handleLogout= ()=> {
  setLoading(true);
  localStorage.removeItem("token");
  toast("Logout Successful.");
  setLoading(false);
  navigate("/");
}
useEffect(() => {
        getUserData();
} , [])
useEffect(()=> {
  if(fetchedImage === "" || fetchedImage === undefined){
    setProfileImage(defaultImage);
  }else{
    setProfileImage(fetchedImage);
  }
} , [setFetchedImage , fetchedImage])

const handleActiveTab= (tab)=> {
setActiveTab(tab);
}
  return (
    <Wrapper> 
      
            <NavLink
              to="/"
              className={({ isActive, isPending }) =>
                isPending ? "pending main" : isActive ? "active main" : "main"}>
              <div className='dashboard-heading'>
              <img src={arrow} alt="" />
              <span>
              Dashboard
              </span>
              </div>
            </NavLink>
          <div className="sidebar">
          <img className='profile' src={profileImage} alt="profile" /> 
            <NavLink
              to="/search"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""}>
              <button className='new-btn primary-btn'>New +</button>
            </NavLink>
            <div className="top">
            <NavLink
            onClick={()=> {handleActiveTab("profile")}}
            style={activeTab === 'profile' ? {backgroundColor: "#03256C"} : {} }
              to=""
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""}>
              <img src={user} alt="user"/>
              Profile
            </NavLink>
            <NavLink
            onClick={()=> {handleActiveTab("history")}}
            style={activeTab === 'history' ? {backgroundColor: "#03256C"} : {} }
              to="history"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""}>
                  <img src={history} alt="" />
                  History
            </NavLink>
            <NavLink
            onClick={()=> {handleActiveTab("classes")}}
            style={activeTab === 'classes' ? {backgroundColor: "#03256C"} : {} }
              to="classes"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""}>
              <img src={classes} alt="" />
              Classes
            </NavLink>
            <NavLink
            onClick={()=> {handleActiveTab("change-password")}}
              style={activeTab === 'change-password' ? {backgroundColor: "#03256C"} : {} }
              to="change-password"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""}>
              <img src={setting} alt="" />
              Change Password
            </NavLink>
            </div>
            <div className='flex-1-c'></div>
            <button onClick={handleLogout} className=' logout-btn primary-btn'>
            {loading ? (
                <div className="loader-box">
                  Logging Out..
                  <ClipLoader size={20} color="#03256C" />
                </div>
              ) : (
                "Logout"
              )}
              </button>


      </div>
    </Wrapper>
  )
}
const Wrapper=styled.div`
width:30%;
display: flex;
justify-content:space-between;
align-items: center;
/* width: 320px; */
flex-direction: column;
gap: 30px;
align-items: center;
.new-btn{
  font-size:24px
}
.profile{
  height:90px;
  width:90px;
  border-radius:100%;
  margin-bottom:0;
}
.dashboard-heading:{
  height:10%;
}
.dashboard-heading img{
  width: 40px;
height: 40px;
flex-shrink: 0;
}
.dashboard-heading span{
  color: #03256C;
font-size: 40px;
font-style: normal;
font-weight: 700;
line-height: normal;
text-transform: capitalize;
}
.sidebar{
  height:90%;
  padding: 20px;
  border-radius: 20px;
  border: 5px solid #FFF;
  background: #5A60F1;
  display: flex;
  align-items: center;
  flex-direction: column;
  min-height: 80vh;
  gap: 30px;
  width: 100%;
  a{
    display: flex;
    text-decoration: none;
    
    align-items: center;
  }
  .top{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    width: 90%;
    a{
      width: 100%;
      padding: 6px  8px;
      color: white;
      font-weight: 600;
      border-radius: 50px;
      border: 3px solid #FFF;
      
    }
  }
  .img{
    margin-bottom: 26px;
  }
}
.main{
  font-size: 26px;
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;
  align-self: flex-start;
  gap: 4px;
  img{
    height: 24px;
  }
}
.flex-1-c{
  flex-direction: column;
  flex:1
}
.logout-btn{
  font-size:20px
}
@media ${device.laptop}{
 width:40%;
 .dashboard-heading{
  span{
    font-size:30px;
  }
 }
}
@media ${device.tablet}{
 width:40%; 
}

@media ${device.mobileL}{
  width:100%; 
  .primary-btn{
    font-size:18px;
    padding:8px 15px;
  }
  .sidebar{
    padding:5px 0;
  }
}


`
