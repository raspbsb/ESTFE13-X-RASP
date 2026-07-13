import {
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  useScrollTrigger,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState, useRef } from "react";
import Comment from "../components/Comment";
import UploadFileIcon from "@mui/icons-material/UploadFile";

function Home({ userId }) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [attachment, setAttachment] = useState(null);
  const fileInputRef = useRef(null);

  // useEffect로 데이터 조회 결과를 변수명 comments에 할당
  const getComments = async () => {
    const q = query(collection(db, "comments"), orderBy("date", "desc"), limit(5));

    onSnapshot(q, querySnapshot => {
      // const querySnapshot = await getDocs(q);
      // console.log(querySnapshot);
      console.log(querySnapshot.docs);
      const comments = [];
      const commentsArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setComments(commentsArray);
    });
  };

  useEffect(() => {
    getComments();
  }, []);

  console.log(comments);

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
        uid: userId,
      });

      console.log("다음 글이 추가되었습니다 : ", docRef.id);
      setComment("");
      // getComments();
    } catch (e) {
      console.error("글 추가 시 에러가 발생했습니다.", e);
    }
  };

  // 로컬에서 파일 경로 불러오기
  const onFileChange = e => {
    // console.log(e.target.files[0]);
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onload = e => {
      // console.log(e.target.result);
      setAttachment(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const onClearFile = () => {
    setAttachment(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  return (
    <>
      <Typography variant="h2" component="h2">
        Home
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

        <Box sx={{ mt: 1, display: "flex", alignItems: "center", gap: 1 }}>
          <Button component="label" type="button" variant="outlined" startIcon={<UploadFileIcon />}>
            이미지 선택
            <input type="file" hidden ref={fileInputRef} accept="image/*" onChange={onFileChange} />
          </Button>
          {attachment && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box
                component="img"
                src={attachment}
                alt="미리보기"
                sx={{
                  width: 50,
                  height: 50,
                  objectFit: "cover",
                  border: "1px solid #ddd",
                  borderRadius: 3,
                }}
              ></Box>
              <Button type="button" variant="outlined" size="small" onClick={onClearFile}>
                파일 첨부 취소
              </Button>
            </Box>
          )}
        </Box>

        <Button sx={{ mt: 2 }} type="submit" variant="contained">
          글쓰기
        </Button>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h4" component="h3">
        Comments
      </Typography>

      <List sx={{ width: "100%" }}>
        {/* commentsArray의 값을 ListItem으로 출력 */}
        {comments.map(item => (
          <Comment key={item.id} item={item} isShown={userId === item.uid} />
        ))}
      </List>
    </>
  );
}

export default Home;
