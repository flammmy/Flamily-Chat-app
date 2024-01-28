import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function LogoutDialogue({ setDialogue }) {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };
  const cancel = () => {
    setDialogue(false);
  };
  return (
    <Container>
      <div className="dialogue">
        <p>Do you really want to logout?</p>

        <div className="btn-container">
          <button className="cancel" onClick={cancel}>
            Cancel
          </button>
          <button className="logout" onClick={logout}>
            Ok
          </button>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`

  display: flex;
  justify-content: center;
  align-items: center;
  .dialogue {
    flex-direction: column;
    height: 8rem;
    width: 20rem;
    gap : 1.2rem;
    background-color: #4b442769;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: .8rem;
    p{
        font-weight: 500;
        color: #ffffff;
    }
    .btn-container {
      display: flex;
      flex-direction: row;
      gap: 1rem;
      button{
        height: 2rem;
        border : none;
        width : 4rem;
        color: white;
        border-radius : 0.4rem;
        transition : .4s;
        cursor : pointer;
        &:hover{
            box-shadow : .1rem .1rem .1rem .1rem rgba(0,0,0,.3);
        }
      }
      .cancel{
        background-color: #ff434352;
      }
      .logout{
        background-color: #459b3482;
      }
    }
  }
`;

export default LogoutDialogue;
