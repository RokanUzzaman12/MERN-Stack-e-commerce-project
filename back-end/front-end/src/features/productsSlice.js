import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk('products/fetchProducts',
    async (id = 1, {rejectWithValue})=>{
        try{
            const response = await axios.get('http://localhost:5000/products')
            return response?.data.data
        }catch(err){
            return rejectWithValue(err.response.data)
        }

    }
)
const initialState = {
    items:[],
    status:null,
    error:null
}
const productSlice = createSlice({
    name:'products',
    initialState,
    reducers:{},
    extraReducers:{
        [fetchProducts.pending]:(state,action)=>{
            state.status = 'pending'
        },
        [fetchProducts.fulfilled]:(state,action)=>{
            state.status = 'fulfilled'
            state.items = action.payload
        },
        [fetchProducts.rejected]:(state,action)=>{
            state.status = "rejected"
            state.error = action.payload
        }
    }
})

export default productSlice.reducer