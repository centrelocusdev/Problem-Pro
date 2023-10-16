import React, { useEffect, useState , useRef} from 'react'
import { Link } from 'react-router-dom'
import { styled } from 'styled-components'
import profile from "./../../../../assets/images/dashboard/Frame 3842.png"
import {auth} from '../../../../request/auth';
import { device } from "../../../../assets/css/mediaQueries"
import { toast } from "react-toastify";
import {FcEditImage} from 'react-icons/fc';
import ClipLoader from "react-spinners/ClipLoader";

export default function Index(updateCheckAvatar) {
    const [loading, setLoading] = useState(false);
    const [selectedPdf, setSelectedPdf] = useState("");
    const defaultImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAPFBMVEXk5ueutLepsLPo6uursbXJzc/p6+zj5ea2u76orrKvtbi0ubzZ3N3O0dPAxcfg4uPMz9HU19i8wcPDx8qKXtGiAAAFTElEQVR4nO2d3XqzIAyAhUD916L3f6+f1m7tVvtNINFg8x5tZ32fQAIoMcsEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQTghAJD1jWtnXJPP/54IgNzZQulSmxvTH6oYXX4WS+ivhTbqBa1r26cvCdCu6i0YXbdZ0o4A1rzV+5IcE3YE+z58T45lqo7g1Aa/JY5tgoqQF3qb382x7lNzBLcxft+O17QUYfQI4IIeklKsPSN4i6LKj/7Zm8n99RbHJpEw9gEBXNBpKIYLJqKYRwjOikf//r+J8ZsVuacbqCMNleI9TqGLGqMzhnVdBOdd6F/RlrFijiCoVMk320CBIahUxTWI0KKEcJqKbMdpdJb5QvdHq6wCI5qhKlgGMS/RBHkubWDAE+QZxB4xhCyDiDkLZxgGEVdQldzSKbTIhmZkFkSEPcVvmBn2SMuZB9od7fQDsMiDdKJjFUSCQarM5WirZ3C2TT/htYnyPcPfgrFHWz0BI74gr6J/IZiGUxAZGQLqmvQLTrtE/Go4YxhVRIpEw+sww1IIcqr5NKmUUzLF3d4/qPkYIp2T/obPuemlojFUR4t9Q2Vojhb7BmgElWHzLPH8hucfpefPNFTVgs9h1AdU/Pin96vwWbWdf+X9Absn3OdO34aMdsDnP8WgKYisTqI6CkNGqZQo1XA6Ef6AU32SJzOcBukHPF07/xNSgmHKa5BOhtezv6mA/rYJpwXNAnbRZ1XuF3BzDcO3vpA3+ny2909gbqE4hhD3LIPhLLyBNhPZvbZ3B+3tPYa18A7auSlXQayKwTPNLKDcuOB0xPYKDPFTkWsevQPRZ1J8Hji9I1KQ34r7hZhrwNwOZ97QxNx0drwn4QI0wQk1DcEsfKCWKdxVvxPSNUIp/knmAXT+nT+Ko3+0H96rcNb3m1fx7MBTJdeBJ7uFcWsc0wvgAsC4pROW0l2inbAmIBv/7GZmuhQH6API2rr8T0e6yuZJ+80A9LZeG62T3tik31XwxtwZcizKuTHkMjB1WdZde4Kmic/A5ZI3rr1ae21d08PlVHYfAaxw9G9CYRbJ+8ZdbTcMRV1XM3VdF0M32vtoTdZ0+u29s0OttJ5bz64UwinjaFMVY9vkqc3KKSxN21Xl+0L4Q3Vuv1tYl0pqnX6ms4XetFz7gdZVAgUEoJntfOUe4ZwsHd9FzqQ3Vv6xe41l0XJcqcKl6TZvlv7ClAW3BsqQW4X7ypApB8dmTgK4IX5wvqIVj33HtD2qSG4BqznxdIefL27Y4sahi0MdIdvUsDva8agGGbCtITmCY31MHD2O0uIdh/0rJDQ1VX5Zdxz3rR2QDbv6qXl9vudzqQtGm1Jv9LDXOsfvvB7VcZ8PDKD0mQ1VHPYQ9O+Yj4hR1IUD8rBnn3ho2m8oQMxbCFiKlL2ioSW5heeJqegED52CzxCtcGD3Kv8Wms9EYLyUhwaFIhSMBClevWEmiK/Iaogu4H7sg6ppQhQG8RUqivuTGOAJOg6FfgW0q0M0PQMRMEgXaeNf3SYDZ8PIMI0+wHgr/MgN7wYwpiLjCCqM6ydUDZLQiB6nDdNC8SDyig3jPPpFXGcC9O8BUBDVmgBY59E7Md/35Loe/UVEECEJwYggJjELZ4J71SaQSBeC02n4Da29CayJNA28SAhd2CQyC1Xw6pSmGSINQVuMhAZp4DClan9MgmkDDNmezqwS8sgtlXK/EPBhoaSmYVC/F7IO1jQEdHOlabpKh3+jzLQSTUiq4X2I+Ip/zU8rlaqAvkS21ElR+gqu3zbjjL+hIAiCIAiCIAiCIAiCsCf/AKrfVhSbvA+DAAAAAElFTkSuQmCC";
    const [formData, setFormData] = useState({
        name: "",
        organisation: "",
        email: "",
        profession:"",
        image: "",
    });

    const updateProfile = async() => {  
        setLoading(true);
        const res = await auth.updateProfile(formData);
        if(res){
            setLoading(false);
            getUserData();
            toast.success("Data Updated Successfully");
            
        }
    }
    const convertToBase64= async(e)=> {
        var render = new FileReader();
        render.readAsDataURL(e.target.files[0]);
        render.onload= () => {
            setFormData((prevState) =>({
                ...prevState,
                [e.target.name] : render.result 
            }))
        };
        render.onerror = error => {
            console.log('Error' , error);
        }
        
    }
    const onChangeHandler = async(event)=> {
        
        if(event.target.type === 'file'){
            setSelectedPdf(event.target.files[0].name);
           convertToBase64(event);
           return;
        }
        const {name, type, value} = event.target;
        setFormData((prevState) =>({
            ...prevState,
            [name] : value 
        }))
    }
    const onSubmitHandler = async(event)=> {
        event.preventDefault();
        const res = updateProfile();
        setSelectedPdf("");
        if(res){
            getUserData();
        }
        
    }

    const getUserData = async() => {
        try{
        const userData = await auth.getUserData();
        if(userData && userData.data.data){
        const data = userData.data.data[0];
        setFormData({
            name: data.name,
            organisation: data.organisation,
            email: data.email,
            profession: data.profession,
            image: data.avatar
          });
        }
        }catch(err){
            console.log("Error" , err);
        }
        
    }
    useEffect(() => {
         if(formData.name === ""){
            getUserData();
        }
    } , [formData])

    const hiddenFileInput = useRef(null);
    const handleClick = (event) => {
        hiddenFileInput.current.click();
    };
    
  return (
    <Wrapper>
        <Link className='page-heading' to="/">Profile</Link>
        <div className="body">
        <div className="wrapper">
        <form onSubmit={onSubmitHandler}>
            <div className="picture-update">
                {<img className='profile' src={formData.image=== undefined || formData === '' ? defaultImage: formData.image} alt="profile-img"/>
                }
                <p>{selectedPdf}</p>
                <FcEditImage style={{cursor:"pointer"}} onClick={handleClick} size={40}/>
                <input 
                ref={hiddenFileInput} 
                style={{display: "none"}}
                accept='image/'
                id="fileUpload"
                className="custom-file-input"
                name="image" 
                type="file" 
                onChange={onChangeHandler} 
                />
            </div>
                <div className="input-label-wrapper">
                        <label>Name</label>
                        <div className="input-wrapper">
                        <input onChange={onChangeHandler} value={formData.name} name="name" type="name" placeholder='Enter Your Name' />
                        </div>
                    </div>
                <div className="input-label-wrapper">
                        <label>Organisation</label>
                        <div className="input-wrapper">
                        <input onChange={onChangeHandler} value={formData.organisation} name="organisation" type="text" placeholder='Enter Your Organisation' />
                        </div>
                    </div>
                <div className="input-label-wrapper">
                        <label>Email</label>
                        <div className="input-wrapper">
                        <input onChange={onChangeHandler} value={formData.email} name="email"  type="email" placeholder='Enter Your Email' />
                        </div>
                    </div>
                <div className="input-label-wrapper">
                        <label>Profession</label>
                        <div className="input-wrapper">
                        <input onChange={onChangeHandler} value={formData.profession} name="profession" type="text" placeholder='Enter Your Profession' />
                        </div>
                </div>
                    <button className='btn primary-btn'>
                    {loading ? (
                        <div className="loader-box">
                        Updating..
                        <ClipLoader size={20} color="#03256C" />
                        </div>
                        ) : (
                        "Update Profile"
                    )}
                    </button>
            
            </form>
            </div>


        </div>
        
    </Wrapper>
  )
}


const Wrapper=styled.div`
display: flex;
flex-direction: column;
justify-content:space-between;  
gap:30px;
height:100%;

.body{
    
    display: flex;
    border-radius: 20px;
    background: rgba(255, 255, 255, 0.10);
    box-shadow: 0px 4px 4px 0px #03256C;    
    min-height: 80vh;
    border-radius: 10px;
    padding: 30px 50px;
    gap: 20px;
    position: relative;
    align-items: center;
    flex-direction: column;
    justify-content:space-between;
    .picture-update{
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;
        margin-bottom:1rem;
        .profile{
        height:120px;
        width:120px;
        border-radius:100%;
        margin-bottom:10px;
        display:flex;
        justify-content:center;
        align-items:center;
        text-align:center;
        line-height: 200px;
        font-size:10px;
    }
    input[type=file]{
        width:42%;  
    }
    input[type=file]::file-selector-button {
        padding: 8px 16px;
        border-radius: 20px;
        background-color: #03256C;
        border: none;
        outline: none;
        font-size: 15px;
        font-weight: 500;
        color: white;
        cursor:pointer;
        /* width:9  0%; */
}
input[type=file]::file-selector-button:hover {
    background-image: linear-gradient(to right ,#03256C,#efaaf5) !important;

}

}
    .wrapper{
        display: flex;
        flex-direction: column;
        width: 100%;
        position: relative;
        max-width: 500px;
        margin: auto;
        form{
            display:flex;
            flex-direction:column;
            width:100%;
        }

        .input-label-wrapper{
            display: flex;
            flex-direction: column;
            gap: 8px;
            label{
                color: #03256C;
                font-family: Inter;
                font-size: 20px;
                font-style: normal;
                font-weight: 600;
                line-height: normal;
            }
            .input-wrapper{
                display: flex;
                flex-direction: row;
                gap: 5px;
                padding: 8px;
                border-radius: 20px;
                border: 1px solid #03256C;
                position: relative;
                background: #fff;
                height:56px;
                margin-bottom:10px;

                input{
                    border:none;
                    outline: none;
                    background-color: inherit;
                    font-size: 18px;
                    width: 100%;

                    

                }
                
            }
        }
        .btn{
            align-self:center;
            font-size:20px;
        }
        }
    }
@media (max-width:470px){
  .body{
    padding: 30px 10px;
    .wrapper{
        .input-label-wrapper{
            .input-wrapper{
                height:40px;
                input{
                    font-size:12px;
                }
            }
        }
        .btn{
            font-size:18px;
            /* width:50 %; */
        }
    }
  }
  .btn{
    font-size:18px;
  }
}

/* @media ${device.mobileS}{
    width:100%;
} */


`
