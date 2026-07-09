import { useState } from "react";
import { Box, Typography, TextField, Button, Divider, Snackbar } from "@mui/material";
import { authService } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { useRef } from "react";

function Auth() {
  const [newAccount, setNewAccount] = useState(true);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [errorOpen, setErrorOpen] = useState(false);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const auth = authService;
  const provider = new GoogleAuthProvider();

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
          setError(
            errorMessage.includes("email-already-in-use")
              ? "이메일이 이미 사용중입니다."
              : errorMessage,
          );
          setErrorOpen(true);

          // emailRef.current.value = "";
          // passwordRef.current.value = "";
          setForm({ email: "", password: "" });
          emailRef.current.focus();
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
          setError(errorMessage);
          setErrorOpen(true);

          // emailRef.current.value = "";
          // passwordRef.current.value = "";
          setForm({ email: "", password: "" });
          emailRef.current.focus();
        });
    }
  };

  const onGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then(result => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch(error => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorCode, errorMessage, email, credential);
        // ...
      });
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
          variant="outlined"
          onChange={handleChange}
          inputRef={emailRef}
          value={form.email}
        />

        <TextField
          sx={{ mt: 2 }}
          fullWidth
          label="Password"
          type="password"
          name="password"
          variant="outlined"
          onChange={handleChange}
          value={form.password}
        />

        <Button sx={{ mt: 2 }} type="submit" variant="contained">
          {newAccount ? "회원가입" : "로그인"}
        </Button>

        <Snackbar
          open={errorOpen}
          autoHideDuration={3000}
          message={error}
          onClose={() => {
            setErrorOpen(false);
          }}
        />

        <Divider sx={{ my: 3 }} />

        {/* 구글 회원가입/로그인 버튼 */}
        <Button sx={{ mt: 2 }} type="button" variant="outlined" onClick={onGoogleSignIn}>
          {newAccount ? "구글로 회원가입" : "구글로 로그인"}
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
