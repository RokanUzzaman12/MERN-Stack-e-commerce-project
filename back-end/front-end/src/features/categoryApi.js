import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import baseUrlForAdmin from "../baseUrlForAdmin"
export const categoryApi = createApi({
    reducerPath:'categoryApi',
    baseQuery:fetchBaseQuery(baseUrlForAdmin),
    tagTypes:'Category',
    endpoints:(builder)=>({

        getAllCategory : builder.query({
            query:()=>'category',
            providesTags:['Category']
            
        }),

        addNewCategory : builder.mutation({
            query:(categoryData)=>({
                url:'/category',
                method:'POST',
                body:categoryData
            }),
            invalidatesTags:['Category']
        }),

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

export const {useAddNewCategoryMutation,useGetAllCategoryQuery} = categoryApi