import './register.css'
import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { useAdminLogInMutation } from '../../../features/adminApi'
import { useDispatch } from "react-redux"
import {setAdminInfo} from '../../../features/authSlice'
import routeNames from '../../../routes'
import { toast } from 'react-toastify'
const AdminLogIn = () => {
    let initialAdminData = {
        email:'',
        password:''
    }
    const [showPassword,setShowPassword] = useState(false)
    const [adminData,setAdminData] = useState(initialAdminData)
    const [logIn] = useAdminLogInMutation()
    const navigate = useNavigate()

    const dispatch = useDispatch()
    
    const handelShowPassword = ()=>{
        setShowPassword(!showPassword)
    }

    const submitUserData = (e)=>{
        e.preventDefault();
        logIn(adminData).then((response)=>{
            if(!response.error){
                if(response.data.type === 'success'){
                    toast.success(<span className="text-capitalize">{response.data.msg}</span>) 
                    

                    localStorage.setItem('admin-token',JSON.stringify(response.data.token))
                    dispatch(setAdminInfo(response.data))
                    navigate(routeNames.admin)

                }
            }else{
                if(response.error.data.type === 'passwordNotMatch'){
                    toast.error(response.error.data.msg)
                }
            }
        }) 
    }

    return (
        <div className='container-fluid'>
            <div className="row form-height d-flex align-item-center ">
                <div className="col-md-4 offset-md-4 d-flex justify-content-center ">

                    <div className='cart-speaceing'>
                        <div className="card shadow mb-5 bg-body rounded">
                            <div className="card-header">
                                Admin Log In
                            </div>
                            <div className="card-body">
                                <form onSubmit={(e)=>submitUserData(e)} >

                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email address</label>
                                        <input type="email" placeholder='Enter E-mail' className="form-control" id="email" aria-describedby="emailHelp" value={adminData.email} onChange={(e)=>setAdminData({...adminData,email:e.target.value})} />   
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <div className='password-field'>
                                            <input type={showPassword?"text":"password"} placeholder='Enter Password' className="form-control " id="password" autoComplete="on" value={adminData.password} onChange={(e)=>setAdminData({...adminData,password:e.target.value})} />
                                            <span className='eye' onClick={()=>handelShowPassword()} ><i className={showPassword?"fa-regular fa-eye":"fa-regular fa-eye-slash"}></i></span> 
                                        </div>
                                    </div>

                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    )
}

export default AdminLogIn