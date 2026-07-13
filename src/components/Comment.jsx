import { Button, Divider, ListItem, ListItemText, Stack } from "@mui/material";

export default function Comment({ item }) {
  return (
    <ListItem key={item.id} alignItems="flex-center" divider>
      <ListItemText
        primary={item.comment}
        secondary={item.date?.toDate ? item.date.toDate().toLocaleString() : "작성시간 없음"}
      />

      <Stack direction="row" spacing={1}>
        <Button variant="outlined" size="small">
          수정
        </Button>
        <Button variant="contained" color="error" size="small">
          삭제
        </Button>
      </Stack>
    </ListItem>
  );
}
