import {configureStore} from '@reduxjs/toolkit'
import { productApi } from './features/productApi';
import {slideImageApi} from './features/slideImageApi'
import {userApi} from './features/userApi'
import { menuApi } from './features/menuApi';
import cartSlice from './features/cartSlice'
import authSlice from './features/authSlice';
import {authUserApi} from './features/authApi'

const store = configureStore({
  reducer:{
    [productApi.reducerPath]:productApi.reducer,
    [slideImageApi.reducerPath]:slideImageApi.reducer,
    [userApi.reducerPath]:userApi.reducer,
    [authUserApi.reducerPath]:authUserApi.reducer,
    [menuApi.reducerPath]:authUserApi.reducer,
    cartSlice,
    authSlice,
  },
  middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(
    productApi.middleware,
    slideImageApi.middleware,
    userApi.middleware,
    menuApi.middleware,
    authUserApi.middleware)
})

export default store