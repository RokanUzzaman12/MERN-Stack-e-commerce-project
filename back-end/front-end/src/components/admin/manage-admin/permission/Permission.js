import AdminSidebar from "../../adminSideBar/AdminSidebar"
import Multiselect from 'multiselect-react-dropdown';
import {useGetAllMenusQuery } from "../../../../features/manageMenuApi"
import { useState } from "react"

const Permission = ()=>{
    const [show,setShow] = useState(false)
    const [permission,setPermission] = useState({
        subNavTitle:'',
        navId:'',
        isMenu:''
    })
    const {data:allMenu,error:menuerror,isLoading:menuLoading} = useGetAllMenusQuery()

    // const onSelect =(data)=>{
    //     setPermission((state)=>({...state,navId:'2'}))
    //     console.log(permission)
    // }
    const submitFrom = (e)=>{
        e.preventDefault()
        console.log(permission)
    }
    let options = [{name:'rokon',_id:'1'},{name:'asif',_id:'2'}]
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
                                                <div className="form-group mt-3">
                                                    <label >Brand Name</label>
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
                                                </div>
                                                <div className="form-group">
                                                    <label >Permission Name</label>
                                                    <input type="text" className="form-control mt-1"  placeholder="Product Title" value={permission.subNavTitle} onChange={(e)=>setPermission({...permission,subNavTitle:e.target.value})} />
                                                </div>

                                                <div className="form-group mt-2">
                                                    <label >Do you want to show it in sidebar</label>
                                                    
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="radio" name='isMenu' value='no' onChange={(e)=>setPermission({...permission,isMenu:e.target.value})} />
                                                        <label className="form-check-label" >
                                                            No
                                                        </label>
                                                    </div>

                                                    <div className="form-check">
                                                        <input className="form-check-input" type="radio" name='isMenu' value='yes' onChange={(e)=>setPermission({...permission,isMenu:e.target.value})} />
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

export default Permission