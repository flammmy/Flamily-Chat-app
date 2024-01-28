import React,{useState} from 'react'
import styled from 'styled-components';
import Picker from 'emoji-picker-react';
import {IoMdSend} from 'react-icons/io';
import {BsEmojiSmileFill} from 'react-icons/bs';
import LogoutDialogue from './LogoutDialogue';
function InputChat({handleSendMsg,setDialogue}) {
  const [showEmojiPicker,setShowEmojiPicker] = useState(false);
  const [msg,setMsg] = useState("");

  const handleEmojiPickerHideShow = () =>{
    setShowEmojiPicker(!showEmojiPicker);
  }
  const handleEmojiClick = (emoji) =>{
    let message = msg;
    message += emoji.emoji;
    setMsg(message);

  }
  const sentChat = (e)=>{
    e.preventDefault();
    if(msg.length>0){
      handleSendMsg(msg);
      setMsg("");
    }
    setShowEmojiPicker(!showEmojiPicker);


  }
  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
            <BsEmojiSmileFill onClick={handleEmojiPickerHideShow} />
            {
              showEmojiPicker && <Picker height={330} width={350} onEmojiClick={handleEmojiClick}/>
            }
        </div>
      </div>
      <form className="input-container" onSubmit={(e) => sentChat(e)}>
        <input type="text" placeholder='Type your message here' value = {msg} onChange= {(e) => setMsg(e.target.value)}/>
        <button className="submit"> 
            <IoMdSend />
        </button>
      </form> 
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-columns : 5% 95%;
  align-items : center;
  padding : 0 2rem;
  padding-bottom : .3rem;
  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
    .emoji {
      position: relative;
      @media screen and (max-width : 420px){
        position : absolute;
        left : 0;
      }
      svg {
        font-size: 2.5rem;
        color: #ffff00c8;
        cursor: pointer;
      }
      .EmojiPickerReact{
        position: absolute;
        top: -350px;
        background-color : #65215d;
        // box-shadow : 0 5px 10px #9a86f3;
        border-color : #9186f3; 

        .epr-body::-webkit-scrollbar{
            background-color : transparent;
            width : 5px;
            &-thumb{
              background-color : #9a86f3;
            }
        }
   
        li.epr-emoji-category>.epr-emoji-category-label{
          background-color : #65215d;
          outline : 2px solid #65215d;
        }
        .epr-search-container input.epr-search{
          background-color : transparent;
        }
      }
    }

  }
  .input-container{
    width : 100%;
    border-radius : 1rem;
    display : flex;
    align-items : center; 
    gap :2rem;
    height : 3rem;
    background-color : #ffffff10;
    border:1px solid white;
    input{
      width : 90%;
      height : 80%;
      background-color : transparent;
      color: white;
      border : none;
      padding-left : 1rem;
      font-size : 1.2rem;
      &::selection{
        background-color : #9186f3;
      }
      &:focus{
        outline : none;

      }
      &::placeholder{
        color : white;
      }
    }
    button{
      padding : .3rem 2rem;
      border-radius : 2rem;
      display : flex;
      justify-content : center;
      align-items : center;
      background-color : #9a86f3;
      border:none;
      svg{
          font-size : 1.8rem;
          color : white;
          width : 1.3rem;
      }
    }
  }
`;
export default InputChat;
