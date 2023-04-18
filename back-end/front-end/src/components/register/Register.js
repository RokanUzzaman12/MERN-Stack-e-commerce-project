import './register.css'
import { useState } from 'react'
import { useAddUserMutation } from '../../features/userApi'
import { toast } from 'react-toastify'
const Register = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    })

    const userValidation = {
        firstNameError:null,
        lastNameError:null,
        emailError:null,
        passwordError:null,
    }

    const [error,setError] = useState({})
    const [addUser] = useAddUserMutation()

    // ============================================== Reset Input Function Start =================================
    const resetInput = () => {
        setUser({
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        })
    }
    // ======================= XXX =================== Reset Input function End ================ XXX ==============


    // =============================================== from validation function Start =============================

    const validation = () => {

        if(!user.firstName){
            userValidation.firstNameError = "First is Required"
        }
        if(!user.lastName){
            userValidation.lastNameError = "Last is Required"
        }
        if(!user.email){
            userValidation.emailError = "Email is Required"
        }
        if(!user.password){
            userValidation.passwordError = "Password is required"
        }else{
            if(user.password.length < 6){
                userValidation.passwordError = "password should greater then 6 charecter"
            }
        }

        setError(userValidation)
        
        if(userValidation.firstNameError){
            return false
        }else{
            return true
        }
    }

    // =============================================== From validation function End ===============================
    const submitHandel = (e) => {
        e.preventDefault()
        setIsLoading(true)
        let notError =  validation()
        
        if(notError){
            addUser(user).then((response)=>{
                if(response.data.type === "success"){
                    toast.success(`${response.data.msg}`)
                    resetInput()
                    setIsLoading(false)
                }
            })
        }else{
            setIsLoading(false)
        }
    

    }
    return (
        <div className='container-fluid'>
            <div className="row form-height d-flex align-item-center ">
                <div className="col-md-4 offset-md-4 d-flex justify-content-center ">

                    <div className='cart-speaceing'>
                        <div className="card shadow mb-5 bg-body rounded">
                            <div className="card-header">
                                Registration
                            </div>
                            <div className="card-body">
                                <form onSubmit={(e) => submitHandel(e)}>
                                    <div className="mb-3">
                                        <label htmlFor="first-name" className="form-label">First Name</label>
                                        <input type="text" className="form-control" id="first-name" value={user.firstName} onChange={(e) => setUser({ ...user, firstName: e.target.value })} />
                                        <small className='text-danger'>{error.firstNameError}</small>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="last-name" className="form-label">Last Name</label>
                                        <input type="text" className="form-control" id="last-name" value={user.lastName} onChange={(e) => setUser({ ...user, lastName: e.target.value })} />
                                        <small className='text-danger'>{error.lastNameError}</small>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email address</label>
                                        <input type="email" className="form-control" id="email" aria-describedby="emailHelp" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
                                        <small className='text-danger'>{error.emailError}</small>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <input type="password" className="form-control" id="password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />
                                        <small className='text-danger'>{error.passwordError}</small>
                                    </div>
                                    <button type="submit" className="btn btn-primary" disabled={isLoading ? true : false}>Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    )
}

export default Register