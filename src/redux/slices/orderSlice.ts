import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Define interfaces for Order, Product, and Customer
interface Product {
  product: string; // Product ID
  size: string;
  quantity: number;
  price: number;
}

interface Customer {
  name: string;
  email: string;
  phone: string;
  address: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
}

interface OrderState {
  loading: boolean;
  error: string | null;
  order: any; // Store the response from Sanity for placed order
  products: Product[]; // List of products to order
  customer: Customer | null; // Customer details
}

// Initial state
const initialState: OrderState = {
  loading: false,
  error: null,
  order: null,
  products: [],
  customer: null,
};

// Async thunk for placing an order
export const placeOrder = createAsyncThunk(
  'order/placeOrder',
  async (
    { products, customer }: { products: Product[]; customer: Customer },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post('/api/orders', { products, customer });
      return response.data.order;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to place order');
    }
  }
);

// Redux slice
const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addProductToOrder(state, action: PayloadAction<Product>) {
      state.products.push(action.payload);
    },
    removeProductFromOrder(state, action: PayloadAction<string>) {
      state.products = state.products.filter((product) => product.product !== action.payload);
    },
    clearOrder(state) {
      state.products = [];
      state.customer = null;
      state.order = null;
      state.error = null;
    },
    setCustomerDetails(state, action: PayloadAction<Customer>) {
      state.customer = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(placeOrder.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(placeOrder.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload || 'Failed to place order';
      });
  },
});

// Export actions and reducer
export const { addProductToOrder, removeProductFromOrder, clearOrder, setCustomerDetails } =
  orderSlice.actions;
export default orderSlice.reducer;
