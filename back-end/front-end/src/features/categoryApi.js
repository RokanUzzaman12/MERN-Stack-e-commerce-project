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

        updateCategory : builder.mutation({
            query : (categoryData)=>({
                url:`/category/${categoryData._id}`,
                method:'PUT',
                body:categoryData
            }),
            invalidatesTags:['Category']
        }),

        deleteCategory : builder.mutation({
            query:(categoryId)=>({
                url:`/category/${categoryId}`,
                method:'DELETE',

            }),
            invalidatesTags:['Category']
        })

        

    })

})

export const {useAddNewCategoryMutation,useGetAllCategoryQuery,useUpdateCategoryMutation,useDeleteCategoryMutation} = categoryApi