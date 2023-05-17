import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import baseUrlWithHeaders from "../baseUrlWithHeaders"
export const roleApi = createApi({
    reducerPath:'roleApi',
    baseQuery:fetchBaseQuery({baseUrl:'http://localhost:5000',}),
    tagTypes:'Role',
    endpoints:(builder)=>({

        getAllRole : builder.query({
            query:()=>'role',
            providesTags:['Role']
            
        }),

        addNewRole : builder.mutation({
            query:(roleData)=>({
                url:'/role',
                method:'POST',
                body:roleData
            }),
            invalidatesTags:['Role']
        }),


        

    })

})

export const {useAddNewRoleMutation, useGetAllRoleQuery} = roleApi