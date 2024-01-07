import React, { useState, useEffect } from "react";
import styled from "styled-components";
import logo from "../assets/logo.svg";
function Contacts({ contacts, currentUser ,changeChat}) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, SetCurrentSelected] = useState(undefined);

  useEffect(() => {
    if (currentUser) {
      setCurrentUserImage(currentUser.avatarImage);
      setCurrentUserName(currentUser.username);
    }
  },[currentUser]);
  const changeCurrentChat = (index, contact) => {
    SetCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <>
      {currentUserImage && currentUserName && (
        <Container>
          <div className="brand">
            <img src={logo} alt="logo" />
            <h3>Tackie</h3>
          </div>
          <div className="contacts">
            {contacts.map((contact, index) => {
              return (
                <div
                  className={`contact ${
                    index === currentSelected ? "selected" : ""
                  }` }
                  onClick = {() => (changeCurrentChat(index,contact))}
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
          </div>
        </Container>
      )}
    </>
  );
}
const Container = styled.div`
  border-top-left-radius : 2rem;
  border-bottom-left-radius : 2rem;
  display: grid;
  grid-template-rows : 10% 75% 15%;
  overflow : hidden;
  background-color : #0a230e;
  .brand{
    display : flex;
    justify-content : center;
    align-items : center;
    gap :1rem;
    img{
      height : 2rem;
    }
    h3{
      color : white;
      text-transform : uppercase;
    }
  }
  .contacts{
    display: flex;
    flex-direction : column;
    align-items : center;
    overflow : auto;
    gap : 0.8rem;
    &::-webkit-scroller{
      width : .8rem;
      &-thumb{
        background-color : #ffffff39;
        width :.1rem;
        border-radius : 1rem;
      }
    }
    .contact{
      background-color : #ffffff39; 
      min-height : 5rem;
      width: 85%;
      cursor : pointer;
      border-radius : .8rem;
      padding : .4rem;
      gap : 1rem;
      align-items : center;
      display : flex;
      transition : .3s ease-in-out;
      .avatar{
        img {
          height : 3rem;
        }
      }
      .username{
        h3{
          color : white;
        }
      }
    }
    .selected{
      background-color : #9186f3;
    }
  }
  .current-user{
    background-color : #00000076;
    display : flex;
    justify-content : center;
    align-items : center;
    gap : 2rem;
    .avatar{
      img{
        height : 4rem;
        max-inline-size : 100%;
      }
    }
    .username{
      h2{
        color : white;
      }
    }
    @media screen and (min-width : 720px) and (max-width : 1080){
      gap : .5rem;
      .username{
        h2{
          font-size : 1rem;
        }
      }
    }
  }
`;
export default Contacts;
