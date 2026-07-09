import Router from "./Router";
import "./App.css";
import { useState } from "react";
import { authService } from "../firebase";
import { Container } from "@mui/material";

function App() {
  console.log(authService.currentUser);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <>
      <Container>
        <h1>ESTFE-X-RASP</h1>
        <Router isLoggedI={isLoggedIn} />
      </Container>
    </>
  );
}

export default App;
