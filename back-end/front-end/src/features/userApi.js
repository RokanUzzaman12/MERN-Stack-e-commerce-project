import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import baseUrlWithHeaders from "../baseUrlWithHeaders"
export const userApi = createApi({
    reducerPath:'userApi',
    baseQuery:fetchBaseQuery(baseUrlWithHeaders),
    endpoints:(builder)=>({
        addUser: builder.mutation({
            query:(user)=>({
                url:'/user',
                method:'POST',
                body:user
            })
        }),
        logInUser:builder.mutation({
            query:(user)=>({
                url:'/user/login',
                method:'POST',
                body:user
            })

        })
    })
})

export const {useAddUserMutation,useLogInUserMutation} = userApi