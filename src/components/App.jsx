import Router from "./Router";
import "./App.css";
import { useEffect, useState } from "react";
import { authService } from "../firebase";
import { Container } from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  // console.log(authService.currentUser);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [init, setInit] = useState(false); // 초기화 전
  const [userId, setUserId] = useState(null);
  const auth = authService;

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        // User is signed in
        const uid = user.uid;
        // console.log(uid);
        setUserId(uid);
        setIsLoggedIn(true);
      } else {
        // User is signed out
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, [auth]);

  return (
    <>
      <Container>
        <h1>ESTFE-X-RASP</h1>
        {init ? <Router isLoggedIn={isLoggedIn} userId={userId} /> : <h2>초기화 중입니다.</h2>}
      </Container>
    </>
  );
}

export default App;
