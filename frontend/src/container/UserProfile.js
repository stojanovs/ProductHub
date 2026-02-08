import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Paper,
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
  Alert,
  Grid,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import { useHistory } from "react-router-dom";
import moment from "moment";
import {
  getUserProfile,
  updateUserProfile,
  resetProfileState,
} from "../redux/actions/AuthAction";
import swal from "sweetalert";

const UserProfile = () => {
  const dispatch = useDispatch();

  // State from Redux
  const { userInfo } = useSelector((state) => state.userLogin);
  const { profile, loading, updating, updateMessage, updateError } = useSelector(
    (state) => state.userProfile
  );

  // Local component state for edit form
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [validationError, setValidationError] = useState("");

  // Fetch profile on component mount
  useEffect(() => {
    if (userInfo && !profile) {
      dispatch(getUserProfile());
    }
  }, [dispatch, userInfo, profile]);

  // Populate form with profile data
  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || "",
        email: profile.email || "",
        password: "",
        confirmPassword: "",
      });
    }
  }, [profile]);

  // Handle success/error messages
  useEffect(() => {
    if (updateMessage) {
      swal({
        icon: "success",
        text: updateMessage,
      }).then(() => {
        setIsEditing(false);
        dispatch(getUserProfile());
      });
    }
  }, [updateMessage, dispatch]);

  useEffect(() => {
    if (updateError) {
      swal({
        icon: "error",
        text: updateError,
      });
    }
  }, [updateError]);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setValidationError("");
  };

  // Validate form
  const validateForm = () => {
    if (!formData.name.trim()) {
      setValidationError("Name is required");
      return false;
    }

    if (!formData.email.trim()) {
      setValidationError("Email is required");
      return false;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setValidationError("Please enter a valid email");
      return false;
    }

    // If password is being changed, validate it
    if (formData.password) {
      if (formData.password.length < 6) {
        setValidationError("Password must be at least 6 characters");
        return false;
      }

      if (formData.password !== formData.confirmPassword) {
        setValidationError("Passwords do not match");
        return false;
      }
    }

    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Prepare data for update
    const updateData = {
      name: formData.name,
      email: formData.email,
    };

    if (formData.password) {
      updateData.password = formData.password;
    }

    const success = await dispatch(updateUserProfile(updateData));
    if (success) {
      setFormData({
        name: formData.name,
        email: formData.email,
        password: "",
        confirmPassword: "",
      });
    }
  };

  // Check if user is authenticated
  if (!userInfo) {
    return (
      <Container style={{ paddingTop: "20px", paddingBottom: "40px" }}>
        <Alert severity="warning">
          Please log in to view your profile.
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" style={{ paddingTop: "20px", paddingBottom: "40px" }}>
      <Typography variant="h4" gutterBottom style={{ marginBottom: "30px" }}>
        My Profile
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" padding={3}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {!isEditing ? (
            // View Mode
            <Card style={{ marginBottom: "30px" }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Profile Information
                </Typography>
                <Divider style={{ margin: "15px 0" }} />

                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <Box style={{ marginBottom: "15px" }}>
                      <Typography variant="body2" color="textSecondary">
                        Full Name
                      </Typography>
                      <Typography variant="body1">
                        {profile?.name || "N/A"}
                      </Typography>
                    </Box>

                    <Box style={{ marginBottom: "15px" }}>
                      <Typography variant="body2" color="textSecondary">
                        Email
                      </Typography>
                      <Typography variant="body1">
                        {profile?.email || "N/A"}
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Box style={{ marginBottom: "15px" }}>
                      <Typography variant="body2" color="textSecondary">
                        Role
                      </Typography>
                      <Typography
                        variant="body1"
                        style={{
                          textTransform: "capitalize",
                          color:
                            profile?.role === "admin" ? "#d32f2f" : "#1976d2",
                          fontWeight: "bold",
                        }}
                      >
                        {profile?.role || "N/A"}
                      </Typography>
                    </Box>

                    <Box style={{ marginBottom: "15px" }}>
                      <Typography variant="body2" color="textSecondary">
                        Member Since
                      </Typography>
                      <Typography variant="body1">
                        {profile?.createdAt
                          ? moment(profile.createdAt).format("MMM DD, YYYY")
                          : "N/A"}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>

                <Divider style={{ margin: "20px 0" }} />

                <Box display="flex" gap={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit Profile
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ) : (
            // Edit Mode
            <Card style={{ marginBottom: "30px" }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Edit Profile
                </Typography>
                <Divider style={{ margin: "15px 0" }} />

                {validationError && (
                  <Alert severity="error" style={{ marginBottom: "15px" }}>
                    {validationError}
                  </Alert>
                )}

                <form onSubmit={handleSubmit}>
                  <Box style={{ marginBottom: "15px" }}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      disabled={updating}
                    />
                  </Box>

                  <Box style={{ marginBottom: "15px" }}>
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      disabled={updating}
                    />
                  </Box>

                  <Typography variant="body2" style={{ marginTop: "20px", marginBottom: "10px", fontWeight: "bold" }}>
                    Change Password (Leave blank to keep current password)
                  </Typography>

                  <Box style={{ marginBottom: "15px" }}>
                    <TextField
                      fullWidth
                      label="New Password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      disabled={updating}
                      placeholder="Leave blank to keep current password"
                    />
                  </Box>

                  <Box style={{ marginBottom: "20px" }}>
                    <TextField
                      fullWidth
                      label="Confirm Password"
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      disabled={updating}
                      placeholder="Leave blank to keep current password"
                    />
                  </Box>

                  <Divider style={{ margin: "20px 0" }} />

                  <Box display="flex" gap={2}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      disabled={updating}
                    >
                      {updating ? "Updating..." : "Save Changes"}
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => {
                        setIsEditing(false);
                        setFormData({
                          name: profile?.name || "",
                          email: profile?.email || "",
                          password: "",
                          confirmPassword: "",
                        });
                        setValidationError("");
                      }}
                      disabled={updating}
                    >
                      Cancel
                    </Button>
                  </Box>
                </form>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </Container>
  );
};

export default UserProfile;
