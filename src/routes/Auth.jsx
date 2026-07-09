import { useState } from "react";
import { Box, Typography, TextField, Button, Divider } from "@mui/material";
import { authService } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

function Auth() {
  const [newAccount, setNewAccount] = useState(true);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const auth = authService;

  const handleChange = e => {
    const { name, value } = e.target;

    setForm(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = e => {
    e.preventDefault();
    if (newAccount) {
      // 회원가입
      createUserWithEmailAndPassword(auth, form.email, form.password)
        .then(userCredential => {
          // Signed up
          const user = userCredential.user;
          // ...
        })
        .catch(error => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });
    } else {
      // 로그인
      signInWithEmailAndPassword(auth, form.email, form.password)
        .then(userCredential => {
          // Signed in
          const user = userCredential.user;
          // ...
        })
        .catch(error => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });
    }
  };

  return (
    <>
      <Typography variant="h2" component="h2">
        {newAccount ? "회원가입 폼" : "로그인 폼"}
      </Typography>
      <Box component="form" sx={{ mt: 2 }} onSubmit={onSubmit}>
        <TextField
          fullWidth
          label="Email address"
          type="email"
          name="email"
          defaultValue="Small"
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          sx={{ mt: 2 }}
          fullWidth
          label="Password"
          type="password"
          name="password"
          defaultValue="Small"
          variant="outlined"
          onChange={handleChange}
        />
        <Button sx={{ mt: 2 }} type="submit" variant="contained">
          {newAccount ? "회원가입" : "로그인"}
        </Button>

        <Divider sx={{ my: 3 }} />

        {/* 로그인/회원가입 전환 버튼 */}
        <Button
          sx={{ mt: 2 }}
          type="button"
          variant="contained"
          onClick={() => {
            setNewAccount(prev => !prev);
          }}
        >
          {newAccount ? "로그인으로 전환" : "회원가입으로 전환"}
        </Button>
      </Box>
    </>
  );
}

export default Auth;
