import {createSlice} from '@reduxjs/toolkit'
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
const initialState = {
    cartItems:localStorage.getItem('cartItems')?JSON.parse(localStorage.getItem('cartItems')):[],
    totalQuantity:0,
    totalPrice:0
}

const cartSlice = createSlice({
    name:'cartSlice',
    initialState,
    reducers:{
        addToCart:(state,action)=>{
            const index = state.cartItems.findIndex((item)=>item._id === action.payload._id)
            if( index === -1){
                state.cartItems.push({...action.payload,cartQuantity:1})
                toast.success(`${action.payload.name} is added `);
            }else{
                state.cartItems[index].cartQuantity +=1 
                toast.info(`${action.payload.name} quantity is increased by 1`);
            }


            localStorage.setItem("cartItems",JSON.stringify(state.cartItems))
            // const dispatch = useDispatch()
            // dispatch(calculateTotal())
        },
        removeSingleItemFromCart:(state,action)=>{
            
            const index = state.cartItems.findIndex((item)=>item._id === action.payload._id)
            if(index != -1){
                state.cartItems.splice(index,1)
                localStorage.setItem("cartItems",JSON.stringify(state.cartItems))
            }
        },
        increaseItemQuantity:(state,action)=>{
          const index =   state.cartItems.findIndex((item)=>item._id === action.payload._id)
          if(index != -1){
            state.cartItems[index].cartQuantity +=1
            localStorage.setItem("cartItems",JSON.stringify(state.cartItems))
          }
        
        },
        decreaseItemQuantity:(state,action)=>{
            const index =   state.cartItems.findIndex((item)=>item._id === action.payload._id)
            if(index != -1){
                if(state.cartItems[index].cartQuantity == 1){
                    state.cartItems.splice(index,1)
                    localStorage.setItem("cartItems",JSON.stringify(state.cartItems))
                }else{
                    state.cartItems[index].cartQuantity -=1
                    localStorage.setItem("cartItems",JSON.stringify(state.cartItems))
                }

            }
        },

        calculateTotal:(state,action)=>{
            let totalPrice = state.cartItems.reduce((a,b)=>a+ (Number(b.cartQuantity) * Number(b.price)),0)
            let totalCartItemQuantity = state.cartItems.reduce((a,b)=>a + Number(b.cartQuantity),0)

            state.totalQuantity = totalCartItemQuantity
            state.totalPrice = totalPrice
        }

    }
})

export const {addToCart,removeSingleItemFromCart, decreaseItemQuantity, increaseItemQuantity, calculateTotal} = cartSlice.actions

export default cartSlice.reducer