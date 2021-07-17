import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Chats from "./Chats";
import ChatView from "./ChatView";
import { login, logout, selectUser } from "./features/appSlice";
import Priview from "./Priview";
import WebcamCapture from "./WebcamCapture";
import Login from "./Login.js";
import { useEffect } from "react";
import { auth } from "./db/firebase";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            username: authUser.displayName,
            profilePic: authUser.photoURL,
            id: authUser.uid,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, []);

  return (
    <div className="App">
      <Router>
        {!user ? (
          <Login />
        ) : (
          <div className="app_body">
            <Switch>
              <Route path="/priview">
                <Priview />
              </Route>
              <Route path="/chats/view">
                <ChatView />
              </Route>
              <Route path="/chats">
                <Chats />
              </Route>
              <Route exact path="/">
                <WebcamCapture />
              </Route>
            </Switch>
          </div>
        )}
      </Router>
    </div>
  );
}
export default App;
