import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import baseUrlWithHeaders from "../baseUrlWithHeaders"
export const slideImageApi = createApi({
    reducerPath:'slideImageApi',
    baseQuery:fetchBaseQuery({baseUrl:'http://localhost:5000',}),
    tagTypes:'SlideImage',
    endpoints:(builder)=>({

        fetchAllImage:builder.query({
            query:()=>({
                url:'/slide-image',
                method:'GET'
            }),
            providesTags:['SlideImage']
        }),

        addNewSlideImage : builder.mutation({
            query:(imageData) => ({
                url:'/slide-image',
                method:'POST',
                body:imageData
            }),
            invalidatesTags:['SlideImage']
        }),

        upArrow : builder.mutation({
            query:(imageData) => ({
                url:`/slide-image/up-arrow/${imageData._id}`,
                method:'PUT',
                body:imageData
            }),
            invalidatesTags:['SlideImage']
        }),

        downArrow : builder.mutation({
            query:(imageData) => ({
                url:`/slide-image/down-arrow/${imageData._id}`,
                method:'PUT',
                body:imageData
            }),
            invalidatesTags:['SlideImage']
        }),

        deleteImage:builder.mutation({
            query:(imageId)=>({
                url:`/slide-image/${imageId}`,
                method:'DELETE'

            }),
            invalidatesTags:['SlideImage']
        })

    })

})

export const {useAddNewSlideImageMutation,useUpArrowMutation, useDownArrowMutation,useDeleteImageMutation, useFetchAllImageQuery} = slideImageApi