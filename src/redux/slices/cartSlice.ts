import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

// Define the structure of a cart item
interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  totalPrice: number;
  imageUrl:string
}

// Define the structure of the cart state
interface CartState {
  items: CartItem[];
  totalQuantity: number;
  totalAmount: number;
}

// Initial state for the cart slice
const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
};

// Cart slice
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<{ id: string; title: string; price: number, imageUrl:string }>) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (!existingItem) {
        // Add new item to cart
        state.items.push({
          id: newItem.id,
          title: newItem.title,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          imageUrl : newItem.imageUrl
        });
        toast("Add Item Successfully")
        
      } else {
        // Update quantity and total price of the existing item
        existingItem.quantity++;
        existingItem.totalPrice += newItem.price;
        toast("Item Already and Increase QTY")
      }

     
      // Update total quantity and amount
      state.totalQuantity++;
      state.totalAmount += newItem.price;
    },
    removeFromCart(state, action: PayloadAction<string>) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        // Update total quantity and amount
        state.totalQuantity -= existingItem.quantity;
        state.totalAmount -= existingItem.totalPrice;

        // Remove the item from the cart
        state.items = state.items.filter((item) => item.id !== id);
      }
    },
    clearCart(state) {
      // Reset the cart to its initial state
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    },
  },
});

// Export actions
export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

// Export reducer
export default cartSlice.reducer;
