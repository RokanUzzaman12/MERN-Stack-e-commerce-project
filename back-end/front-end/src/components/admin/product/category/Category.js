import AdminSidebar from "../../adminSideBar/AdminSidebar"
import { useState } from "react"
import {useAddNewCategoryMutation,useGetAllCategoryQuery} from "../../../../features/categoryApi"
import {useSelector,useDispatch } from "react-redux"

// import Multiselect from 'multiselect-react-dropdown';
// import { useGetAllMenusQuery } from "../../../../features/manageMenuApi"
// import { useGetAllPermissionQuery } from "../../../../features/permissionApi"
// import { useAddNewRoleMutation, useGetAllRoleQuery, useDeleteRoleMutation, useUpdateRoleMutation, useGetAllRoleByUserRoleQuery } from "../../../../features/roleApi"
import { toast } from 'react-toastify'
// import { useState, useEffect } from "react"
// import Swal from 'sweetalert2'
// import { Modal } from "react-bootstrap"

const Category = () => {
    const sideBarSliceData = useSelector((state)=>state.sideBarSlice)
    const [addNewCategory] = useAddNewCategoryMutation()
    const {data:categoryData,error:categoryError, isLoading:categoryLoading} = useGetAllCategoryQuery()
    

    const initialCategoryState = {
        name:''
    }

    const initialVerificationError = {
        nameError:''
    }

    const [category,setCategory] = useState(initialCategoryState)
    const [verificationError,setVerificationError] = useState(initialVerificationError)

    const checkPermission = (permissionName)=>{
        let result = false
        sideBarSliceData.navData.map((item)=>{
            
            item.subNav.map((sub)=>{ 
                if(sub.subNavTitle.toUpperCase() == permissionName.toUpperCase()){
                    
                    result = true
                }
            })
        })
        
        if(result){
            return true
        }else{
            return false
        }
        
    }

    const submitCategoryData=(e)=>{
        e.preventDefault()
        let error = false

        setVerificationError(initialVerificationError)
        if(category.name === null || category.name === ''){
            error = true
            setVerificationError((state)=>({...state,nameError:"Name is Required"}))
        }

        if(!error){
            addNewCategory(category).then((response)=>{
                if(response.data.type === 'success'){
                    toast.success(response.data.msg)
                    setCategory(initialCategoryState)
                }
            })
        }

        
    }

   
    return (
        <div className="margin-top-right">
            <div className="row">
                <div className="col-md-2">
                    <AdminSidebar />
                </div>

                <div className="col-md-10">
                    <div className="row mt-5">
                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-header text-center">Create Category</div>
                                
                                <div className="card-body">
                                    <form onSubmit={(e)=>submitCategoryData(e)}>
                                        <div className="form-group mt-3">
                                            <label >Product Category</label>
                                            <input type="text" className="form-control mt-1"  placeholder="Category Name" value={category.name} onChange={(e)=>setCategory({...category,name:e.target.value})} />
                                            {verificationError.nameError !=='' && <small className="text-danger">{verificationError.nameError}</small>}<br/>
                                           <button className="btn btn-primary mt-3"> Submit </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-header text-center">Category List</div>
                                <div className="card-body">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Name</th>
                                            <th scope="col" className="text-center">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            { categoryData && categoryData.type === 'success' && categoryData.data.map((item,index)=>(
                                                <tr key={item._id}>
                                                    <td>{index+1}</td>
                                                    <td>{item.name}</td>
                                                    <td className="text-center" >
                                                        {checkPermission('Edit Category')}
                                                    {checkPermission('Edit Category ')?<span className=" eye-edit"  > <i className="fa fa-pencil"></i> </span>:''}
                                                    {checkPermission('Delete Category ')?<span className=" eye-delete" ><i className="fa fa-trash"></i></span>:''}
                                                    </td>
                                                </tr>
                                            ))}


                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Category