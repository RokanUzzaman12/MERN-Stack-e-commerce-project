import {createSlice} from '@reduxjs/toolkit'
import { useSelector } from "react-redux"
import _ from 'lodash'

 
const initialState = {
    show:false,
    navData:[],
    previousNavId : null
    
}

const sideBarSlice = createSlice({
    name:'sideBarSlice',
    initialState,
    reducers:{
        showHandle:(state,payload)=>{
                // if(state.show == false){
                //     state.show = true
                // }
            if(!state.previousNavId){
                state.show = !state.show
            }else{
                if(state.previousNavId && state.previousNavId === payload.payload.navId){
                    state.show = !state.show
                }
            }
            
            let tempData = _.cloneDeep(payload.payload.navData) 
            
            let subNavIndex = tempData.findIndex((temp)=>temp._id == payload.payload.navId)
    

    
            tempData.map((item)=>{
                
                if(item._id == payload.payload.navId){
                    item.subNav = tempData[subNavIndex].subNav
                    if(state.show){
                        item.rightIcon = "fa-solid fa-chevron-down nav-icon" 
                    }else{
                        item.rightIcon = "fa-solid fa-chevron-right nav-icon" 
                    }
                    
                }else{
                    item.subNav = []
                    item.rightIcon = "fa-solid fa-chevron-right nav-icon" 
                }
            })


    
            // if( state.previousNavId && state.previousNavId == payload.payload.navId){
                
            //     state.show = !state.show
            //     if(state.show == false){
            //         tempData[subNavIndex].rightIcon = "fa-solid fa-chevron-down nav-icon" 
            //     }else{
            //         tempData[subNavIndex].rightIcon = "fa-solid fa-chevron-right nav-icon" 
            //     }
                
            // }
            
            state.navData = tempData
            state.previousNavId = payload.payload.navId
        },
        addData:(state,payload)=>{
            state.navData = payload.payload
        },

        handelSubNav:(state,payload)=>{
            state.show = true
        }
    }
})

export const {showHandle,addData,handelSubNav} = sideBarSlice.actions

export default sideBarSlice.reducer