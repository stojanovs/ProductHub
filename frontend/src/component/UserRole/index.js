import React from "react";
import { useSelector } from "react-redux";
import { Chip, Box, Typography } from "@mui/material";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PersonIcon from "@mui/icons-material/Person";

const UserRole = () => {
  const userInfo = useSelector((state) => state.userLogin?.userInfo);

  if (!userInfo) {
    return null;
  }

  const isAdmin = userInfo?.role === "admin";

  return (
    <Box display="flex" alignItems="center" gap={1}>
      <Chip
        icon={isAdmin ? <AdminPanelSettingsIcon /> : <PersonIcon />}
        label={isAdmin ? "Admin" : "User"}
        color={isAdmin ? "primary" : "default"}
        variant="outlined"
        size="small"
      />
      {isAdmin && (
        <Typography variant="caption" style={{ color: "#1976d2", fontWeight: "bold" }}>
          (Full Access)
        </Typography>
      )}
    </Box>
  );
};

export default UserRole;
