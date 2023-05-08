import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import baseUrlWithHeaders from "../baseUrlWithHeaders"
export const menuApi = createApi({
    reducerPath:'menuApi',
    baseQuery:fetchBaseQuery({baseUrl:'http://localhost:5000',}),
    tagTypes:'menuTag',
    endpoints:(builder)=>({
        // getAllProducts : builder.query({
        //     query:()=>'menu',
        //     providesTags:['Product']
            
        // }),

        // getSingleProduct:builder.query({
        //     query:(id)=>({
        //         url:`/products/${id}`,
        //         method:'GET'
        //     }),
        //     providesTags:['Product']
        // }),

        // getSingleProductBySlug:builder.query({
        //     query:(slug)=>({
        //         url:`/products/details/${slug}`,
        //         method:'GET'
        //     }),
        //     providesTags:['Product']
        // }),

        addNewMenu : builder.mutation({
            query:(menuData) => ({
                url:'/menu',
                method:'POST',
                body:menuData
            }),
            invalidatesTags:['menuTag']
        }),

        // updateProduct: builder.mutation({
        //     query:(product)=>({
        //         url:`/products/${product._id}`,
        //         method:'PUT',
        //         body:product.data
        //     }),
        //     invalidatesTags:['Product']
        // }),

        // deleteProduct:builder.mutation({
        //     query:(id)=>({
        //         url:`products/${id}`,
        //         method:'DELETE'
        //     }),
        //     invalidatesTags:['Product']
        // })

    })

})

export const {useAddNewMenuMutation} = menuApi