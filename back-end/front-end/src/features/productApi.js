import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import baseUrlWithHeaders from "../baseUrlWithHeaders"
export const productApi = createApi({
    reducerPath:'productApi',
    baseQuery:fetchBaseQuery({baseUrl:'http://localhost:5000',}),
    tagTypes:'Product',
    endpoints:(builder)=>({
        getAllProducts : builder.query({
            query:()=>'products',
            providesTags:['Product']
            
        }),

        getSingleProduct:builder.query({
            query:(id)=>({
                url:`/products/${id}`,
                method:'GET'
            }),
            providesTags:['Product']
        }),

        addNewProducts : builder.mutation({
            query:(product) => ({
                url:'/products',
                method:'POST',
                body:product
            }),
            invalidatesTags:['Product']
        }),

        updateProduct: builder.mutation({
            query:(product)=>({
                url:`/products/${product._id}`,
                method:'PUT',
                body:product.data
            }),
            invalidatesTags:['Product']
        }),

        deleteProduct:builder.mutation({
            query:(id)=>({
                url:`products/${id}`,
                method:'DELETE'
            }),
            invalidatesTags:['Product']
        })

    })

})

export const {useGetAllProductsQuery,useAddNewProductsMutation, useGetSingleProductQuery,useDeleteProductMutation, useUpdateProductMutation} = productApi