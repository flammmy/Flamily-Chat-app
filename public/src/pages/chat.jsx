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
  const [styleGrid, setStyleGrid] = useState({
    gridTemplateColumns: "25vw 75vw",
  });
  const [contactLoaded, setContactLoaded] = useState(false);
  const [messages, setMessages] = useState([]);
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
      socket.current = io(host, {
        reconnection: true,
        transports: ["websocket"],
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
          setContactLoaded(true);
        } else {
          navigate("/setAvatar");
        }
      }
    };
    fetchData();
  }, [currentUser]);
  useEffect(() => {
    if (window.screen.width < 410) {
      toggleContacts();
    }
  }, []);

  const handleChatChange = (chat) => {
    setMessages([]);
    
    setCurrentChat(chat);
  };

  const toggleContacts = () => {
    if (window.screen.width < 410) {
      if (styleGrid["gridTemplateColumns"] === "0 100vw") {
        setStyleGrid({ gridTemplateColumns: "100vw 0" });
      } else {
        setStyleGrid({ gridTemplateColumns: "0 100vw" });
      }
    }
  };

  return (
    <>
      <Container>
        <FaRocketchat className="menuBtn" onClick={() => toggleContacts()} />
        <div className="container" style={styleGrid}>
          {
            <Contacts
              contacts={contacts}
              currentUser={currentUser}
              changeChat={handleChatChange}
              socket={socket}
              setDialogue={setDialogue}
              toggleContacts={toggleContacts}
              contactLoaded = {contactLoaded}
              setContactLoaded={setContactLoaded}
              setMessages = {setMessages}
            />
          }

          {isLoaded && currentChat === undefined ? (
            window.screen.width < 410 ? (
              styleGrid["gridTemplateColumns"] === "0 100vw" && (
                <Welcome currentUser={currentUser} setDialogue={setDialogue} />
              )
            ) : (
              <Welcome currentUser={currentUser} setDialogue={setDialogue} />
            )
          ) : (
            <ChatContainer
              currentChat={currentChat}
              currentUser={currentUser}
              socket={socket}
              messages={messages}
              setMessages = {setMessages}
            />
          )}
        </div>
      </Container>
      <DialogueLogout>
        {dialogue && (
          <LogoutDialogue
            className="logoutDialogue"
            setDialogue={setDialogue}
          />
        )}
      </DialogueLogout>
    </>
  );
}
const DialogueLogout = styled.div`
  position: absolute;
  height: 8rem;
  width: 15rem;
  top: 45%;
  transform: translateY(-50%);
  left: 60%;
  transform: translateX(-50%);
  @media screen and (max-width: 410px) {
    left: 53%;
  }
`;
const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background: linear-gradient(267deg, rgb(165 60 148) 0%, rgb(155 70 141 / 99%) 81%);

  .menuBtn {
    position: absolute;
    right: 1.2rem;
    top: 1rem;
    color: white;
    font-size: 1.4rem;
    display: none;
    @media screen and (max-width: 410px) {
      display: block;
      top: 3rem;
    }
  }
  .container {
    height: 100vh;
    width: 100vw;
    background: #00000071;
    display: grid;
    @media screen and (max-width: 600px) {
      height: 90vh;
      width: 100vw;
      border-radius: 0;
    }
  }
`;
export default Chat;
