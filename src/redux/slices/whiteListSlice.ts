import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

// Define the structure of a whitelist item
interface WhiteListItem {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
}

// Define the structure of the whitelist state
interface WhiteListState {
  items: WhiteListItem[];
}

// Initial state for the whitelist slice
const initialState: WhiteListState = {
  items: [],
};

// Whitelist slice
const whiteListSlice = createSlice({
  name: 'whiteList',
  initialState,
  reducers: {
    addToWhiteList(state, action: PayloadAction<{ id: string; title: string; price: number; imageUrl: string }>) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (!existingItem) {
        // Add new item to the whitelist
        state.items.push({
          id: newItem.id,
          title: newItem.title,
          price: newItem.price,
          imageUrl: newItem.imageUrl,
        });
        toast.success('Item added to your whitelist!');
      } else {
        toast.info('Item is already in your whitelist.');
      }
    },
    removeFromWhiteList(state, action: PayloadAction<string>) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        // Remove the item from the whitelist
        state.items = state.items.filter((item) => item.id !== id);
        toast.success('Item removed from your whitelist!');
      } else {
        toast.error('Item not found in the whitelist.');
      }
    },
    clearWhiteList(state) {
      // Reset the whitelist to its initial state
      state.items = [];
      toast.info('Your whitelist has been cleared.');
    },
  },
});

// Export actions
export const { addToWhiteList, removeFromWhiteList, clearWhiteList } = whiteListSlice.actions;

// Export reducer
export default whiteListSlice.reducer;
