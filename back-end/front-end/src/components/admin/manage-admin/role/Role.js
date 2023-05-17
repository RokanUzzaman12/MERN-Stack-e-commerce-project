import AdminSidebar from "../../adminSideBar/AdminSidebar"
import Multiselect from 'multiselect-react-dropdown';
import {useGetAllMenusQuery } from "../../../../features/manageMenuApi"
import {useGetAllPermissionQuery} from "../../../../features/permissionApi"
import {useAddNewRoleMutation, useGetAllRoleQuery} from "../../../../features/roleApi"
import {toast} from 'react-toastify'
import { useState } from "react"
import Swal from 'sweetalert2'
import { Modal } from "react-bootstrap"

const Role = ()=>{
    const [show,setShow] = useState(false)

    const [addNewRole] = useAddNewRoleMutation()

    let initialVerificationData = {
        titleError:'',
        menuError:'',
        pathError:''
    }

    let roleInitialValue = {
        name:'',
        menu:[],

    }

    const [role, setRole] = useState(roleInitialValue)
    const [verification,setVerification] = useState(initialVerificationData)
    const [modalShow,setModalShow] = useState(false)
    const [editItem,setEditItem] = useState({})

    const {data:allMenu,error:menuerror,isLoading:menuLoading} = useGetAllMenusQuery()
    const {data:allPermission, error:permissionError, isLoading:permissionIsLoading} = useGetAllPermissionQuery()
    const {data:allRole,error:roleError,isLoading:loadingError} = useGetAllRoleQuery()
    console.log(allRole)
    
    

    // const onSelect =(data)=>{
    //     setPermission((state)=>({...state,navId:'2'}))
    //     console.log(permission)
    // }

    const remove = (id) => {

        // Swal.fire({
        //     title: 'Are you sure?',
        //     text: "You won't be able to revert this!",
        //     icon: 'warning',
        //     showCancelButton: true,
        //     confirmButtonColor: '#3085d6',
        //     cancelButtonColor: '#d33',
        //     confirmButtonText: 'Yes, delete it!'
        //   }).then((result) => {
        //     if (result.isConfirmed) {
        //         deletePermission(id).then((response)=>{
        //             if(response.data.type === 'success'){
        //                 Swal.fire(
        //                     'Deleted!',
        //                     `${response.data.msg}`,
        //                     'success'
        //                   )
        //             }else{
        //                 Swal.fire(
        //                     'error',
        //                     'There is a problem',
        //                     'error'
        //                 )
        //             }
        //         })

        //     }
        // })

    }

    const hideForm = ()=>{
        setShow(false)
        setRole(roleInitialValue)
        setVerification(initialVerificationData)
    }
    const submitFrom = (e)=>{
        e.preventDefault()
        addNewRole(role).then((response)=>{
            if(response.data.type === 'success'){
                toast.success(response.data.msg)
            }
        })
    }

    const saveEditedData = (e)=>{
        e.preventDefault()


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
                                                    <label >Brand Name</label>
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
                                                        <input className="form-check-input" type="radio" name='isMenu' value='no' onChange={(e)=>setEditItem({...editItem,isMenu:e.target.value})} />
                                                        <label className="form-check-label" >
                                                            No
                                                        </label>
                                                    </div>

                                                    <div className="form-check">
                                                        <input className="form-check-input" type="radio" name='isMenu' value='yes' onChange={(e)=>setEditItem({...editItem,isMenu:e.target.value})} />
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
                                            Create New Role
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
                                                    <label >Role Name</label>
                                                    <input type="text" className="form-control mt-1"  placeholder="Role Name" value={role.name} onChange={(e)=>setRole({...role,name:e.target.value})} />
                                                    {verification.titleError && <small className="text-danger">{verification.titleError}</small>}
                                                </div>

                                                <div className="form-group mt-3">
                                                    <label >Menu Name</label>
                                                    <Multiselect
                                                        isObject={true}
                                                        // singleSelect={true} 
                                                        options={allMenu && allMenu.data}
                                                        displayValue="title"
                                                        onKeyPressFn={function noRefCheck(){}}
                                                        onRemove={function noRefCheck(){}}
                                                        onSearch={function noRefCheck(){}}
                                                        onSelect={(data)=>setRole({...role,menu:data})}
                                                    />
                                                    {verification.menuError && <small className="text-danger">{verification.menuError}</small>}
                                                </div>


                                            </div>

                                        </div>
                                        
                                        <button className="btn btn-primary mt-3" >Submit</button>
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
                                    Role List
                                </div>
                                
                                <div className="col-md-6 d-flex justify-content-end">
                                    <button onClick={()=>setShow(true)} className="btn btn-primary">Create Role</button>
                                </div>
                            </div>
                         </div>
                        <div className="card-body">
                        <table className="table">
                            <thead>
                                <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col" className="text-center">Menu</th>

                                </tr>
                            </thead>
                            <tbody>

                                {allRole && allRole.data.map((item,index)=>(
                                    <tr key={item._id}>
                                        <td>{index+1}</td>
                                        <td>{item.name}</td>
                                        <td className="text-center">
                                            {item.menu.map((m)=>(
                                                <span key={m._id}>
                                                    <span className="p-2">{m.title}</span>
                                                </span>
                                            
                                            
                                            ))}
                                            
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

export default Role