import {configureStore} from '@reduxjs/toolkit'
import { productApi } from './features/productApi';
import {slideImageApi} from './features/slideImageApi'
import {userApi} from './features/userApi'
import {manageMenuApi} from './features/manageMenuApi'
import cartSlice from './features/cartSlice'
import authSlice from './features/authSlice';
import {authUserApi} from './features/authApi'

const store = configureStore({
  reducer:{
    [productApi.reducerPath]:productApi.reducer,
    [slideImageApi.reducerPath]:slideImageApi.reducer,
    [userApi.reducerPath]:userApi.reducer,
    [manageMenuApi.reducerPath]:manageMenuApi.reducer,
    [authUserApi.reducerPath]:authUserApi.reducer,
    cartSlice,
    authSlice,
  },
  middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(
    productApi.middleware,
    slideImageApi.middleware,
    userApi.middleware,
    manageMenuApi.middleware,
    authUserApi.middleware)
})

export default store