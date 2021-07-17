import React, { useEffect, useState } from "react";
import { Avatar } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import "./Chats.css";
import { auth, db } from "./db/firebase";
import Chat from "./Chat";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "./features/appSlice";
import { RadioButtonChecked } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import { resertCameraImge } from "./features/cameraSlice";

function Chats() {
  const [posts, setPosts] = useState([]);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
  }, []);
  const takeSnap = () => {
    dispatch(resertCameraImge);
    history.push("/");
  };
  return (
    <div className="chats">
      <div className="chats_header">
        <Avatar
          src={user.profilePic}
          onClick={() => auth.signOut()}
          className="chats_avatar"
        />
        <div className="chats_search">
          <SearchIcon className="search_icon" />
          <input placeholder="Friends" type="text" />
        </div>
        <ChatBubbleIcon className="message_icon" />
      </div>
      <div className="chat_posts">
        {posts.map(
          ({
            id,
            data: { profilePic, username, timestamp, imageUrl, read },
          }) => (
            <Chat
              key={id}
              id={id}
              username={username}
              timestamp={timestamp}
              imageUrl={imageUrl}
              profilePic={profilePic}
              read={read}
            />
          )
        )}
      </div>
      <RadioButtonChecked
        onClick={takeSnap}
        className="chats_button"
        fontSize="large"
      />
    </div>
  );
}

export default Chats;
