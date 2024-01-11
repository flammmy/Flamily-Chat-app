import React from 'react';
import { useNavigate } from 'react-router-dom';
import {BiPowerOff} from 'react-icons/bi';
import axios from 'axios';
import styled from 'styled-components';
function Logout({setDialogue}) {
    const navigate = useNavigate();
    const handleClick = () =>{
        setDialogue(true);
        
    }
  return (
    <Button onClick = {handleClick}>
      <BiPowerOff />
    </Button>
  )
}
const Button = styled.button`
display: flex;
align-items: center;
justify-content: center;
padding : .5rem;
border-radius : .5rem;
background-color : #9a86f3;
border : none;
cursor : pointer;
svg{
    height : 1.2rem;
    color : #ebe7ff;
}
`;
export default Logout
