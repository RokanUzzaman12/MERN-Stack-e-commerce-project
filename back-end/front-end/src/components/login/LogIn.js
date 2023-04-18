import { useState } from "react"
import { useDispatch } from "react-redux"
import {useLogInUserMutation} from '../../features/userApi'
import { useNavigate } from "react-router-dom"
import routeNames from '../../routes'
import {toast} from 'react-toastify'
import {setUserInfo} from '../../features/authSlice'
const LogIn = ()=>{

    const [user,setUser] = useState({
        email:'',
        password:''
    })
    const [loginApi] = useLogInUserMutation()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const resetInput = ()=>{
        setUser({email:'',password:''})
    }
    const submitHandel = (e) => {
        e.preventDefault()
        loginApi(user).then((response)=>{
            console.log(response)
            if(!response.error){
                if(response.data.type === 'success'){
                    toast.success(<span className="text-capitalize">{response.data.msg}</span>) 
                    resetInput()

                    localStorage.setItem('token',JSON.stringify(response.data.token))
                    dispatch(setUserInfo(response.data))
                    navigate(routeNames.home)

                }
            }else{
                if(response.error.data.type === 'passwordNotMatch'){
                    toast.error(response.error.data.msg)
                }
            }



        })
    }

    return (
        <div className="row form-height d-flex align-item-center ">
        <div className="col-md-4 offset-md-4 d-flex justify-content-center ">

            <div className='cart-speaceing'>
                <div className="card shadow mb-5 bg-body rounded">
                    <div className="card-header">
                        Registration 
                    </div>
                    <div className="card-body">
                    <form onSubmit={submitHandel}>
                        <div className="mb-3">
                            <label htmlFor="first-name" className="form-label">Email</label>
                            <input type="text" className="form-control" id="first-name" value={user.email} onChange={(e)=>setUser({...user,email:e.target.value})} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="last-name" className="form-label">password</label>
                            <input type="password" className="form-control" id="last-name" value={user.password} onChange={(e)=>setUser({...user,password:e.target.value})} />
                        </div>
                        <button type="submit" className="btn btn-primary">Log In</button>
                    </form>
                    </div>
                </div>
            </div>

        </div>
    </div>
    )
}

export default LogIn