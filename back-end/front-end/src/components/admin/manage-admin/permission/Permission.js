import AdminSidebar from "../../adminSideBar/AdminSidebar"
import Multiselect from 'multiselect-react-dropdown';
import {useGetAllMenusQuery } from "../../../../features/manageMenuApi"
import {useAddNewPermissionMutation, useGetAllPermissionQuery,useDeletePermissionMutation, useUpdatePermissionMutation} from "../../../../features/permissionApi"
import {toast} from 'react-toastify'
import {useSelector,useDispatch } from "react-redux"
import { useState } from "react"
import Swal from 'sweetalert2'
import { Modal } from "react-bootstrap"

const Permission = ()=>{
    const [show,setShow] = useState(false)
    const [addNew] = useAddNewPermissionMutation()
    const [deletePermission] = useDeletePermissionMutation()
    const [updatePermission] = useUpdatePermissionMutation()

    let initialPermissionData = {
        subNavTitle:'',
        navId:'',
        routePath:'',
        isMenu:false
    }

    let initialVerificationData = {
        titleError:'',
        menuError:'',
        pathError:''
    }
    const sideBarSliceData = useSelector((state)=>state.sideBarSlice)
    const [permission,setPermission] = useState(initialPermissionData)
    const [verification,setVerification] = useState(initialVerificationData)
    const [modalShow,setModalShow] = useState(false)
    const [editItem,setEditItem] = useState({})

    const {data:allMenu,error:menuerror,isLoading:menuLoading} = useGetAllMenusQuery()
    const {data:allPermission, error:permissionError, isLoading:permissionIsLoading} = useGetAllPermissionQuery()
    
    

    // const onSelect =(data)=>{
    //     setPermission((state)=>({...state,navId:'2'}))
    //     console.log(permission)
    // }

    const checkPermission = (permissionName)=>{
        let result = false
        sideBarSliceData.navData.map((item)=>{
            
            item.subNav.map((sub)=>{ 
                if(sub.subNavTitle.toUpperCase() == permissionName.toUpperCase()){
                    console.log(sub.subNavTitle.toUpperCase() + " ------ " + permissionName.toUpperCase())
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

    const remove = (id) => {

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                deletePermission(id).then((response)=>{
                    if(response.data.type === 'success'){
                        Swal.fire(
                            'Deleted!',
                            `${response.data.msg}`,
                            'success'
                          )
                    }else{
                        Swal.fire(
                            'error',
                            'There is a problem',
                            'error'
                        )
                    }
                })

            }
        })

    }

    const hideForm = ()=>{
        setShow(false)
        setPermission(initialPermissionData)
        setVerification(initialVerificationData)
    }
    const submitFrom = (e)=>{
        e.preventDefault()
        setVerification(initialVerificationData)
        console.log(permission)
        if(permission.subNavTitle === '' || permission.navId === '' || permission.routePath === ''){
            if(permission.subNavTitle === ''){
                setVerification((state)=>({...state,titleError:"Title Is Required"}))
            }
            if(permission.navId === ''){
                setVerification((state)=>({...state,menuError:"Menu Is Required"}))
            }
            if(permission.routePath === ''){
                setVerification((state)=>({...state,pathError:"Path Is Required"}))
            }
        }else{
            addNew(permission).then((response)=>{
                if(response.data.type === 'success'){
                    toast.success(response.data.msg)
                }
            })
        }

    }

    const saveEditedData = (e)=>{
        e.preventDefault()

        if(editItem.subNavTitle === '' || editItem.navId === '' || editItem.routePath === ''){
            if(editItem.subNavTitle === ''){
                setVerification((state)=>({...state,titleError:"Title Is Required"}))
            }
            if(editItem.navId === ''){
                setVerification((state)=>({...state,menuError:"Menu Is Required"}))
            }
            if(editItem.routePath === ''){
                setVerification((state)=>({...state,pathError:"Path Is Required"}))
            }
        }else{
            updatePermission(editItem).then((response)=>{
                if(response.data.type === 'success'){
                    toast.success(response.data.msg)
                }
            })
        }



    }

    const handelShowModal = (data)=>{
        setModalShow(true)
        setEditItem(data)
    }
    let options = [{name:'rokon',_id:'1'},{name:'asif',_id:'2'}]
    return (
        <div className="margin-top-right">
            <div className="row">
                <div className="col-md-2">
                    <AdminSidebar/>
                </div>
                <Modal 
                show={modalShow}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                >
                    <Modal.Header>Edit Permission</Modal.Header>
                    <Modal.Body>

                        <div className="card">

                            <div className="card-body">
                                <form onSubmit={(e)=>saveEditedData(e)} >
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="form-group mt-3">
                                                    <label >Menu Name</label>
                                                    <Multiselect
                                                        isObject={true}
                                                        //singleSelect={true} 
                                                        options={allMenu && allMenu.data}
                                                        displayValue="title"
                                                        selectedValues={[editItem.navId]}
                                                        onKeyPressFn={function noRefCheck(){}}
                                                        onRemove={function noRefCheck(){}}
                                                        onSearch={function noRefCheck(){}}
                                                        onSelect={(data)=>setEditItem({...editItem,navId:data[0]._id})}
                                                    />
                                                    {verification.menuError && <small className="text-danger">{verification.menuError}</small>}
                                                </div>
                                                <div className="form-group mt-3">
                                                    <label >Permission Name</label>
                                                    <input type="text" className="form-control mt-1"  placeholder="Permission Name" value={editItem.subNavTitle} onChange={(e)=>setEditItem({...editItem,subNavTitle:e.target.value})} />
                                                    {verification.titleError && <small className="text-danger">{verification.titleError}</small>}
                                                </div>

                                                <div className="form-group mt-3">
                                                    <label >Url Path</label>
                                                    <input type="text" className="form-control mt-1"  placeholder="Permission Path" value={editItem.routePath} onChange={(e)=>setEditItem({...editItem,routePath:e.target.value})} />
                                                    {verification.pathError && <small className="text-danger">{verification.pathError}</small>}
                                                </div>

                                                <div className="form-group mt-3">
                                                    <label >Do you want to show it in sidebar</label>
                                                    
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="radio" name='isMenu' checked={!editItem.isMenu} value='no' onChange={(e)=>setEditItem({...editItem,isMenu:false})} />
                                                        <label className="form-check-label" >
                                                            No
                                                        </label>
                                                    </div>

                                                    <div className="form-check">
                                                        <input className="form-check-input" type="radio" name='isMenu' checked={editItem.isMenu} value='yes' onChange={(e)=>setEditItem({...editItem,isMenu:true})} />
                                                        <label className="form-check-label">
                                                            Yes
                                                        </label>
                                                    </div>
                                                </div>



                                            </div>

                                        </div>
                                    
                                    <button className="btn btn-primary mt-3">Submit</button>
                                </form>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button  className="btn btn-primary" onClick={()=>setModalShow(false)}> Close</button>
                    </Modal.Footer>
                </Modal>
                <div className="col-md-10">

                {show?<div className="row">
                    <div className="col-md-3"></div>

                        <div className="col-md-6">

                            <div className="card mt-5">
                                <div className="card-header">
                                    <div className="row">
                                        <div className="col-md-6">
                                            Create New Permission
                                        </div>
                                        
                                        <div className="col-md-6 d-flex justify-content-end">
                                            <button onClick={()=>hideForm()}  className="btn btn-danger"><i className="fa-solid fa-xmark"></i></button>
                                            
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={(e)=>submitFrom(e)} >
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="form-group mt-3">
                                                    <label >Menu Name</label>
                                                    <Multiselect
                                                        isObject={true}
                                                        singleSelect={true} 
                                                        options={allMenu && allMenu.data}
                                                        displayValue="title"
                                                        onKeyPressFn={function noRefCheck(){}}
                                                        onRemove={function noRefCheck(){}}
                                                        onSearch={function noRefCheck(){}}
                                                        
                                                        onSelect={(data)=>setPermission({...permission,navId:data[0]._id})}
                                                    />
                                                    {verification.menuError && <small className="text-danger">{verification.menuError}</small>}
                                                </div>
                                                <div className="form-group mt-3">
                                                    <label >Permission Name</label>
                                                    <input type="text" className="form-control mt-1"  placeholder="Permission Name" value={permission.subNavTitle} onChange={(e)=>setPermission({...permission,subNavTitle:e.target.value})} />
                                                    {verification.titleError && <small className="text-danger">{verification.titleError}</small>}
                                                </div>

                                                <div className="form-group mt-3">
                                                    <label >Url Path</label>
                                                    <input type="text" className="form-control mt-1"  placeholder="Permission Path" value={permission.routePath} onChange={(e)=>setPermission({...permission,routePath:e.target.value})} />
                                                    {verification.pathError && <small className="text-danger">{verification.pathError}</small>}
                                                </div>

                                                <div className="form-group mt-3">
                                                    <label >Do you want to show it in sidebar</label>
                                                    
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="radio" name='isMenu' checked={!editItem.isMenu} value='no' onChange={(e)=>setPermission({...permission,isMenu:false})} />
                                                        <label className="form-check-label" >
                                                            No
                                                        </label>
                                                    </div>

                                                    <div className="form-check">
                                                        <input className="form-check-input" type="radio" name='isMenu' checked={editItem.isMenu} value='yes' onChange={(e)=>setPermission({...permission,isMenu:true})} />
                                                        <label className="form-check-label"  >
                                                            Yes
                                                        </label>
                                                    </div>
                                                </div>



                                            </div>

                                        </div>
                                        
                                        <button className="btn btn-primary mt-3">Submit</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-3"></div>
                        
                    </div>:<span></span>}

                    <div className="card mt-5">
                        <div className="card-header"> 
                            <div className="row">
                                <div className="col-md-6">
                                    Permission List
                                </div>
                                
                                <div className="col-md-6 d-flex justify-content-end">
                                {checkPermission('Create Permission')? <button onClick={()=>setShow(true)} className="btn btn-primary">Create Permission</button> :''}
                                </div>
                            </div>
                         </div>
                        <div className="card-body">
                        <table className="table">
                            <thead>
                                <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Menu</th>
                                <th scope="col">Link</th>
                                <th scope="col" className="text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>

                                {allPermission && allPermission.data.map((item,index)=>(
                                    <tr key={item._id}>
                                        <td>{index+1}</td>
                                        <td>{item.subNavTitle}</td>
                                        <td>{item.navId.title}</td>
                                        <td>{item.routePath}</td>
                                        <td className="text-center">
                                            {checkPermission('Edit Permission')?<span className=" eye-edit" onClick={()=>handelShowModal(item)} > <i className="fa fa-pencil"></i> </span>:''}
                                            {checkPermission('Delete Permission')?<span className=" eye-delete" onClick={()=>remove(item._id)}><i className="fa fa-trash"></i></span>:''}
                                            
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
    )
}

export default Permission