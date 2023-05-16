import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import baseUrlWithHeaders from "../baseUrlWithHeaders"
export const permissionApi = createApi({
    reducerPath:'permissionApi',
    baseQuery:fetchBaseQuery({baseUrl:'http://localhost:5000',}),
    tagTypes:'Permission',
    endpoints:(builder)=>({

        getAllPermission : builder.query({
            query:()=>'permission',
            providesTags:['Permission']
            
        }),

        addNewPermission : builder.mutation({
            query:(permissionData)=>({
                url:'/permission',
                method:'POST',
                body:permissionData
            }),
            invalidatesTags:['Permission']
        }),

        updatePermission : builder.mutation({
            query : (permissionData)=>({
                url:`/permission/${permissionData._id}`,
                method:'PUT',
                body:permissionData
            }),
            invalidatesTags:['Permission']
        }),

        deletePermission : builder.mutation({
            query:(permissionId)=>({
                url:`/permission/${permissionId}`,
                method:'DELETE',

            }),
            invalidatesTags:['Permission']
        })

        

    })

})

export const {useGetAllPermissionQuery,useAddNewPermissionMutation, useDeletePermissionMutation, useUpdatePermissionMutation} = permissionApi