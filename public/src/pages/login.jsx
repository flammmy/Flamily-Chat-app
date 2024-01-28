import React,{useState, useEffect} from "react";
import styled from "styled-components";
import {Link, useNavigate} from "react-router-dom";
import Logo from "../assets/logo.svg";
import {toast,ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginRoute } from "../utils/APIRoutes";


function Login() {
  const navigate = useNavigate();
  const [values,setValues] = useState({
    username : "",
    password : "",
  })
  const toastOptions = {
    position : "bottom-right",
    autoClose : 8000,
    pauseOnHover : true,
    draggable : true,
    theme : "dark"
  }
  useEffect(() =>{
    // eslint-disable-next-line react-hooks/exhaustive-deps

    if(localStorage.getItem("chat-app-user")){
      navigate("/");
    }
  },[]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const {username, password} = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });
      if(data.status === false){
        toast.error(data.msg,toastOptions);
      }

      if (data.status === true) {
        localStorage.setItem(
          "chat-app-user",
          JSON.stringify(data.isUser)
        );
        navigate("/");
      }
    }
  };
  const handleChange = (event) =>{
    setValues({...values,[event.target.name]:event.target.value});
  }

  const handleValidation = () =>{
    const {password,confirmPassword,username,email} = values;
    if(password === ""){
        toast.error("Password is required",toastOptions);
        return false;
    }
    else if(username.length === 0){
      toast.error("Username is required",toastOptions);
        return false;
    }
    return true;
  }
  return (
    <>
      <FormContainer>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            {/* <img src={Logo} alt="Logo" /> */}
            <h1>flamily</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
            min = "3"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
        
          <button type="submit">Login</button>
          <span>Don't have an account? <Link to = '/Register'>Register</Link></span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  width : 100vw;
  height  : 100vh;
  display : flex;
  flex-direction : column;
  justify-content : center;
  gap : 1rem;
  align-items : center;
  background: linear-gradient(90deg, rgba(191,40,167,1) 0%, rgba(240,237,229,0.9920343137254902) 81%);
  .brand{
    display : flex;
    align-items : center;
    gap : 1rem;
    justify-content : center;
    img{
      height : 5rem;
    }
    h1{
      color : #000000ad;
    }
  }  
  form{
    display : flex;
    flex-direction : column;
    gap : 2rem;
    background-color: #fff7f745;
    // box-shadow: 0 4px 20px 4px #1405051f;
    border: 1px solid #992086;
    border-radius : 2rem;
    padding : 3rem 5rem;
    input{
      background : white;
      padding : 1rem;
      border : none;
      border-radius : 2rem;
      color : black;
      width : 100%;
      font-size : 1rem;
      box-shadow : 0 0 9px 1px #00000024;
      &:focus{
        border : 0.1rem solid #992086;
        outline : none;
      }
      &::placeholder {
        color: black;
        opacity: .6;
      }
    }
    button{
      background-color : #992086;
      color : white;
      padding : 1rem 2rem;
      border : none;
      border-radius : 2rem;
      pointer : cursor;
      font-size : .9em;
      text-transform : uppercase;
      transition: .3s ease-in-out;
      font-weight : bold;
      &:hover{
        background-color : #7d1c6e;
        box-shadow : 0 0 20px 4px #9920868c;
      }
    }
    span{
      color : black;
    }
    a{
      color : #4e0eff;
      text-decoration : none;
      font-weight : bold;
      
    }
  }

`;

export default Login;
