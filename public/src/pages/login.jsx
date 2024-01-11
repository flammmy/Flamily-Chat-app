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
            <img src={Logo} alt="Logo" />
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
  background-color : #092a16;
  .brand{
    display : flex;
    align-items : center;
    gap : 1rem;
    justify-content : center;

    img{
      height : 5rem;
    }
    h1{
      color : white;
      text-transform : uppercase;
    }
  }  
  form{
    display : flex;
    flex-direction : column;
    gap : 2rem;
    background-color : #08050542;
    box-shadow : 0 4px 20px 4px #140505b8;
    border-radius : 2rem;
    padding : 3rem 5rem;
    input{
      background : transparent;
      padding : 1rem;
      border : .1rem solid #206d2a;
      border-radius : .4rem;
      color : white;
      width : 100%;
      font-size : 1rem;
      &:focus{
        border : 0.1rem solid #6d501a;
        outline : none;
      }
    }
    button{
      background-color : #4d7516;
      color : white;
      padding : 1rem 2rem;
      border : none;
      border-radius : .4rem;
      pointer : cursor;
      font-size : 1rem;
      text-transform : uppercase;
      transition: .3s ease-in-out;
      font-weight : bold;
      &:hover{
        background-color : #2a410b;
        box-shadow : 0 4px 20px 4px  #092a16;
      }
    }
    span{
      color : white;
      text-transform : uppercase;
    }
    a{
      color : #4e0eff;
      text-decoration : none;
      font-weight : bold;
      
    }
  }

`;

export default Login;
