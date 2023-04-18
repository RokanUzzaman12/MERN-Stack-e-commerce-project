import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    userInfo:{},
    token:localStorage.getItem('token')?JSON.parse(localStorage.getItem('token')):null
}
const authSlice = createSlice({
    name:'authSlice',
    initialState,
    reducers:{
        setUserInfo:(state,payload)=>{
            state.userInfo = payload.payload.data
            state.token = payload.payload.token
        }
    }
})

export const {setUserInfo} = authSlice.actions

export default authSlice.reducer