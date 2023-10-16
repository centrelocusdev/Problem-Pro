import React, { useEffect, useState } from "react";
import logo from "./../../assets/images/homepage/main-logo.png";
import { NavLink } from "react-router-dom";
import { styled } from "styled-components";
import { auth } from "../../request/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-scroll";
import { AiOutlineArrowUp } from "react-icons/ai";
import { device } from "../../assets/css/mediaQueries";
import {ImMenu} from 'react-icons/im';

export default function HomepageNavbar({ loggedIn, updateLoggedInStatus }) {
  const [showNavMenu , setShowNavMenu] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    checkLoggedIn();
  }, []);

  function checkLoggedIn() {
    const token = localStorage.getItem("token");
    token !== null && token !== "undefined"
      ? updateLoggedInStatus(true)
      : updateLoggedInStatus(false);
  }
  const logoutUser = async () => {
    const res = await auth.logoutUser();
    if (res) {
      checkLoggedIn();
      navigate("/");
    } else {
      localStorage.removeItem("token");
      navigate("/");
    }
  };
  return (
    <>
      <Wrapper>
      <nav>
        <div className="logo-box">
            <NavLink to="/" style={{ borderBottom: 0 }}>
              <img className="logo" src={logo} alt="logo" />
              {/* <p>Logo</p> */}
            </NavLink>
        </div>
      
        <ul className={showNavMenu ? "ver-nav-menu": "land-nav-menu"}>
          <li className="gap"></li>
          <li>
            <NavLink onClick={()=> {setShowNavMenu(false)}} to="/">Home</NavLink>
          </li>
          <li>
            <Link
              onClick={()=> {setShowNavMenu(false)}}
              to="about"
              spy={true}
              smooth={true}
              offset={-100}
              duration={500}
            >
              About
            </Link>
          </li>

          <li>
            <Link
              onClick={()=> {setShowNavMenu(false)}}
              to="feature"
              spy={true}
              smooth={true}
              offset={-20}
              duration={500}
            >
              Feature
            </Link>
          </li>

          <li>
            <Link
              onClick={()=> {setShowNavMenu(false)}}
              to="support"
              spy={true}
              smooth={true}
              offset={-250}
              duration={500}
            >
              Support
            </Link>
          </li>
          <li>
            <NavLink onClick={()=> {setShowNavMenu(false)}} to="/plans">Plans</NavLink>
          </li>
          <li>
            <NavLink onClick={()=> {setShowNavMenu(false)}} to="/contact">Contact Us</NavLink>
          </li>
          <li className="gap" />
         <div className={showNavMenu ? "ver-nav-side-button" : "land-nav-side-button"}>
         {!loggedIn ? (
            <>
              <li>
                <NavLink to="/signup">
                  <button onClick={()=> {setShowNavMenu(false)}} className=" btn primary-btn">Signup</button>
                </NavLink>
              </li>
              <li>
                <NavLink to="/login">
                  <button onClick={()=> {setShowNavMenu(false)}} className=" btn primary-btn">Login</button>
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink
                  to="/dashboard"
                  // onClick={()=>auth.logoutUser()}
                >
                  <button className=" btn primary-btn">Dashboard</button>
                </NavLink>
              </li>
              <li>
                <NavLink to="">
                  <button onClick={logoutUser} className="btn primary-btn">
                    Logout
                  </button>
                </NavLink>
              </li>
            </>
          )}
         </div>
        </ul>
        <div onClick={()=> {setShowNavMenu(!showNavMenu)}} className="hamburger-menu">
          <a href="#">
              <ImMenu size={40}/>
          </a>
        </div>
        
        </nav>
      </Wrapper>
      <Link to="hero" spy={true} smooth={true} offset={-150} duration={500}>
          <div className="top primary-btn">
            <span>
              <AiOutlineArrowUp />
            </span>
            <span>T</span>
            <span>O</span>
            <span>P</span>
          </div>
        </Link>
    </>
  );
}

const Wrapper = styled.div`
  /* max-width: 1400px; */
  width: 100vw;
  height: 70px;
  background-color: #5f65f1;
  position:fixed;
    nav{
    width: 100%;
    height: 100%;
    margin: auto;
    padding: 2% 5%;
    justify-content: space-between;
    align-items: center;
    display: flex;
    background-color: transparent;

    .logo-box{

    width:20%;
    .logo {
    height: 50px;
    width: 50px;
  }
  }
  .ver-nav-menu{
    display:flex;
    margin:0 auto;
    flex-direction:column;
    position:absolute;
    top:68px;
    left:0;
    background-color:#03256C;
    color:white;
    width:98vw;
    gap:10px;
    justify-content:center;
    align-items:center;
    li{
      padding: 15px 0;
      display:flex;
      justify-content:center;
      align-items:center;
      color:white;
      text-align:center;
      width:100%;
      border-bottom:1px solid gray;
      list-style:none;
      /* padding: 5px 0; */
      a{
        
        color:white;
      }
    }
    .gap{
      display:none;

    }
    .ver-nav-side-button{
      width:100%;
      .btn{
        background-color:#03256C;
        color:white;
        border:none;
        padding:0;
        font-size:16px;
        font-weight:0;
        display:block;
        margin-bottom:8px;
      }
    }

  }
  .land-nav-menu {
    width:70%;
    display: flex;
    list-style: none;
    align-items: center;
    justify-content: center;
    /* width: 100vw; */
    top: 0;
    rigth: 0;
    left: 0;
    padding: 1% 10%;
    gap:5px;
    & > li {
      margin: 0 1%;
      white-space: nowrap;
      display: flex;
      img {
        height: 60px;
        width: 60px;
      }
      & > a {
        color: #FFF;
        font-family: Inter;
        font-size: 18px;
        font-style: normal;
        font-weight: 800;
        line-height: normal;
        text-transform: capitalize;
      }
    }
    .gap {
      width: 11vw;
    }
    .land-nav-side-button{
      display:flex;
      gap:10px;
    }
  }
  }
  
  .hamburger-menu{
    display:none;
    /* margin-left:400px; */
    a{
      
     
      color:#FFCDEA;
    }
  }
  
  
  .top {
    position: fixed;
    bottom: 0;
    left: 0;
    color: white;
    font-weight: 700;
    /* background-color: black; */
    border-radius: 20px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-conten: center;

    span {
      font-size: 12px;
    }
  }
  .after-span {
    & > span {
      display: block;
      height: 20px;
      border: 2px solid rgba(255, 255, 255, 0.2);
      border-radius: 4px;
    }
  }
  .btn {
    font-size: 12px;
  }
  @media ${device.desktop} {
    nav{
      .land-nav-menu {
      & > li {
        margin: 0 20px;
        img {
          height: 80px;
          width: 80px;
        }
        & > a {
          font-size: 35px;
        }
      }
    }
    }
  }
  @media ${device.laptop} {
    nav{
      .land-nav-menu {
      & > li {
        img {
          height: 40px;
          width: 40px;
        }
        & > a {
          font-size: 15px;
        }
      }
    }
    }
  }

  @media ${device.tablet} {
    nav{
      .land-nav-menu {
      & > li {
        & > a {
          font-size: 12px;
        }
      }
    }
    }
  }
  @media (max-width: 700px) {
    nav{
      .land-nav-menu{
        display:none;
      }
    
      .hamburger-menu{
        display:block;
        
      }
  }
}
  
  @media ${device.mobileL} {
    nav{
      .land-nav-menu {
      justify-content: space-around;
      width: 100%;
      & > li {
        margin: 0px 1.5%;

        img {
          height: 22px;
          width: 22px;
        }
        & > a {
          font-size: 12px;
        }
      }
    }
    }
  }
  @media ${device.mobileS} {
    nav{
      .land-nav-menu {
      padding: 2px 10%;
      justify-content: space-around;
      & > li {
        margin: 0px 1.5%;
        img {
          height: 18px;
          width: 18px;
        }
        & > a {
          font-size: 10px;
        }
      }
    }
    }
    .btn {
      padding: 8px 16px;
    }
  }
`;
