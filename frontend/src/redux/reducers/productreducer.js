import {
  PRODUCT_FAIL,
  PRODUCT_REQUEST,
  PRODUCT_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_RESET,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
} from "../../component/Constants/ProductConstants";

/**USER REDUCERS */

// Normalize price to number, handling Decimal128 and other shapes
const normalizePrice = (raw) => {
  if (raw == null) return raw;
  if (typeof raw === "number") return raw;
  if (typeof raw === "string") return Number(raw) || raw;
  if (typeof raw === "object" && raw.$numberDecimal) return Number(raw.$numberDecimal);
  return raw;
};

// Normalize all products in an array
const normalizeProducts = (products) => {
  if (!Array.isArray(products)) return products;
  return products.map(p => ({
    ...p,
    price: normalizePrice(p.price)
  }));
};

// product Reducer
export const ProductReducer = (state = {}, action) => {
  switch (action.type) {
    // Request
    case PRODUCT_REQUEST:
      return { ...state, loading: true };
    // Product success
    case PRODUCT_SUCCESS:
      // Extract message from response - ensure it's always a string
      let successMessage = '';
      if (typeof action.payload === 'string') {
        successMessage = action.payload;
      } else if (action.payload && typeof action.payload === 'object') {
        successMessage = action.payload.message || action.payload.detail || '';
      }
      return {
        ...state,
        loading: false,
        message: successMessage,
        error: null,
      };
    // product fail
    case PRODUCT_FAIL:
      return { ...state, loading: false, error: action.payload };

    // Product list request
    case PRODUCT_LIST_REQUEST:
      return { ...state, loading: true };
    // Product list success
    case PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        products: normalizeProducts(action.payload.products),
        pagination: action.payload.pagination,
        message: '', // Clear message when refreshing list
        error: null,
      };
    // Product list fail
    case PRODUCT_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };

    // Product delete request
    case PRODUCT_DELETE_REQUEST:
      return { loading: true };
    // Product delete success
    case PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true };
    // Product delete fail
    case PRODUCT_DELETE_FAIL:
      return { loading: false, error: action.payload };

    // Product update request
    case PRODUCT_UPDATE_REQUEST:
      return { loading: true };
    // Product update success
    case PRODUCT_UPDATE_SUCCESS:
      const updatedProd = action.payload.product || action.payload;
      return { loading: false, success: true, product: updatedProd && updatedProd.price !== undefined ? { ...updatedProd, price: normalizePrice(updatedProd.price) } : updatedProd };
    // Product update fail
    case PRODUCT_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    // Product update reset
    case PRODUCT_UPDATE_RESET:
      return { product: {} };

    // Product detail request
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true, ...state };
    // Product detail success
    case PRODUCT_DETAILS_SUCCESS:
      const detailProd = action.payload.product || action.payload;
      return { loading: false, product: detailProd && detailProd.price !== undefined ? { ...detailProd, price: normalizePrice(detailProd.price) } : detailProd };
    // Product detail fail
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
