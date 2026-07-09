import Router from "./Router";
import "./App.css";
import { useState } from "react";
import { authService } from "../firebase";
import { Container } from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  // console.log(authService.currentUser);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const auth = authService;

  onAuthStateChanged(auth, user => {
    if (user) {
      // User is signed in
      const uid = user.uid;
      setIsLoggedIn(true);
    } else {
      // User is signed out
      setIsLoggedIn(false);
    }
  });

  return (
    <>
      <Container>
        <h1>ESTFE-X-RASP</h1>
        <Router isLoggedIn={isLoggedIn} />
      </Container>
    </>
  );
}

export default App;
