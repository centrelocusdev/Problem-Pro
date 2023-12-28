import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import SearchSection from './SearchSection'
import Result from './Result'
import { device } from "../../../../assets/css/mediaQueries"
import { auth } from '../../../../request/auth'
import { useNavigate } from 'react-router-dom'


export default function Index() {
    const [generatedResult,isGeneratedResult]=useState("");
    const [loading, setLoading] = useState(false);
    const [isPlanActive, setIsPlanActive] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(()=> {
        async function fetchUserData(){
            const res = await auth.getUserData();
            let subs = false;
            let trial = false;
            if(res && res.data && res.data.data && res.data.data[0].subs_status && res.data.data[0].subs_status === 'active'){
                subs = true;                
            }
            if(res && res.data && res.data.data && res.data.data[0].trial_status && res.data.data[0].trial_status === 'active'){
                trial = true;
            }
            if(subs === true || trial === true){
                setIsPlanActive(true);
            }
            setIsLoading(false);
        }
        fetchUserData();
    }, [])
    const updateLoading = (value)=> {
        setLoading(value);
    }
    if(isLoading){
            return (
                <div style={{height: "100vh", width: "100vw" , flexDirection: "column", gap:"50px", backgroundColor: "#5A60F1", display: "flex" , justifyContent: "center", alignItems: "center"}}>
                    <p style={{fontSize: "32px", color: "white"}}>Loading...</p>
                </div>
            )
    }
    if(!isPlanActive){
        return (
          <div style={{height: "100vh", width: "100vw" , flexDirection: "column", gap:"50px", backgroundColor: "#5A60F1", display: "flex" , justifyContent: "center", alignItems: "center"}}>
            <p style={{fontSize: "32px", color: "white"}}>Kindly buy plan to use our service!</p>
            <button onClick={()=> {navigate('/plans')}} style={{padding: "8px 15px", borderRadius: "20px", backgroundColor: "#FFCDEA" , border: "none", color: "#03256C", fontSize: "24px", fontWeight: "600"}}>Go to the Plan Page</button>
          </div>
          
        )
    }

  return (
    <Wrapper>
       
        <div className="left">
            <SearchSection isGeneratedResult={isGeneratedResult} loading={loading} updateLoading={updateLoading}/>
        </div>
        <div className="right" >
            <Result generatedResult={generatedResult} loading={loading}  updateLoading={updateLoading}/>
        </div>
    </Wrapper>
  )
}


const Wrapper=styled.div`
background-color: #5A60F1;
height:fit-content;
display: flex;
flex-direction: row;
justify-content:space-between;
gap: 30px;
padding: 50px 20px;
/* max-width:1410px; */
.left{
    width:50%;
    height:100%;
}
.right{
    width:50%;
    height:100%;
}
@media (max-width:930px){
    margin:0 10px;
    gap:10px;
    justify-content:space-between;
    padding: 40px 0;
    .left{
        width:50%;
    }
    .right:{
        width:50%;
    }

}
@media (max-width:700px){
    flex-direction:column;
    gap:2rem;
    padding: 40px 40px;
    .left{
        width:100%;
    }
    .right{
        width:100%;
    }
}
@media (max-width:500px){
    padding: 50px 10px;

}

`