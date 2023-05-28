import AdminSidebar from "../adminSideBar/AdminSidebar"
import routerName from '../../../routes'
import { useState,useEffect } from "react"
import {useGetAllAdminQuery,useUpdateAdminMutation} from '../../../features/adminApi'
import {useGetAllRoleQuery} from '../../../features/roleApi'
import Multiselect from 'multiselect-react-dropdown';
import { Modal } from "react-bootstrap"
// import {Link} from "react-router-dom"


let ManageAdmin = ()=>{
    const {data:getAdmin,errors:adminError,isLoading:adminLoading} = useGetAllAdminQuery()
    const {data:getAllRole,errors:roleError,isLoading:roleLoading} = useGetAllRoleQuery()
    const [updateAdmin] = useUpdateAdminMutation()
    const [modalShow,setModalShow] = useState(false)
    let InitialEditItem = {
        name:'',
        emsil:'',
        role:''
    }
    const [editItem,setEditItem] = useState(InitialEditItem)
    const editAdminInfo = (value)=>{
        setModalShow(true)
        setEditItem(value)

    }

    const submitFromData = (e)=>{
        e.preventDefault()
        updateAdmin(editItem).then((res)=>{
            console.log(res)
        })
    }
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
                    <Modal.Header>Edit Admin</Modal.Header>
                    <Modal.Body>

                        <div className="card">

                            <div className="card-body">
                                <form onSubmit={(e)=>submitFromData(e)} >
                                        <div className="row">
                                            <div className="col-md-12">

                                                <div className="form-group mt-3">
                                                    <label >Admin Name</label>
                                                    <input type="text" className="form-control mt-1"  placeholder="Permission Name" value={editItem.firstName} onChange={(e)=>setEditItem({...editItem,firstName:e.target.value})} />
                                                    
                                                </div>

                                                <div className="form-group mt-3">
                                                    <label >Email</label>
                                                    <input type="text" className="form-control mt-1"  placeholder="Permission Name" value={editItem.email} onChange={(e)=>setEditItem({...editItem,email:e.target.value})} />
                                                    
                                                </div>


                                                <div className="form-group mt-3">
                                                    <label >Role Name</label>
                                                    <Multiselect
                                                        isObject={true}
                                                        singleSelect={true} 
                                                        options={getAllRole && getAllRole.data}
                                                        displayValue="name"
                                                        
                                                        selectedValues={function noRefCheck(){}}
                                                        onKeyPressFn={function noRefCheck(){}}
                                                        onRemove={function noRefCheck(){}}
                                                        onSearch={function noRefCheck(){}}
                                                        
                                                        onSelect={(data)=>setEditItem({...editItem,role:data[0]._id})}
                                                    />
                                                   
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

                <div className="col-md-10 mt-5">
                    <div className="card">
                        <div className="card-header">
                            Admin List
                        </div>
                        <div className="card-body">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col" >#</th>
                                        <th scope="col" >Name</th>
                                        <th scope="col" >Email</th>
                                        <th scope="col" >Role</th>
                                        <th scope="col" className="text-center" >Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        getAdmin && getAdmin.data.map((item,index)=>(
                                            <tr key={item._id}>
                                                <td>{index+1}</td>
                                                <td>{item.firstName}</td>
                                                <td>{item.email}</td>
                                                <td>{ item.role && item.role.name}</td>
                                                <td className="text-center">
                                                    <span className="eye-edit" onClick={()=>editAdminInfo(item)} > <i className="fa fa-pencil"></i> </span>
                                                    <span className="eye-delete" ><i className="fa fa-trash"></i></span>
                                                </td>
                                            </tr>
                                        ))
                                    }

                                </tbody>

                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ManageAdmin