import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import baseUrlWithHeaders from "../baseUrlWithHeaders"
export const manageMenuApi = createApi({
    reducerPath:'manageMenuApi',
    baseQuery:fetchBaseQuery({baseUrl:'http://localhost:5000',}),
    tagTypes:'menuTag',
    endpoints:(builder)=>({
        getAllMenus : builder.query({
            query:()=>'menu',
            providesTags:['menuTag']
            
        }),
        addNewMenu : builder.mutation({
            query:(menuData)=>({
                url:'/menu',
                method:'POST',
                body:menuData
            }),
            invalidatesTags:['menuTag']

        }),
        deleteMenu : builder.mutation({
            query:(id)=>({
                url:`/menu/${id}`,
                method:"DELETE",
                
            }),
            invalidatesTags:['menuTag']
        }) 

    })

})

export const {useGetAllMenusQuery,useAddNewMenuMutation,useDeleteMenuMutation} = manageMenuApi