import './register.css'
import { useState } from 'react'
import { useAddNewAdminMutation } from '../../../features/adminApi'
// import { toast } from 'react-toastify'
const AdminSignUp = () => {
    let initialAdminData ={
        firstName:'',
        lastName:'',
        email:'',
        password:'',
        confirmPassword:''
    } 
    let verification = {
        firstNameError:'',
        lastNameError:'',
        emailError:'',
        passwordError:'',
        confirmPasswordError:''
    }
    const [adminData,setAdminData] = useState(initialAdminData)
    const [verificationError,setVerificationError] = useState(verification)
    const [showPassword,setShowPassword] = useState(false)
    const [showConfirmPassword,setShowConfirmPassword] = useState(false)

    const [addNewData] = useAddNewAdminMutation()
    
    const submitFromData = (e)=>{
        e.preventDefault()
        console.log(adminData)
        setVerificationError(verification)
        if(adminData.firstName === '' || adminData.lastName === '' || adminData.email === '' || adminData.password === '' || adminData.confirmPassword === ''){
            if(adminData.firstName === ''){
                setVerificationError((state)=>({...state,firstNameError:'First Name Is Required'}))
            }
            if(adminData.lastName === ''){
                setVerificationError((state)=>({...state,lastNameError:'Last Name Is Required'}))
            }
            if(adminData.email === ''){
                setVerificationError((state)=>({...state,emailError:'Email Is Required'}))
            }
            if(adminData.password === ''){
                setVerificationError((state)=>({...state,passwordError:'Password Is Required'}))
            }
            if(adminData.confirmPassword === ''){
                setVerificationError((state)=>({...state,confirmPasswordError:'Please Re Enter the password'}))
            }else{
                if(adminData.password !== adminData.confirmPassword){
                    setVerificationError((state)=>({...state,confirmPasswordError:'Password and Confirm password is not same'}))
                }
            }

        }else{
            addNewData(adminData).then((response)=>{
                console.log(response)
            })
        }
    }
    return (
        <div className='container-fluid'>
            <div className="row form-height d-flex align-item-center ">
                <div className="col-md-4 offset-md-4 d-flex justify-content-center ">

                    <div className='cart-speaceing'>
                        <div className="card shadow mb-5 bg-body rounded">
                            <div className="card-header">
                                Admin Registration
                            </div>
                            <div className="card-body">
                                <form onSubmit={(e)=>submitFromData(e)} >
                                    <div className="mb-3">
                                        <label htmlFor="first-name" className="form-label">First Name</label>
                                        <input type="text" placeholder='Enter First Name' className="form-control" id="first-name" value={adminData.firstName} onChange={(e)=>setAdminData({...adminData,firstName:e.target.value})} />
                                        {verificationError.firstNameError && <span className='text-danger'>{verificationError.firstNameError}</span>}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="last-name" className="form-label">Last Name</label>
                                        <input type="text" placeholder='Enter Last Name' className="form-control" id="last-name" value={adminData.lastName} onChange={(e)=>setAdminData({...adminData,lastName:e.target.value})} />
                                        {verificationError.lastNameError && <span className='text-danger'>{verificationError.lastNameError}</span>}
                                        
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email address</label>
                                        <input type="email" placeholder='Enter E-mail' className="form-control" id="email" aria-describedby="emailHelp" value={adminData.email} onChange={(e)=>setAdminData({...adminData,email:e.target.value})} />
                                        {verificationError.emailError && <span className='text-danger'>{verificationError.emailError}</span>}
                                        
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <div className='password-field'>
                                            <input type={showPassword?"text":"password"} placeholder='Enter Password' className="form-control " id="password" value={adminData.password} onChange={(e)=>setAdminData({...adminData,password:e.target.value})} autoComplete="on"/>
                                            <span className='eye' onClick={()=>setShowPassword(!showPassword)}><i className={showPassword?"fa-regular fa-eye":"fa-regular fa-eye-slash"}></i></span>
                                            {verificationError.passwordError && <span className='text-danger'>{verificationError.passwordError}</span>}
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="confirm-password" className="form-label">Confirm password</label>
                                        <div className='password-field'>
                                            <input type={ showConfirmPassword?"text":"password"} placeholder='Enter Confirm Password' className="form-control" id="confirm-password" value={adminData.confirmPassword} onChange={(e)=>setAdminData({...adminData,confirmPassword:e.target.value})} autoComplete="on" />
                                            <span className='eye' onClick={()=>setShowConfirmPassword(!showConfirmPassword)}><i className={showConfirmPassword?"fa-regular fa-eye":"fa-regular fa-eye-slash"}></i></span>
                                            {verificationError.confirmPasswordError && <span className='text-danger'>{verificationError.confirmPasswordError}</span>}
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

export default AdminSignUp