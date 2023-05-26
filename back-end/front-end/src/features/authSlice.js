import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    userInfo:{},
    adminInfo:{},
    adminToken:localStorage.getItem('admin-token')?JSON.parse(localStorage.getItem('admin-token')):null,
    token:localStorage.getItem('token')?JSON.parse(localStorage.getItem('token')):null
}
const authSlice = createSlice({
    name:'authSlice',
    initialState,
    reducers:{
        setUserInfo:(state,payload)=>{
            state.userInfo = payload.payload.data
            state.token = payload.payload.token
        },
        setAdminInfo:(state,payload)=>{
            state.adminInfo = payload.payload.data
            state.token = payload.payload.adminToken
        }
    }
})

export const {setUserInfo,setAdminInfo} = authSlice.actions

export default authSlice.reducer