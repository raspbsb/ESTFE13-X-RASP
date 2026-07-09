import { signOut } from "firebase/auth";
import { authService } from "../firebase";
import { Typography, Button } from "@mui/material";
import { useNavigate } from "react-router";

function Profile() {
  const auth = authService;
  const navigate = useNavigate();

  const onLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch(error => {
        // An error happened.
      });
  };

  return (
    <>
      <h2>Profile</h2>
      <Button sx={{ mt: 2 }} type="button" variant="contained" onClick={onLogout}>
        로그아웃
      </Button>
    </>
  );
}

export default Profile;
