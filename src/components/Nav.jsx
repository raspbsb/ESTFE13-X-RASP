import { Link } from "react-router";
import { Box, Button } from "@mui/material";

const Nav = () => {
  return (
    <Box component="nav" sx={{ mt: 2, display: "flex", gap: 2 }}>
      <Button component={Link} to="/" variant="text">
        Home
      </Button>

      <Button component={Link} to="/profile" variant="text">
        Profile
      </Button>
    </Box>
  );
};

export default Nav;
