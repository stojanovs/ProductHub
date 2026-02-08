/***
 * CRUD product
 */

import React, { useState, useEffect } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  listProductDetails,
  updateProduct,
} from "../redux/actions/ProductAction";
import swal from "sweetalert";

function ProductEditScreen({ match, history }) {
  // to get the selectedproduct ID
  const productId = match.params.productId;

  // constant initialization for name,price,quantity
  const [name, setName] = useState("");
  const [price, setPrice] = useState();
  const [quantity, setQuantity] = useState();

  // dispatch used for action calling
  const dispatch = useDispatch();

  const productInfo = useSelector((state) => state.ProductReducer);
  const { product } = productInfo;

  useEffect(() => {
    dispatch(listProductDetails(productId));
  }, [dispatch, productId])

  useEffect(() => {
    if (product) {
      setName(product?.name);
      setQuantity(product?.quantity);
      setPrice(product?.price);
    }
  }, [product]);

  // submit button handler
  const submitHandler = (e) => {
    e.preventDefault();
    const success = dispatch(
      updateProduct(productId, {
        name,
        price,
        quantity,
      })
    );
    if (success) {
      swal("updated");
      history.push("/productform");
    }
  };

  return (
    <Container>
      <div>
        <h1>Edit Product</h1>

        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter name"
              value={name ?? ""}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="quantity">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary">
            Update
          </Button>
        </Form>
      </div>
    </Container>
  );
}

export default ProductEditScreen;
