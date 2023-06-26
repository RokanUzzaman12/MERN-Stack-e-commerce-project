import {configureStore} from '@reduxjs/toolkit'
import { productApi } from './features/productApi';
import {slideImageApi} from './features/slideImageApi'
import {userApi} from './features/userApi'
import {manageMenuApi} from './features/manageMenuApi'
import {permissionApi} from './features/permissionApi'
import {roleApi} from './features/roleApi'
import { adminApi } from './features/adminApi';
import { authAdminApi } from './features/authAdminApi';
import {categoryApi} from './features/categoryApi';
import cartSlice from './features/cartSlice'
import sideBarSlice from './features/sideBarSlice'
import authSlice from './features/authSlice';
import {authUserApi} from './features/authApi'

const store = configureStore({
  reducer:{
    [productApi.reducerPath]:productApi.reducer,
    [slideImageApi.reducerPath]:slideImageApi.reducer,
    [userApi.reducerPath]:userApi.reducer,
    [manageMenuApi.reducerPath]:manageMenuApi.reducer,
    [permissionApi.reducerPath]:permissionApi.reducer,
    [roleApi.reducerPath]:roleApi.reducer,
    [adminApi.reducerPath]:adminApi.reducer,
    [authAdminApi.reducerPath]:authAdminApi.reducer,
    [authUserApi.reducerPath]:authUserApi.reducer,
    [categoryApi.reducerPath]:categoryApi.reducer,
    cartSlice,
    authSlice,
    sideBarSlice,
  },
  middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(
    productApi.middleware,
    slideImageApi.middleware,
    userApi.middleware,
    manageMenuApi.middleware,
    permissionApi.middleware,
    roleApi.middleware,
    adminApi.middleware,
    authAdminApi.middleware,
    authUserApi.middleware,
    categoryApi.middleware)
})

export default store