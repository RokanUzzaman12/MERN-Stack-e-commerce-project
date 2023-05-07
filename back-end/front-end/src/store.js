import {configureStore} from '@reduxjs/toolkit'
import { productApi } from './features/productApi';
import {slideImageApi} from './features/slideImageApi'
import {userApi} from './features/userApi'
import cartSlice from './features/cartSlice'
// import sliderImageSlice from './features/sliderImageSlice';
import authSlice from './features/authSlice';
import {authUserApi} from './features/authApi'

const store = configureStore({
  reducer:{
    [productApi.reducerPath]:productApi.reducer,
    [slideImageApi.reducerPath]:slideImageApi.reducer,
    [userApi.reducerPath]:userApi.reducer,
    [authUserApi.reducerPath]:authUserApi.reducer,
    cartSlice,
    authSlice,
    // sliderImageSlice
  },
  middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(
    productApi.middleware,
    slideImageApi.middleware,
    userApi.middleware,
    authUserApi.middleware)
})

export default store