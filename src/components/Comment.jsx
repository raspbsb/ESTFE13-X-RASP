import { Box, Button, TextField, Divider, ListItem, ListItemText, Stack } from "@mui/material";
import { db, storageService } from "../firebase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { deleteObject, ref } from "firebase/storage";

export default function Comment({ item, isHaveAuthority }) {
  const [editMode, setEditMode] = useState(false);
  const [comment, setComment] = useState(item.comment);

  // console.log(db);

  // 글 삭제
  const handleDelete = async () => {
    if (!window.confirm("정말 삭제할까요?")) return;

    try {
      await deleteDoc(doc(db, "comments", item.id));

      if (item.image) {
        const storage = storageService;
        // 삭제를 위한 위치 참조 생성
        const storageRef = ref(storage, item.image);
        // 파일 삭제
        deleteObject(storageRef);
      }
    } catch (error) {
      console.error("삭제오류", error);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  // 수정모드 온오프
  const toggleEditMode = () => {
    setEditMode(prev => !prev);
  };

  // 수정 폼 제출 함수
  const onSubmit = async e => {
    e.preventDefault();
    const commentRef = doc(db, "comments", item.id);

    // console.log(comment);
    await updateDoc(commentRef, {
      // 텍스트필드에서 setComment로 변수 comment에 저장한 내용을 컬렉션의 comment필드에 업로드
      comment: comment,
    });
    // 수정 텍스트필드 없애고 최신화 (리렌더링)
    setEditMode(false);
  };

  const handleChange = e => {
    setComment(e.target.value);
  };

  return (
    <ListItem key={item.id} alignItems="flex-center" divider>
      {editMode ? (
        <Box component="form" onSubmit={onSubmit}>
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

          <Stack sx={{ mt: 1 }} direction="row" spacing={1}>
            <Button sx={{ mt: 2 }} type="submit" variant="contained" size="small">
              수정
            </Button>
            <Button variant="outlined" size="small" onClick={toggleEditMode}>
              취소
            </Button>
          </Stack>
        </Box>
      ) : (
        <>
          <ListItemText
            primary={item.comment}
            secondary={item.date?.toDate ? item.date.toDate().toLocaleString() : "작성시간 없음"}
          />

          {
            // 이미지가 있으면 이미지 출력
            item.image && (
              <Box sx={{ marginRight: "5px", display: "flex", alignItems: "center", gap: 1 }}>
                <Box
                  component="img"
                  src={item.image}
                  alt="미리보기"
                  sx={{
                    width: 50,
                    height: 50,
                    objectFit: "cover",
                    border: "1px solid #ddd",
                    borderRadius: 3,
                  }}
                ></Box>
              </Box>
            )
          }

          {isHaveAuthority && (
            <Stack direction="row" spacing={1}>
              <Button variant="outlined" size="small" onClick={toggleEditMode}>
                수정
              </Button>
              <Button variant="contained" color="error" size="small" onClick={handleDelete}>
                삭제
              </Button>
            </Stack>
          )}
        </>
      )}
    </ListItem>
  );
}
