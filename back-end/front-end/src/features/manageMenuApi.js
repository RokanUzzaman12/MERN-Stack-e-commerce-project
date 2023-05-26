import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import baseUrlWithHeaders from "../baseUrlWithHeaders"
import baseUrlForAdmin from "../baseUrlForAdmin"
export const manageMenuApi = createApi({
    reducerPath:'manageMenuApi',
    baseQuery:fetchBaseQuery(baseUrlForAdmin),
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
        updateMenu : builder.mutation({
            query:(updatedData)=>({
                url:`/menu/${updatedData._id}`,
                method:'PUT',
                body:updatedData
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

export const {useGetAllMenusQuery,useAddNewMenuMutation,useDeleteMenuMutation, useUpdateMenuMutation} = manageMenuApi