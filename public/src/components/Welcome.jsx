import React from 'react';
import styled from 'styled-components';
import robot from "../assets/robot.gif";
function Welcome({currentUser}) {
  return (
    <Container>
      <img src={robot} alt="buddy" />
      <h1>Welcome, <span>{currentUser.username}</span></h1>
      <h3>Please select a chat to start messaging</h3>
    </Container>
  )
}

const Container = styled.div`
    display : flex;
    justify-content : center;
    align-items : center;
    flex-direction : column;
    color : white;
    img{
        height : 20rem;
        
    }
    span{
        color : #4e0eff;
    }
`;
export default Welcome;
