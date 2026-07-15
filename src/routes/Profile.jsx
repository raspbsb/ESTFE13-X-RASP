import { signOut } from "firebase/auth";
import { authService, db } from "../firebase";
import { Button, Divider, List, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { collection, query, where, getDocs, orderBy, onSnapshot, limit } from "firebase/firestore";
import { useEffect, useState } from "react";
import Comment from "../components/Comment";

function Profile() {
  const auth = authService;
  const userId = auth.currentUser.uid;

  const navigate = useNavigate();
  const [comments, setComments] = useState([]);

  const getComments = async () => {
    const q = query(
      collection(db, "comments"),
      where("uid", "==", userId),
      orderBy("date", "desc"),
      limit(10),
    );

    onSnapshot(q, querySnapshot => {
      const commentsArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      setComments(commentsArray);
    });
  };

  useEffect(() => {
    getComments();
  }, []);

  // 로그아웃 함수
  const onLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch(error => {
        // An error happened.
      });
  };

  console.log(comments);

  return (
    <>
      <h2>Profile</h2>
      <Button sx={{ mt: 2 }} type="button" variant="contained" onClick={onLogout}>
        로그아웃
      </Button>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h4" component="h3">
        Comments
      </Typography>

      <List sx={{ width: "100%" }}>
        {/* commentsArray의 값을 ListItem으로 출력 */}
        {comments.map(item => (
          <Comment key={item.id} item={item} isHaveAuthority={userId === item.uid} />
        ))}
      </List>
    </>
  );
}

export default Profile;
