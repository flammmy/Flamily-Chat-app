import React,{useState,useEffect,useRef} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import { allUsersRoutes ,host} from '../utils/APIRoutes';
import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';
import {io} from "socket.io-client";
import LogoutDialogue from '../components/LogoutDialogue';

function Chat() {
  const socket = useRef();
  const navigate = useNavigate();
  const[contacts,setContacts] = useState([]);
  const[currentUser,setCurrentUser] = useState(undefined);
  const[currentChat,setCurrentChat] = useState(undefined);
  const[isLoaded,setIsLoaded] = useState(false);
  const [dialogue,setDialogue] = useState(false);

  
  useEffect(() => {
    const fetchData = async () =>{
      if(!localStorage.getItem("chat-app-user")){
        navigate("/login");
      }
      else{
        setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
        setIsLoaded(true);
      }
    }
    fetchData();
  },[]
  )

  useEffect(() =>{
    if(currentUser){
      socket.current = io(host);
      socket.current.emit("add-user",currentUser._id);
    }
  })
  useEffect(()=>{
    const fetchData = async () =>{
      if(currentUser){
        if(currentUser.isAvatarImageSet){
          const data = await axios.get(`${allUsersRoutes}/${currentUser._id}`);
          setContacts(data.data);
        }
        else{
          navigate("/setAvatar")
        }
      }
    }
    fetchData();
  },[currentUser]);

  const handleChatChange = (chat) =>{
    setCurrentChat(chat);
  }


  return (
    <Container>
      <div className="container">
        <Contacts contacts = {contacts} currentUser = {currentUser} changeChat = {handleChatChange} socket = {socket} setDialogue={setDialogue}/>
        {
          dialogue ? <LogoutDialogue setDialogue={setDialogue}/> :
          isLoaded && currentChat === undefined ? <Welcome currentUser = {currentUser} setDialogue={setDialogue}/> : <ChatContainer currentChat = {currentChat} currentUser={currentUser} socket = {socket}/>
        }
        
      </div>
    </Container>
  )
}
const Container = styled.div`
  height : 100vh;
  width : 100vw;
  display : flex;
  flex-direction : column;
  justify-content : center;
  gap : 1rem;
  align-items : center;
  background-color :#071c10;
  .container{
    height : 90vh;
    width : 85vw;
    background: #00000071;
    border-radius : 2rem;
    display : grid;
    grid-template-columns : 25% 75%;
    @media screen and (min-width : 600px) and (max-width : 1080px){
      grid-template-columns : 45% 55%;
    }
  }  
 
`;
export default Chat
