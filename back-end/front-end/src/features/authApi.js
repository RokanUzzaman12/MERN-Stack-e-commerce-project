import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import baseUrlWithHeaders from "../baseUrlWithHeaders"

export const authUserApi = createApi({
    reducerPath:'authUserApi',
    baseQuery:fetchBaseQuery(baseUrlWithHeaders),
    endpoints:(builder)=>({
        verifyUser: builder.mutation({
            query:(user)=>({
                url:'/verify',
                method:'POST',
                body:user
            })
        }),

    })
})

export const {useVerifyUserMutation} = authUserApi