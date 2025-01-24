import { combineReducers, configureStore } from '@reduxjs/toolkit';
import productsReducer from '@/redux/slices/productSlice';
import cardReducer from '@/redux/slices/cartSlice';
import categoriesReducer from '@/redux/slices/categoriesSlice';
import whiteListReducer from '@/redux/slices/whiteListSlice';
import authReducer from '@/redux/slices/authSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import shippingReducer from '@/redux/slices/shippingSlice';

const persistConfig = {
  key: 'root', // Root key
  storage,     // Default storage is localStorage
  whitelist: ['cart', 'whiteList', "auth"], // persist the slices
};

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cardReducer,
  auth: authReducer,
  whiteList: whiteListReducer,
  categories: categoriesReducer,
  shipping : shippingReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
