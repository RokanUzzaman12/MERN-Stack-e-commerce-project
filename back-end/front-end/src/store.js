import {configureStore} from '@reduxjs/toolkit'
import { productApi } from './features/productApi';
import {userApi} from './features/userApi'
import cartSlice from './features/cartSlice'
import authSlice from './features/authSlice';
import {authUserApi} from './features/authApi'

const store = configureStore({
  reducer:{
    [productApi.reducerPath]:productApi.reducer,
    [userApi.reducerPath]:userApi.reducer,
    [authUserApi.reducerPath]:authUserApi.reducer,
    cartSlice,
    authSlice
  },
  middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(
    productApi.middleware,
    userApi.middleware,
    authUserApi.middleware)
})

export default store