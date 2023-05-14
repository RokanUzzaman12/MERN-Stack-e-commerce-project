import AdminSidebar from "../../adminSideBar/AdminSidebar"
import {useGetAllMenusQuery,useAddNewMenuMutation, useDeleteMenuMutation} from "../../../../features/manageMenuApi"
import { useState } from "react"
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'



const Menu = ()=>{
    
   
    const [show,setShow] = useState(false)

    
    const {data,error,isLoading} = useGetAllMenusQuery()
    const [addNew] = useAddNewMenuMutation()
    const [deleteData] = useDeleteMenuMutation()

    const menuData = {
        title:'',
    }
    const [menu,setMenu] = useState(menuData)

    const submitFrom = (e)=>{
        e.preventDefault()
        addNew(menu).then((response)=>{
            if(response.data.type === 'success'){
                toast.success(response.data.msg)
            }
        })
       
        
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
                deleteData(id).then((response)=>{
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

    return (
        <div className="margin-top-right">
            <div className="row">
                <div className="col-md-2">
                    <AdminSidebar/>
                </div>
                <div className="col-md-10">
                    {show?<div className="row">
                        <div className="col-md-3"></div>

                        <div className="col-md-6">

                            <div className="card mt-5">
                                <div className="card-header">
                                    <div className="row">
                                        <div className="col-md-6">
                                            Create New Menu
                                        </div>
                                        
                                        <div className="col-md-6 d-flex justify-content-end">
                                            <button onClick={()=>setShow(false)}  className="btn btn-danger"><i className="fa-solid fa-xmark"></i></button>
                                            
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={(e)=>submitFrom(e)} >
                                        <div className="row">
                                            <div className="col-md-12">

                                                <div className="form-group">
                                                    <label >Menu Name</label>
                                                    <input type="text" className="form-control mt-1"  placeholder="Product Title" value={menu.title} onChange={(e)=>setMenu({...menu,title:e.target.value})} />
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
                                    Menu List
                                </div>
                                
                                <div className="col-md-6 d-flex justify-content-end">
                                    <button onClick={()=>setShow(true)} className="btn btn-primary">Create Menu</button>
                                    
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
                                {
                                    data && data.data.map((item,index)=>(
                                        <tr key={item._id}>
                                            <td>{index+1}</td>
                                            <td>{item.title}</td>
                                            <td>{item.order}</td>
                                            <td>Link</td>
                                            <td className="text-center">
                                                <span className="eye-delete" onClick={()=>remove(item._id)}><i className="fa fa-trash"></i></span>
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

export default Menu