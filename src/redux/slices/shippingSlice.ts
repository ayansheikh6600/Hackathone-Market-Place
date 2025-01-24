import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const calculateShipping = createAsyncThunk(
  "shipping/calculate",
  async ({ address, items }: any, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/shipping/calculate", { address, items });
      return response.data.shippingCost;
    } catch (error: any) {
      return rejectWithValue("Failed to calculate shipping cost");
    }
  }
);

const shippingSlice = createSlice({
  name: "shipping",
  initialState: { shippingCost: 0, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(calculateShipping.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(calculateShipping.fulfilled, (state, action) => {
        state.loading = false;
        state.shippingCost = action.payload;
      })
      .addCase(calculateShipping.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default shippingSlice.reducer;
