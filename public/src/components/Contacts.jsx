import React, { useState, useEffect } from "react";
import styled from "styled-components";
import logo from "../assets/logo.svg";
import Logout from "./Logout";
function Contacts({ contacts, currentUser, changeChat,socket ,setDialogue}) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, SetCurrentSelected] = useState(undefined);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    if (currentUser) {
      setCurrentUserImage(currentUser.avatarImage);
      setCurrentUserName(currentUser.username);
    }
  }, [currentUser]);
  const changeCurrentChat = (index, contact) => {
    SetCurrentSelected(index);
    changeChat(contact);
  };
  useEffect(()=>{
    if(socket.current){
      socket.current.on("user-online",(userId) =>{
        setOnlineUsers((prev) => [...prev,userId]);
      })
      socket.current.on("user-offline",(userId) =>{
        setOnlineUsers((prev) => (prev.filter(user => user != userId)));
      })
    }
  },[socket.current])
  return (
    <>
      {currentUserImage && currentUserName && (
        <Container>
          <div className="brand">
            <img src={logo} alt="logo" />
            <h3>flamily</h3>
          </div>
          <div className="contacts">
            {contacts.map((contact, index) => {
              return (
                <div
                  className={`contact ${
                    index === currentSelected ? "selected" : ""
                  }`}
                  onClick={() => changeCurrentChat(index, contact)}
                  key={index}
                >
                  <div className="avatar">
                    <img
                      src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                      alt="avatar"
                    />
                  </div>
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                  {
                    
                    onlineUsers.includes(contact._id)?<div className="online"></div>:<div className="offline"></div>
                  }
                </div>
              );
            })}
          </div>
          <div className="current-user">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
              />
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
            <Logout setDialogue = {setDialogue}/>
          </div>
        </Container>
      )}
    </>
  );
}
const Container = styled.div`
  border-top-left-radius: 2rem;
  border-bottom-left-radius: 2rem;
  display: grid;
  grid-template-rows: 10% 78% 12%;
  overflow: hidden;
  background-color: #0a230e;
  .brand {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    img {
      height: 2rem;
    }
    h3 {
      color: white;
      font-weight: 700;

      text-transform: uppercase;
    }
  }
  .contacts {
    padding-top : 1rem;
    padding-bottom: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.4rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      border: 0.5px solid #ffffff14;
      min-height: 3rem;
      width: 85%;
      cursor: pointer;
      border-radius: 0.8rem;
      padding: 0.4rem;
      gap: 1rem;
      align-items: center;
      display: flex;
      transition: 0.3s ease-in-out;
      .avatar {
        img {
          height: 2rem;
        }
      }
      .username {
        h3 {
          font-weight: 300;

          color: white;
        }
      }
      .online{
        height : 6px;
        width : 6px;
        border-radius : 50%;
        background-color : green;
        box-shadow: 0 0rem 1rem 3px green;
        opacity :.7;
      }
      .offline{
        height : 6px;
        width : 6px;
        border-radius : 50%;
        background-color : red;
        box-shadow: 0 0rem 1rem 3px red;
        opacity :.7;

      }
    }
    .selected {
      border: 0.5px solid #ffffff70;
      background-color: #0d1e09;
    }
  }
  .current-user {
    background-color: #00000050;
    display: flex;
    justify-content : center;
    align-items: center;
    gap: 1rem;
    .avatar {
      img {
        height: 2.7rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        font-weight : 400;
        color: white;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;
export default Contacts;
