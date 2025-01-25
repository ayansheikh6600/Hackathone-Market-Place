import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// Define types for shipping parameters and state
interface ShippingParams {
  address: string;
  items: Array<{ id: string; quantity: number }>;
}

interface ShippingState {
  shippingCost: number;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: ShippingState = {
  shippingCost: 0,
  loading: false,
  error: null,
};

// Define async thunk with proper typing
export const calculateShipping = createAsyncThunk<
  number, // Return type of fulfilled action
  ShippingParams, // Argument type
  { rejectValue: string } // Rejected value type
>(
  "shipping/calculate",
  async ({ address, items }, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/shipping/calculate", { address, items });
      return response.data.shippingCost;
    } catch (error: any) {
      return rejectWithValue("Failed to calculate shipping cost");
    }
  }
);

// Create slice
const shippingSlice = createSlice({
  name: "shipping",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(calculateShipping.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(calculateShipping.fulfilled, (state, action: PayloadAction<number>) => {
        state.loading = false;
        state.shippingCost = action.payload;
      })
      .addCase(calculateShipping.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload || "An unknown error occurred";
      });
  },
});

export default shippingSlice.reducer;
