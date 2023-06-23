import AdminSidebar from "../../adminSideBar/AdminSidebar"
import Multiselect from 'multiselect-react-dropdown';
import { useGetAllMenusQuery } from "../../../../features/manageMenuApi"
import { useGetAllPermissionQuery } from "../../../../features/permissionApi"
import { useAddNewRoleMutation, useGetAllRoleQuery, useDeleteRoleMutation, useUpdateRoleMutation, useGetAllRoleByUserRoleQuery } from "../../../../features/roleApi"
import { toast } from 'react-toastify'
import { useState, useEffect } from "react"
import Swal from 'sweetalert2'
import { Modal } from "react-bootstrap"

const Role = () => {
    const [show, setShow] = useState(false)

    const [addNewRole] = useAddNewRoleMutation()
    const [deleteRole] = useDeleteRoleMutation()
    const [update] = useUpdateRoleMutation()
    let initialVerificationData = {
        titleError: '',
        menuError: '',
        pathError: ''
    }

    let roleInitialValue = {
        name: '',
        menu: [],

    }



    const [role, setRole] = useState(roleInitialValue)
    const [verification, setVerification] = useState(initialVerificationData)
    const [modalShow, setModalShow] = useState(false)
    const [editItem, setEditItem] = useState({})
    const [permissionOption, setPermissionOption] = useState([])

    const { data: allMenu, error: menuerror, isLoading: menuLoading } = useGetAllMenusQuery()
    const { data: allPermission, error: permissionError, isLoading: permissionIsLoading } = useGetAllPermissionQuery()
    const { data: allRole, error: roleError, isLoading: loadingError } = useGetAllRoleQuery()
    const{data:allUserRole,error:userRoleError,isLoading:userRoleLoading} = useGetAllRoleByUserRoleQuery()
    // console.log(allUserRole)


    // useEffect(()=>{
    //     allRole && allRole.data.map((item)=>{
    //         console.log()
    //     })
    // },[allRole])
    // const onSelect =(data)=>{
    //     setPermission((state)=>({...state,navId:'2'}))
    //     console.log(permission)
    // }

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
                deleteRole(id).then((response) => {
                    if (response.data.type === 'success') {
                        Swal.fire(
                            'Deleted!',
                            `${response.data.msg}`,
                            'success'
                        )
                    } else {
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

    const hideForm = () => {
        setShow(false)
        setRole(roleInitialValue)
        setVerification(initialVerificationData)
    }
    const submitFrom = (e) => {
        e.preventDefault()
        addNewRole(role).then((response) => {
            if (response.data.type === 'success') {
                toast.success(response.data.msg)
            }
        })
    }

    const saveEditedData = (e) => {
        e.preventDefault()
        update(editItem).then((response)=>{
            console.log(response)
            if(response.data.type === 'success'){
                toast.success(response.data.msg)
            }
        })   
    }

    const handelShowModal = (data) => {
        setModalShow(true)
        setEditItem(data)
    }

    const selectedItem = (data)=>{
        // console.log(data)
        let editIndex = editItem.givenPermission.findIndex((item)=>item._id === data._id)
        // console.log(editIndex)
        if(editIndex === -1){
            return false
        }else{
            return true
        }
        
        // let index = editItem.givenPermission.findIndex((item))
    }

    const menuWisePermission = (data,permission)=>{

        let editIndex = data.givenPermission.findIndex((item)=>item._id === permission._id)
       
        if(editIndex === -1){
            return false
        }else{
            return true
        }
    }

   const handelCheckBox = (e)=>{
        let dataObj = {
            _id:e.target.value
        }
        if(e.target.checked){
            
            setEditItem((state)=>({...state,givenPermission:[...state.givenPermission,dataObj]}))
        }else{
            let copyEditItem = editItem.givenPermission
            let updatedArray = copyEditItem.filter((item)=>item._id !== e.target.value)
            setEditItem((state)=>({...state,givenPermission:updatedArray}))
        }
   }

   const handelMenu = (data)=>{
        let updatedPermission = []
        data.map((item)=>{
            updatedPermission.push(...item.subNav)
        })
        // editItem.permission = updatedPermission
        setEditItem((state)=>({...state,permission:updatedPermission,menu:data}))
        console.log(updatedPermission)
   } 

   const filterPermission = (data)=>{
    let filteredPermission = []
    data.map((item)=>{
        item.subNav.map((sub)=>{
            filteredPermission.push(sub)
            
        })
    })
    setPermissionOption(filteredPermission)
    console.log(permissionOption)
    setRole((state)=>({...state,menu:data}))
    // setRole({ ...role, menu: data })
   }

    // const menuRemove = (data)=>{

    //     setRole((state)=>({...state,menu:data}))
    // }


    let options = [{ name: 'rokon', _id: '1' }, { name: 'asif', _id: '2' }]
    return (
        <div className="margin-top-right">
            <div className="row">
                <div className="col-md-2">
                    <AdminSidebar />
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
                                <form onSubmit={(e) => saveEditedData(e)} >
                                    <div className="row">
                                        <div className="col-md-3">
                                            <div>{editItem.name}</div>
                                        </div>
                                        <div className="col-md-4">
                                            <Multiselect
                                                isObject={true}
                                                //singleSelect={true} 
                                                options={allMenu && allMenu.data}
                                                displayValue="title"

                                                selectedValues={editItem.menu}
                                                onKeyPressFn={function noRefCheck() { }}
                                                onRemove={(data)=>handelMenu(data)}
                                                onSearch={function noRefCheck() { }}

                                                //onSelect={(data) => setEditItem({ ...editItem, menu: data })}
                                                onSelect={(data) => handelMenu(data)}
                                            />
                                        </div>
                                        <div className="col-md-5">


                                            <div className="text-capitalize d-flex flex-wrap">
                                                <div className="d-flex justify-content-start">
                                                    <div className="custom-control custom-checkbox mr-4 py-1 px-3">
                                                            {
                                                                editItem.permission && editItem.permission.map((item)=>(

                                                                    <span key={item._id}>
                                                                        <div>
                                                                            <input type="checkbox" defaultChecked={selectedItem(item)} id={item._id} className="custom-control-input" onChange={(e)=>handelCheckBox(e)} value={item._id}/>
                                                                            <label htmlFor={item._id} className="custom-control-label">{item.subNavTitle}</label>
                                                                        </div>
                                                                    </span>
                                                                ))
                                                            }

                                                    </div>
                                                </div>
                                            </div>


                                        </div>
                                        {/* <div className="col-md-12">
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



                                            </div> */}

                                    </div>

                                    <button className="btn btn-primary mt-3">Submit</button>
                                </form>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-primary" onClick={() => setModalShow(false)}> Close</button>
                    </Modal.Footer>
                </Modal>
                <div className="col-md-10">

                    {show ? <div className="row">
                        <div className="col-md-3"></div>

                        <div className="col-md-6">

                            <div className="card mt-5">
                                <div className="card-header">
                                    <div className="row">
                                        <div className="col-md-6">
                                            Create New Role
                                        </div>

                                        <div className="col-md-6 d-flex justify-content-end">
                                            <button onClick={() => hideForm()} className="btn btn-danger"><i className="fa-solid fa-xmark"></i></button>

                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={(e) => submitFrom(e)} >
                                        <div className="row">
                                            <div className="col-md-12">

                                                <div className="form-group mt-3">
                                                    <label >Role Name</label>
                                                    <input type="text" className="form-control mt-1" placeholder="Role Name" value={role.name} onChange={(e) => setRole({ ...role, name: e.target.value })} />
                                                    {verification.titleError && <small className="text-danger">{verification.titleError}</small>}
                                                </div>

                                                <div className="form-group mt-3">
                                                    <label >Menu Name</label>
                                                    <Multiselect
                                                        isObject={true}
                                                        // singleSelect={true} 
                                                        options={allMenu && allMenu.data}
                                                        displayValue="title"
                                                        onKeyPressFn={function noRefCheck() { }}
                                                        onRemove={(data)=> filterPermission(data)}
                                                        onSearch={function noRefCheck() { }}
                                                        onSelect={(data) => filterPermission(data) }
                                                    />
                                                    {verification.menuError && <small className="text-danger">{verification.menuError}</small>}
                                                </div>

                                                <div className="form-group mt-3">
                                                    <label >Select Permission</label>
                                                    <Multiselect
                                                        isObject={true}
                                                        // singleSelect={true} 
                                                        options={permissionOption}
                                                        displayValue="subNavTitle"
                                                        onKeyPressFn={function noRefCheck() { }}
                                                        onRemove={(data) => setRole({ ...role, givenPermission: data })}
                                                        onSearch={function noRefCheck() { }}
                                                        onSelect={(data) => setRole({ ...role, givenPermission: data })}
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

                    </div> : <span></span>}

                    <div className="card mt-5">
                        <div className="card-header">
                            <div className="row">
                                <div className="col-md-6">
                                    Role List
                                </div>

                                <div className="col-md-6 d-flex justify-content-end">
                                    <button onClick={() => setShow(true)} className="btn btn-primary">Create Role</button>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            {allRole && allRole.data.map((item) => (

                                <div className="border" key={item._id}>
                                    <div className="row p-2">
                                        <div className="col-md-2">{item.name}</div>

                                        <div className="col-md-3">
                                            {item.menu.map((m) => (
                                                <div className="badge bg-primary m-2" key={m._id}>{m.title}</div>
                                            ))}


                                        </div>
                                        <div className="col-md-5">
                                            {
                                                item.menu.map((m)=>(
                                                    <span key={m._id}>
                                                        {
                                                            m.subNav.map((s)=>(
                                                                <span className={menuWisePermission(item,s)?'badge bg-info m-2':'badge bg-danger m-2'} key={s._id}> {s.subNavTitle} </span>
                                                            ))
                                                        }
                                                    </span>
                                                ))
                                            }

                                            {/* {item.permission && item.permission.map((p) => (
                                                <div className="badge bg-info m-2" key={p._id}> {p.subNavTitle}</div>
                                            ))} */}
                                        </div>
                                        <div className="col-md-2">
                                            <div className="d-flex justify-content-center">
                                                <span className=" eye-edit" onClick={() => handelShowModal(item)} > <i className="fa fa-pencil"></i> </span>
                                                <span className=" eye-delete" onClick={() => remove(item._id)}><i className="fa fa-trash"></i></span>
                                            </div>

                                        </div>
                                    </div>

                                </div>

                            ))}


                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Role