import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { resertCameraImge, selectcameraImage } from "./features/cameraSlice";
import CloseIcon from "@material-ui/icons/Close";
import TextFieldsIcon from "@material-ui/icons/TextFields";
import CreateIcon from "@material-ui/icons/Create";
import NoteIcon from "@material-ui/icons/Note";
import MusicNoteIcon from "@material-ui/icons/MusicNote";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import CropIcon from "@material-ui/icons/Crop";
import TimerIcon from "@material-ui/icons/Timer";
import SendIcon from "@material-ui/icons/Send";
import { v4 as uuid } from "uuid";
import { storage, db } from "./db/firebase";
import firebase from "firebase";
import "./Priview.css";
import { selectUser } from "./features/appSlice";
function Priview() {
  const dispatch = useDispatch();
  const cameraImage = useSelector(selectcameraImage);
  const user = useSelector(selectUser);
  const priviewClosed = () => {
    //reserting the payload back to null
    dispatch(resertCameraImge());
  };
  const history = useHistory();
  useEffect(() => {
    if (!cameraImage) {
      history.replace("/");
    }
  }, [cameraImage, history]);

  const sendPost = () => {
    //this will generate a random unique id for each image
    const id = uuid();
    const uploadTask = storage
      .ref(`posts/${id}`)
      .putString(cameraImage, "data_url");

    uploadTask.on(
      "state_changed",
      null,
      (error) => {
        //handle error
        console.log(error);
      },
      () => {
        // storage complete function
        storage
          .ref(`posts/${id}`)
          .getDownloadURL()
          .then((url) => {
            console.log(url);
            db.collection("posts").add({
              imageUrl: url,
              username: "ginty",
              read: false,
              profilePic: user.profilePic,
              //gives u the actual time no matter where u are
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });

            //getting the imfor to chats screen
            history.replace("/chats");
          });
      }
    );
  };
  return (
    <div className="priview">
      <CloseIcon onClick={priviewClosed} className="priview_close" />
      <div className="priview_toolbarRight">
        <TextFieldsIcon />
        <CreateIcon />
        <NoteIcon />
        <MusicNoteIcon />
        <AttachFileIcon />
        <CropIcon />
        <TimerIcon />
      </div>
      <img src={cameraImage} alt="" />
      <div onClick={sendPost} className="priview_footer">
        <h2>Send now</h2>
        <SendIcon fontSize="small" className="priview_sendIcon" />
      </div>
    </div>
  );
}

export default Priview;
