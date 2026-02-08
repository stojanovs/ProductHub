import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Pagination,
  Card,
  CardContent,
  Grid,
  Typography,
  Chip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const ProductFilter = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    name: "",
    minPrice: "",
    maxPrice: "",
  });

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
      page: 1, // Reset to page 1 when filter changes
    }));
  };

  const handlePageChange = (event, page) => {
    setFilters((prev) => ({
      ...prev,
      page,
    }));
  };

  const handleApplyFilters = () => {
    onFilter(filters);
  };

  const handleReset = () => {
    const resetFilters = {
      page: 1,
      limit: 10,
      name: "",
      minPrice: "",
      maxPrice: "",
    };
    setFilters(resetFilters);
    onFilter(resetFilters);
  };

  return (
    <Card style={{ marginBottom: "20px" }}>
      <CardContent>
        <Typography variant="h6" style={{ marginBottom: "15px" }}>
          <SearchIcon style={{ marginRight: "8px", verticalAlign: "middle" }} />
          Filter & Search Products
        </Typography>

        <Grid container spacing={2} style={{ marginBottom: "15px" }}>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="Search by Name"
              placeholder="e.g., Product"
              value={filters.name}
              onChange={(e) => handleFilterChange("name", e.target.value)}
              size="small"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={2}>
            <TextField
              fullWidth
              label="Min Price"
              type="number"
              placeholder="0"
              value={filters.minPrice}
              onChange={(e) => handleFilterChange("minPrice", e.target.value)}
              size="small"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={2}>
            <TextField
              fullWidth
              label="Max Price"
              type="number"
              placeholder="1000"
              value={filters.maxPrice}
              onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
              size="small"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={2}>
            <TextField
              fullWidth
              label="Items per Page"
              type="number"
              value={filters.limit}
              onChange={(e) =>
                handleFilterChange("limit", Math.max(1, parseInt(e.target.value) || 10))
              }
              size="small"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={2}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleApplyFilters}
              style={{ height: "40px" }}
            >
              Search
            </Button>
          </Grid>

          <Grid item xs={12} sm={6} md={2}>
            <Button
              fullWidth
              variant="outlined"
              onClick={handleReset}
              style={{ height: "40px" }}
            >
              Reset
            </Button>
          </Grid>
        </Grid>

        <Box
          display="flex"
          gap={1}
          flexWrap="wrap"
          style={{ marginTop: "10px", minHeight: "32px" }}
        >
          {filters.name && (
            <Chip
              label={`Name: "${filters.name}"`}
              onDelete={() => handleFilterChange("name", "")}
              size="small"
            />
          )}
          {filters.minPrice && (
            <Chip
              label={`Min: $${filters.minPrice}`}
              onDelete={() => handleFilterChange("minPrice", "")}
              size="small"
            />
          )}
          {filters.maxPrice && (
            <Chip
              label={`Max: $${filters.maxPrice}`}
              onDelete={() => handleFilterChange("maxPrice", "")}
              size="small"
            />
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export const PaginationControl = ({ pagination, onPageChange }) => {
  if (!pagination || pagination.pages <= 1) {
    return null;
  }

  return (
    <Box display="flex" justifyContent="center" style={{ marginTop: "20px" }}>
      <Box display="flex" alignItems="center" gap={2}>
        <Typography variant="caption" color="textSecondary">
          Page {pagination.page} of {pagination.pages} | Total: {pagination.total} items
        </Typography>
        <Pagination
          count={pagination.pages}
          page={pagination.page}
          onChange={onPageChange}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default ProductFilter;
