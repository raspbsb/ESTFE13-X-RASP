import Home from "../routes/Home";
import Auth from "../routes/Auth";
import Nav from "./Nav";
import Profile from "../routes/Profile";

import { Routes, Route } from "react-router";

function Router({ isLoggedIn, userId }) {
  return (
    <>
      {isLoggedIn && <Nav />}
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path="/" element={<Home userId={userId} />} />
            <Route path="/profile" element={<Profile />} />
          </>
        ) : (
          <Route path="/" element={<Auth />} />
        )}
      </Routes>
    </>
  );
}

export default Router;
