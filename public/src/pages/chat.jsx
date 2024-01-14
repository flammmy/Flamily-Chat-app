import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { allUsersRoutes, host } from "../utils/APIRoutes";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import { io } from "socket.io-client";
import { FaRocketchat } from "react-icons/fa";

import LogoutDialogue from "../components/LogoutDialogue";

function Chat() {
  const socket = useRef();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);
  const [dialogue, setDialogue] = useState(false);
  const [styleGrid, setStyleGrid] = useState({gridTemplateColumns : "25vw 75vw"});
  useEffect(() => {
    const fetchData = async () => {
      if (!localStorage.getItem("chat-app-user")) {
        navigate("/login");
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
        setIsLoaded(true);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (currentUser) {
      socket.current = io("https://flamily-chat-app.vercel.app", {
        reconnection: true,
        transports: ["websocket","polling"],
        withCredentials : true
  
      });
      socket.current.emit("add-user", currentUser._id);
    }
  });
  useEffect(() => {
    const fetchData = async () => {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const data = await axios.get(`${allUsersRoutes}/${currentUser._id}`);
          setContacts(data.data);
        } else {
          navigate("/setAvatar");
        }
      }
    };
    fetchData();
  }, [currentUser]);
  useEffect(() => {
    if(window.screen.width < 410){
      toggleContacts();
    }
  },[])

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  const toggleContacts = () => {
    if(window.screen.width < 410){
      if(styleGrid['gridTemplateColumns'] === "0 100vw"){
        setStyleGrid({gridTemplateColumns : "100vw 0"});
      }
      else{
        setStyleGrid({gridTemplateColumns : "0 100vw"})
      }
    }
 
  };

  return (
    <Container >
      <FaRocketchat
        className="menuBtn"
        onClick={() => toggleContacts()}
      />
      <div className="container" style={styleGrid}>
        {(
          <Contacts
            contacts={contacts}
            currentUser={currentUser}
            changeChat={handleChatChange}
            socket={socket}
            setDialogue={setDialogue}
            toggleContacts = {toggleContacts}
          />
        )}

        {dialogue ? (
          <LogoutDialogue setDialogue={setDialogue} />
        ) : isLoaded && currentChat === undefined ? (
          window.screen.width < 410 ? (styleGrid['gridTemplateColumns'] === "0 100vw") && <Welcome currentUser={currentUser} setDialogue={setDialogue} /> : <Welcome currentUser={currentUser} setDialogue={setDialogue}/>
        ) : (
          <ChatContainer
            currentChat={currentChat}
            currentUser={currentUser}
            socket={socket}
          />
        )}
      </div>
    </Container>
  );
}
const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #071c10;
  .menuBtn{
    position : absolute;
    right : 1.2rem;
    top : 1rem;
    color : white;
    font-size : 1.4rem;
    display : none;
    @media screen and (max-width: 410px) {
      display : block;
    }
  }
  .container {
    height: 100vh;
    width: 100vw;
    background: #00000071;
    border-radius: 2rem;
    display: grid;
    @media screen and (min-width: 600px) and (max-width: 1080px) {
      height: 100vh;
      width: 100vw;
      border-radius : 0;
    }

  }
`;
export default Chat;
