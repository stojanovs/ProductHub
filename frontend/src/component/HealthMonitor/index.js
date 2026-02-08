import React, { useEffect, useState } from "react";
import api from "../../api";
import {
  Card,
  CardContent,
  CardHeader,
  Chip,
  Grid,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import WarningIcon from "@mui/icons-material/Warning";

const HealthMonitor = () => {
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkHealth = async () => {
      try {
        setLoading(true);
        const response = await api.get("/health/");
        setHealth(response.data);
      } catch (error) {
        console.error("Health check failed:", error);
      } finally {
        setLoading(false);
      }
    };

    checkHealth();
    const interval = setInterval(checkHealth, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (!health) {
    return <Typography color="error">Unable to fetch health status</Typography>;
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "healthy":
        return "success";
      case "degraded":
        return "warning";
      case "unhealthy":
        return "error";
      default:
        return "default";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "healthy":
        return <CheckCircleIcon style={{ color: "green" }} />;
      case "degraded":
        return <WarningIcon style={{ color: "orange" }} />;
      case "unhealthy":
        return <ErrorIcon style={{ color: "red" }} />;
      default:
        return null;
    }
  };

  return (
    <Card style={{ marginBottom: "20px" }}>
      <CardHeader
        title="System Health Status"
        avatar={getStatusIcon(health.status)}
      />
      <CardContent>
        <Box style={{ marginBottom: "15px" }}>
          <Chip
            label={`Overall Status: ${health.status.toUpperCase()}`}
            color={getStatusColor(health.status)}
            variant="outlined"
          />
          <Typography variant="caption" display="block" style={{ marginTop: "5px" }}>
            Updated: {new Date(health.timestamp).toLocaleString()}
          </Typography>
        </Box>

        <Grid container spacing={2}>
          {Object.entries(health.services).map(([service, info]) => (
            <Grid item xs={12} sm={6} md={4} key={service}>
              <Card variant="outlined">
                <CardContent>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Typography variant="subtitle2" style={{ flex: 1 }}>
                      {service.charAt(0).toUpperCase() + service.slice(1)}
                    </Typography>
                    {getStatusIcon(info.status)}
                  </Box>
                  <Typography variant="caption" color="textSecondary">
                    {info.status === "healthy" ? "Running" : info.error || "Unknown"}
                  </Typography>
                  {info.port && (
                    <Typography variant="caption" display="block">
                      Port: {info.port}
                    </Typography>
                  )}
                  {info.database && (
                    <Typography variant="caption" display="block">
                      DB: {info.database}
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default HealthMonitor;
