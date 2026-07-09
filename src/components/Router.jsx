import Home from "../routes/Home";
import Auth from "../routes/Auth";
import { Route, Routes } from "react-router";

function Router({ isLoggedIn }) {
  return (
    <>
      <Routes>
        {isLoggedIn ? <Route path="/" element={<Home />} /> : <Route path="/" element={<Auth />} />}
      </Routes>
    </>
  );
}

export default Router;
