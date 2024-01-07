import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import loader from "../assets/loader.gif";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Buffer } from "buffer";
import {setAvatarRoute } from "../utils/APIRoutes";

function SetAvatar() {
  const api = "https://api.multiavatar.com/45678945";
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  useEffect(() =>{
    // eslint-disable-next-line react-hooks/exhaustive-deps

    if(!localStorage.getItem("chat-app-user")){
      navigate("/login");
    }
  },[]);
  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar first", toastOptions);
    }
    else{
      const user = await JSON.parse(localStorage.getItem("chat-app-user"));
      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`,{
        image : avatar[selectedAvatar]
      });

    if(data.isSet){
      user.isAvatarImageSet = true;
      user.avatarImage = data.image;
      localStorage.setItem("chat-app-user",JSON.stringify(user));
      navigate('/');
    }
    else{
      toast.error("Error setting profile picture",toastOptions);
    }
  }

  };
  useEffect(() => {
    const fetchdata = async () => {
      const data = [];
      for (let i = 0; i < 4; i++) {
        try {
          const image = await axios.get(
            `${api}/${Math.round(Math.random() * 1000)}`
          );
          const buffer = Buffer.from(image.data, "binary");
          data.push(buffer.toString("base64"));
        } catch (error) {
          console.log("fetching avatars failed :", error);
        }
      }
      setAvatar(data);
      setIsLoading(false);
    };
    fetchdata();
  }, []);

  return (
    <>
      {isLoading ? (
        <Container>
          <img src={loader} alt="loading..." />
        </Container>
      ) : (
        <Container>
          <div className="title-container">
            <h1>Pick an avatar as your profile picture</h1>
          </div>
          <div className="avatars">
            {avatar.map((av, index) => {
              return (
                <div
                  className={`avatar ${
                    selectedAvatar === index ? "selected" : ""
                  }`}
                  key={index}
                >
                  <img
                    src={`data:image/svg+xml;base64,${av}`}
                    alt="avatar"
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              );
            })}
          </div>
          <button className="submit-btn" onClick={setProfilePicture}>
            Set as profile picture
          </button>
        </Container>
      )}
      <ToastContainer />
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #0b311a;
  height: 100vh;
  width: 100vw;
  .loader {
    max-inline-size: 100%;
  }
  .title-container {
    h1 {
      color: white;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;
    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.3s ease-in-out;
      img {
        height: 5rem;
      }
    }
    .selected {
      border: 0.4rem solid #cb1e70;
    }
  }
  .submit-btn {
    background-color: #4d7516;
    color: white;
    padding: 1rem 2rem;
    border: none;
    border-radius: 0.4rem;
    pointer: cursor;
    font-size: 1rem;
    text-transform: uppercase;
    transition: 0.3s ease-in-out;
    font-weight: bold;
    &:hover {
      background-color: #2a410b;
    }
  }
`;
export default SetAvatar;
