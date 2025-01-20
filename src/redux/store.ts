import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '@/redux/slices/productSlice';
import cardReducer from '@/redux/slices/cartSlice';
import categoriesReducer from '@/redux/slices/categoriesSlice';

const store = configureStore({
  reducer: {
    products: productsReducer,
    cart : cardReducer,
    categories :categoriesReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
