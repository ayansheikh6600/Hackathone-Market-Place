import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

// Initial State
const initialState = {
  address: {
    name: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    cityLocality: "Washington",
    stateProvince: "DC",
    postalCode: "20500",
    countryCode: "US",
    addressResidentialIndicator: "no",
  },
  shippingDetails: null,
  selectedShippingOption: null,
  loading: false,
  error: null,
};




// Thunk for Fetching Shipping Options
export const fetchShippingOptions = createAsyncThunk(
  "shipping/fetchShippingOptions",
  async (_, { getState, rejectWithValue }) => {

    const state = getState() as RootState
    const { address } = state.shipping;
    const { items } = state.cart;

    const packages = items.map((item: any) => ({
      weight: { value: item.weight || 16, unit: "ounce" },
      dimensions: {
        length: item.length || 10,
        width: item.width || 8,
        height: item.height || 4,
        unit: "inch",
      },
    }));

    try {
      const response = await axios.post("/api/shipping/calculate", {
        shipeToAddress: address,
        packages,
      });

      return response.data.shipmentDetails.rateResponse.rates;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch shipping rates");
    }
  }
);

// Shipping Slice
const shippingSlice = createSlice({
  name: "shipping",
  initialState,
  reducers: {
    setAddress: (state, action) => {
      // console.log(action.payload)
      state.address = { ...state.address, ...action.payload };
    },
    setSelectedShippingOption: (state, action) => {
      console.log(action.payload)
      state.selectedShippingOption = action.payload;
    },
    setSlect: (state, action) => {
      console.log(action.payload)
      state.selectedShippingOption = action.payload;
    },
    clearShippingState: (state) => {
      // Reset the state to its initial values
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchShippingOptions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchShippingOptions.fulfilled, (state, action) => {
        state.loading = false;
        state.shippingDetails = action.payload;
      })
      .addCase(fetchShippingOptions.rejected, (state:any, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export Actions
export const { setAddress, setSelectedShippingOption, setSlect } = shippingSlice.actions;

// Export Reducer
export default shippingSlice.reducer;
