import { Box, Typography, TextField, Button, Divider } from "@mui/material";
import { collection, addDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useState } from "react";

function Home() {
  const [comment, setComment] = useState("");

  const handleChange = e => {
    setComment(e.target.value);
  };

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "comments"), {
        // comment: comment,
        comment,
        date: serverTimestamp(),
      });

      console.log("다음 글이 추가되었습니다 : ", docRef.id);
      setComment("");
    } catch (e) {
      console.error("글 추가 시 에러가 발생했습니다.", e);
    }
  };

  return (
    <>
      <Typography variant="h2" component="h2">
        Home{" "}
      </Typography>

      <Box component="form" sx={{ mt: 2 }} onSubmit={onSubmit}>
        <TextField
          fullWidth
          label="Comment"
          placeholder="글을 입력해주세요."
          type="text"
          name="comment"
          variant="outlined"
          multiline
          rows={5}
          value={comment}
          onChange={handleChange}
        />

        <Button sx={{ mt: 2 }} type="submit" variant="contained">
          글쓰기
        </Button>
      </Box>

      <Divider sx={{ my: 3 }} />
    </>
  );
}

export default Home;
