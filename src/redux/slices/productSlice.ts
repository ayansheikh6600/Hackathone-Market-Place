import Product from '@/types/product';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the structure of the state
interface ProductsState {
  products: Product[];
  filteredProducts: Product[]; // For search results
  product: Product | null; // For single product
  loading: boolean;
  error: string | null;
}

// Initial state for the slice
const initialState: ProductsState = {
  products: [],
  filteredProducts: [], // Initialize empty for search results
  product: null,
  loading: false,
  error: null,
};

// Async thunk to fetch all products
export const fetchProducts = createAsyncThunk<Product[], void, { rejectValue: string }>(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/products'); // Adjust the endpoint if necessary
      return response.data.data as Product[];
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch products');
    }
  }
);

// Async thunk to fetch a single product by ID
export const fetchProductById = createAsyncThunk<Product, string, { rejectValue: string }>(
  'products/fetchProductById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/products/${id}`); // Adjust the endpoint if necessary
      return response.data.data as Product;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch product');
    }
  }
);

// Slice definition
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // Reducer to handle search
    searchProducts: (state, action: PayloadAction<string>) => {
      const query = action.payload.toLowerCase();
      state.filteredProducts = state.products.filter(product =>
        product.name.toLowerCase().includes(query) || // Search by name
        product.description?.toLowerCase().includes(query) // Search by description if available
      );
    },
    filterByCategory: (state, action: PayloadAction<string>) => {
      const category = action.payload;
      if (category === 'All') {
        state.filteredProducts = state.products; // Reset to all products
      } else {
        state.filteredProducts = state.products.filter(product => product.category === category);
      }
    },
    clearSearch: (state) => {
      state.filteredProducts = state.products; // Reset filtered products to all products
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.loading = false;
        state.products = action.payload;
        state.filteredProducts = action.payload; // Initialize filteredProducts
      })
      .addCase(fetchProducts.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch products';
      })
      // Fetch single product
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.product = null; // Clear previous product state
      })
      .addCase(fetchProductById.fulfilled, (state, action: PayloadAction<Product>) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch product';
      });
  },
});

// Export actions and reducer
export const { searchProducts, clearSearch, filterByCategory } = productsSlice.actions;
export default productsSlice.reducer;
