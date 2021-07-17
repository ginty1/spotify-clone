import { Button } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import "./Login.css";
import login from "./features/appSlice";
import { auth, provider } from "./db/firebase";
function Login() {
  const dispatch = useDispatch();

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        console.log(result);
        dispatch(
          login({
            username: result.user.displayName,
            profilePic: result.user.photoURL,
            id: result.uid,
          })
        );
      })
      .catch((error) => error.massage);
  };
  return (
    <div className="login">
      <div className="login_container">
        <img src="/img/login-img.jpg" alt="" />
        <Button variant="outlined" onClick={signIn}>
          Sign In
        </Button>
      </div>
    </div>
  );
}
export default Login;
