import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
// import baseUrlWithHeaders from "../baseUrlWithHeaders"
import baseUrlForAdmin from "../baseUrlForAdmin"
export const adminApi = createApi({
    reducerPath:'adminApi',
    baseQuery:fetchBaseQuery(baseUrlForAdmin),
    tagTypes:'Admin',
    endpoints:(builder)=>({

        getAllAdmin : builder.query({
            query:()=>'admin',
            providesTags:['Admin']
            
        }),

        addNewAdmin : builder.mutation({
            query:(adminData)=>({
                url:'/admin',
                method:'POST',
                body:adminData
            }),
            invalidatesTags:['Admin']
        }),

        adminLogIn : builder.mutation({
            query:(adminData)=>({
                url:'/admin/log-in',
                method:'POST',
                body:adminData
            })
        })

        // updatePermission : builder.mutation({
        //     query : (permissionData)=>({
        //         url:`/permission/${permissionData._id}`,
        //         method:'PUT',
        //         body:permissionData
        //     }),
        //     invalidatesTags:['Permission']
        // }),

        // deletePermission : builder.mutation({
        //     query:(permissionId)=>({
        //         url:`/permission/${permissionId}`,
        //         method:'DELETE',

        //     }),
        //     invalidatesTags:['Permission']
        // })

        

    })

})

export const {useAddNewAdminMutation,useGetAllAdminQuery, useAdminLogInMutation} = adminApi