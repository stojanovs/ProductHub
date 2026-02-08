import { Container, TextField, Button, Box, CircularProgress, Typography, Alert } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  ProductAdd,
  ProductList,
} from "../redux/actions/ProductAction";
import { formatPrice } from "../utils/formatPrice";
import { useState } from "react";
import swal from "sweetalert";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import ProductFilter, { PaginationControl } from "../component/ProductFilter";
import HealthMonitor from "../component/HealthMonitor";
import UserRole from "../component/UserRole";

const Productform = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [filters, setFilters] = useState({});

  const columns = [
    { title: "Name", field: "name" },
    { title: "Quantity", field: "quantity" },
    { title: "Price", field: "price" },
    { title: "Created At", field: "createdAt" },
    { title: "Updated At", field: "updatedAt" },
    { title: "Actions", field: "actions" },
  ];

  const product = useSelector((state) => state.ProductReducer);
  const { message, products = [], loading, pagination = {} } = product || {};
  
  const userInfo = useSelector((state) => state.userLogin?.userInfo);
  const isAdmin = userInfo?.role === "admin";

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(id));
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    
    if (!name || !quantity || !price) {
      swal({
        icon: "error",
        text: "Please fill all fields",
      });
      return;
    }

    const qty = parseInt(quantity, 10);
    const pr = parseFloat(price);

    await dispatch(
      ProductAdd({
        name,
        quantity: isNaN(qty) ? 0 : qty,
        price: isNaN(pr) ? 0 : pr,
      })
    );

    swal({
      icon: "success",
      text: "Product added successfully!",
    }).then(() => {
      setName("");
      setQuantity("");
      setPrice("");
      dispatch(ProductList(filters));
    });
  };

  const handleFilter = (newFilters) => {
    setFilters(newFilters);
    dispatch(ProductList(newFilters));
  };

  const handlePageChange = (event, page) => {
    const newFilters = { ...filters, page };
    setFilters(newFilters);
    dispatch(ProductList(newFilters));
  };

  useEffect(() => {
    dispatch(ProductList(filters));
  }, [dispatch]);

  return (
    <Container style={{ paddingTop: "20px", paddingBottom: "40px" }}>
      <HealthMonitor />

      <Box style={{ marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h5">Products Management</Typography>
        <UserRole />
      </Box>

      {message && (
        <Alert severity="success" style={{ marginBottom: "15px" }}>
          {message}
        </Alert>
      )}

      <Box style={{ marginBottom: "30px", padding: "20px", backgroundColor: "#f5f5f5", borderRadius: "8px" }}>
        <Typography variant="h6" style={{ marginBottom: "15px" }}>
          Add New Product
        </Typography>
        <form onSubmit={submitHandler}>
          <Box display="grid" gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr 1fr" }} gap={2} marginBottom={2}>
            <TextField
              type="text"
              label="Product Name"
              placeholder="Enter product name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              required
            />
            <TextField
              type="number"
              label="Quantity"
              placeholder="Enter quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              fullWidth
              required
            />
            <TextField
              type="number"
              label="Price"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              fullWidth
              required
              inputProps={{ step: "0.01" }}
            />
          </Box>
          <Button type="submit" variant="contained" color="primary">
            Add Product
          </Button>
        </form>
      </Box>

      <ProductFilter onFilter={handleFilter} />

      {loading ? (
        <Box display="flex" justifyContent="center" padding={3}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Box style={{ overflowX: "auto", marginBottom: "20px" }}>
            <table className="table table-hover">
              <thead>
                <tr>
                  {columns?.map(({ title }) => (
                    <th key={title} style={{ fontWeight: "bold" }}>
                      {title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {products && products.length > 0 ? (
                  products.map((prod) => {
                    try {
                      return (
                        <tr key={prod._id}>
                          <td>{prod.name}</td>
                          <td>{prod.quantity}</td>
                          <td>${formatPrice(prod.price)}</td>
                          <td>{moment(prod.createdAt).format("MM-DD-YYYY")}</td>
                          <td>{moment(prod.updatedAt).format("MM-DD-YYYY")}</td>
                          <td>
                            {isAdmin ? (
                              <>
                                <Link to={`/productedit/${prod._id}/edit`}>
                                  <button className="btn btn-sm btn-warning me-2">
                                    Edit
                                  </button>
                                </Link>
                                <button
                                  className="btn btn-sm btn-danger"
                                  onClick={() => deleteHandler(prod._id)}
                                >
                                  Delete
                                </button>
                              </>
                            ) : (
                              <Typography variant="caption" color="textSecondary">
                                Read-only
                              </Typography>
                            )}
                          </td>
                        </tr>
                      );
                    } catch (err) {
                      console.error("product row render error", prod, err);
                      return null;
                    }
                  })
                ) : (
                  <tr>
                    <td colSpan={columns.length} style={{ textAlign: "center", padding: "20px" }}>
                      <Typography color="textSecondary">No products found</Typography>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </Box>

          {/* Pagination Controls */}
          <PaginationControl pagination={pagination} onPageChange={handlePageChange} />
        </>
      )}
    </Container>
  );
};

export default Productform;
