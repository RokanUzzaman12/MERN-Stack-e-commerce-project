import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import baseUrlWithHeaders from "../baseUrlWithHeaders"
import baseUrlForAdmin from "../baseUrlForAdmin"
export const roleApi = createApi({
    reducerPath:'roleApi',
    baseQuery:fetchBaseQuery(baseUrlForAdmin),
    tagTypes:'Role',
    endpoints:(builder)=>({

        getAllRole : builder.query({
            query:()=>'role',
            providesTags:['Role']
            
        }),

        getAllRoleByUserRole : builder.query({
            query:()=>'/role/user-role',
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

export const {useAddNewRoleMutation, useGetAllRoleQuery,useDeleteRoleMutation, useUpdateRoleMutation, useGetAllRoleByUserRoleQuery} = roleApi