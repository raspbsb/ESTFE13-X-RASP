import { useState } from "react";
import Home from "../routes/Home";
import Auth from "../routes/Auth";
import { Route, Routes } from "react-router";

function Router() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <>
      <Routes>
        {isLoggedIn ? <Route path="/" element={<Home />} /> : <Route path="/" element={<Auth />} />}
      </Routes>
    </>
  );
}

export default Router;
