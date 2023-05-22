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

        updateRole : builder.mutation({
            query:(data)=>({
                url:`/role/${data._id}`,
                method:'PUT',
                body:data
            }),
            invalidatesTags:['Role']
        }), 

        deleteRole : builder.mutation({
            query:(id)=>({
                url:`/role/${id}`,
                method:'DELETE',
            }),
            invalidatesTags:['Role']
        })   

    })

})

export const {useAddNewRoleMutation, useGetAllRoleQuery,useDeleteRoleMutation, useUpdateRoleMutation} = roleApi