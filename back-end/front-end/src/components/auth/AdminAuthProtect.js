import { Outlet,Navigate, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import routesName from '../../routes'
// import {useVerifyUserMutation} from '../../features/authApi'
import {useVerifyAdminMutation} from '../../features/authAdminApi'
// import {setUserInfo} from '../../features/authSlice'
import {setAdminInfo} from '../../features/authSlice'

const useAuth = ()=>{
    let user = {loogedIn:false}
    user.loogedIn = localStorage.getItem('admin-token')?JSON.parse(localStorage.getItem('admin-token')):false
    return user && user.loogedIn
}



const AdminAuthProtect = ()=>{
    const dispatch = useDispatch()
    const routeto = useNavigate()
    const [verifyUser] = useVerifyAdminMutation()
    let loginToken = localStorage.getItem('admin-token')?JSON.parse(localStorage.getItem('admin-token')):null
    const isAuth = useAuth()
    const route = routesName.adminLogIn
    useEffect(()=>{
        verifyUser(loginToken).then((response)=>{
            console.log(response.error)
            if(!response.error){
                dispatch(setAdminInfo(response.data))
            }else{
                routeto(route)
            }
            
 
        })
    },[])
    
    
    return isAuth?<Outlet/>:<Navigate to={route}/>
}

export default AdminAuthProtect