import { Outlet,Navigate, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import routesName from '../../routes'
import {useVerifyUserMutation} from '../../features/authApi'
import {setUserInfo} from '../../features/authSlice'

const useAuth = ()=>{
    let user = {loogedIn:false}
    user.loogedIn = localStorage.getItem('token')?JSON.parse(localStorage.getItem('token')):false
    return user && user.loogedIn
}



const AuthProtectRoutes = ()=>{
    const dispatch = useDispatch()
    const routeto = useNavigate()
    const [verifyUser] = useVerifyUserMutation()
    let loginToken = localStorage.getItem('token')?JSON.parse(localStorage.getItem('token')):null
    const isAuth = useAuth()
    const route = routesName.logIn
    useEffect(()=>{
        verifyUser(loginToken).then((response)=>{
            console.log(response.error)
            if(!response.error){
                dispatch(setUserInfo(response.data))
            }else{
                routeto(route)
            }
            
 
        })
    },[])
    
    
    return isAuth?<Outlet/>:<Navigate to={route}/>
}

export default AuthProtectRoutes