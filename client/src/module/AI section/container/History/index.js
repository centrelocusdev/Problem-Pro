import React,{useState, useEffect} from 'react'
import {utils} from '../../../../core/utils';
import { styled } from 'styled-components'
import Left from './Left'
import Right from './Right'
import { device } from '../../../../assets/css/mediaQueries';

export default function Index({_id}) {
    const [questionData, setQuestionData] = useState([]);
    const [ID, setId] = useState(_id);

    const requestForOneQuestionData = async(_id)=> {
        const res = await utils.getParticularQuestionData(_id);
        if(res){
            setQuestionData(res.data.data);
        }
    }

    function setIdFunction(id){
        setId(id);
    }
    useEffect(()=> {
        requestForOneQuestionData(ID);
    }, [ID])

    useEffect(() => {
    }, [ID])

  return (
    <Wrapper>
        <div className="left">
            <Left _id={_id} setIdFunction={setIdFunction}/>
        </div>
        <div className="right">
            <Right questionData={questionData} / >
        </div>
    </Wrapper>
  )
}



const Wrapper=styled.div`
background: #5A60F1;

display: flex;
flex-direction: row;
align-items:start;
gap: 10px;
padding: 50px  20px;
.left{
    width: 25%;
}
.right{
    width:75%;
    /* flex: 1; */
}
@media (max-width: 960px){
    .left{
        width:40%;
    }
    .right:{
        width: 60%;
    }
}

@media ${device.tablet}{
    flex-direction:column;
    
    .left{
        width:100%;
    }   
    .right{
        width:100%;
    }
}
@media ${device.mobileM}{
    padding: 50px 0;
}




`