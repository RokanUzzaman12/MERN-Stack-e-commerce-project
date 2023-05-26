import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import baseUrlWithHeaders from "../baseUrlWithHeaders"
import baseUrlForAdmin from "../baseUrlForAdmin"
export const productApi = createApi({
    reducerPath:'productApi',
    baseQuery:fetchBaseQuery(baseUrlForAdmin),
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

        getSingleProductBySlug:builder.query({
            query:(slug)=>({
                url:`/products/details/${slug}`,
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

export const {useGetAllProductsQuery,useAddNewProductsMutation, useGetSingleProductQuery,useGetSingleProductBySlugQuery,useDeleteProductMutation, useUpdateProductMutation} = productApi