import React from 'react'
import { styled } from 'styled-components'
import background from "./../../../../../assets/images/homepage/Group 11.png"
import CompletedForm from './../../../../../assets/images/homepage/Completed form.png'
import FeatureCard from './FeatureCard'
import { device } from "../../../../../assets/css/mediaQueries";
import secureAndProtect from "./../../../../../assets/images/homepage/secure-private.png"  
import personalized from "./../../../../../assets/images/homepage/personalized-practice.png"  
import faq from "./../../../../../assets/images/homepage/FAQ.png"  
import userFriendly from "./../../../../../assets/images/homepage/user-friendly.png"  

export default function Feature() {
    const Features=[
        {
            heading:"Personalized Practice:",
            data: "Upload your student's homework assignments, and our AI engine will generate a curated selection of similar problems, enhancing their understanding of keyconcepts.",
            img: personalized
        },
        {
            heading:"Step-by-Step Solutions:",
            data: "Access clear and detailed solutions for every example problem, making it easier than ever to guide students through their learning journey.",
            img: faq
        },
        {
            heading:"User-Friendly Interface:",
            data: "Our intuitive interface ensures a seamless experience for users of all backgrounds, from tutors to busy parents.",
            img: userFriendly
        },
        {
            heading:"Secure and Private:",
            data: "We take data security seriously. Your uploaded assignments are kept confidential and secure.",
            img: secureAndProtect
        }
    ]
  return (
    <Wrapper>
        <div className='main' id="feature"> 
            <div className="content">
                <h5 className='sub-title'>Features</h5>
                <div className="body">
                <div className="right">
                    <img className='img' src={CompletedForm} alt="form"/>
                </div>
                <div className="left">
                    <div className="left-body">
                        {Features.map((item) => {
                            return(
                                <FeatureCard
                                heading={item.heading}
                                data={item.data}
                                img={item.img}
                                />
                            )
                        })}
                    </div>
                </div>
                
                </div>
            </div>
        </div>
    </Wrapper>
  )
}


const Wrapper=styled.div`
width: 100vw;
position: relative;
min-height: 100vh;
z-index: 1;
background-color: #FFCDEA;;

.main{
    max-width: 1440px;
    margin: auto;
    padding: 92px 20px ;
    .sub-title{
            font-family: 'Judson', serif;
            font-size: 48px;
            text-align: center;
            margin: auto;
            padding: 0 20px;
            width: max-content;
            position: relative;
            color:#03256C;;
            &::after{
                content: "";
                position: absolute;
                bottom: -8px;
                left: 0;
                width: 100%;
                height: 4px;
                border-radius: 2px;
                background-color: #03256C;
            }
        }

}
.body{
    display: flex;
    flex-direction: row;
    justify-content:center;
    align-items:center;
}
.left{
    flex:3;
    .left-body{
        flex-direction: row;
        /* justify-content: center; */
        flex-wrap:wrap;
        display: flex;
        margin-top:10vh;
        gap:50px;
        position: relative;
        width:100%;
    }

}
.right{
    flex:1;
    padding: 2vw;
    position: relative;
    img{
        background-color: #5A60F1;
        border-radius: 100%;
        height: 370px;
        width: 340px;
        padding: 0px;
        margin-top : 3rem;
    }
}
@media(max-width:1000px){
 .right{
    img{
        height:300px;
        widht:280px;
    }
 }
}
@media(max-width:950px){
    .body{
        flex-direction:column;
    }
}
@media ${device.tablet}{
   
    p{
        font-size:18px;
    }
}
@media ${device.mobileL}{
    .right{
    img{
        height:200px;
        width:250px;
    }
 }
    .main{
        padding: 42px 20px ;

        .sub-title{
            font-size:22px;
        }
    }
    p{
        font-size:12px;
    }
    .body{
        display:flex;
    flex-direction:column;
    }
}




`