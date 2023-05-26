import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import baseUrlForAdmin from "../baseUrlForAdmin"

export const authAdminApi = createApi({
    reducerPath:'authAdminApi',
    baseQuery:fetchBaseQuery(baseUrlForAdmin),
    endpoints:(builder)=>({
        verifyAdmin:builder.mutation({
            query:(admin)=>({
                url:'/verify/admin',
                method:'POST',
                body:admin
            })
        })

    })
})

export const {useVerifyAdminMutation} = authAdminApi