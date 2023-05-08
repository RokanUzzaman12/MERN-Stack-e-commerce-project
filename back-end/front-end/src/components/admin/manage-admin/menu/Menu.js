import AdminSidebar from "../../adminSideBar/AdminSidebar"
import { useState } from "react"
import {useAddNewMenuMutation} from '../../../../features/menuApi'

const Menu = ()=>{
    const [addNew] = useAddNewMenuMutation()
    const [show,setShow] = useState(false)
    const menuData = {
        title:'',
    }
    const [menu,setMenu] = useState(menuData)

    const submitFrom = (e)=>{
        e.preventDefault()
        addNew(menu).then((response)=>{
            console.log(response)
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
                                <tr>
                                    <td>1</td>
                                    <td>Name</td>
                                    <td>Menu</td>
                                    <td>Link</td>
                                    <td className="text-center">
                                        Action
                                    </td>
                                </tr>

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