import AdminSidebar from "../../adminSideBar/AdminSidebar"
import {useFetchAllImageQuery,useUpArrowMutation, useDownArrowMutation, useDeleteImageMutation} from "../../../../features/slideImageApi"
import routerName from '../../../../routes'
// import {toast} from 'react-toastify'
import {Link} from "react-router-dom"
// import './ProductList.css'

let ImageList = ()=>{
    const {data, error, isLoading} = useFetchAllImageQuery();
    const [upArrowClick] = useUpArrowMutation()
    const [downArrowClick] = useDownArrowMutation()
    const [deleteImage] = useDeleteImageMutation()
    const remove = (id)=>{
        // deleteProduct(id).then((response)=>{
        //     if(response.data?.type == 'success'){
        //         toast.success(response.data.msg)
        //     }
        // })
    }

    const upArrow = (id)=>{
        let imageItem = data.data.find((item)=>item._id === id)
        
        if(imageItem.order !== 0){
            upArrowClick(imageItem).then((response)=>{
                console.log(response.data)
            })
            
        }
    }
    const downArrow = (id)=>{
        let imageItem = data.data.find((item)=>item._id === id)
        
        if(imageItem.order !== data.data.length){
            downArrowClick(imageItem).then((response)=>{
                console.log(response.data)
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
                    <div className="card mt-5">
                        <div className="card-header text-center "> Slide Image List </div>
                        <div className="card-body">
                        <table className="table">
                            <thead>
                                <tr>
                                <th scope="col">#</th>
                                <th scope="col">Title</th>
                                <th scope="col">Image</th>
                                <th scope="col">Order</th>
                                <th scope="col" className="text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    !error && data && data.data.map((item,index)=>(
                                        <tr key={item._id}>
                                            <td className="align-middle">{index+1}</td>
                                            <td className="align-middle">{item.title}</td>
                                            <td className="align-middle">
                                                <img width='150px' height='80px' src={`${process.env.REACT_APP_BASE_URL}/uploads/${item.image}`} />
                                            </td>
                                            <td className="align-middle">{item.order}</td>

                                            <td className="align-middle text-center" >
                                            
                                                <span  className="eye-button m-1"  onClick={()=>upArrow(item._id)}><i className="fa-solid fa-arrow-up"></i></span>
                                                <span className="eye-button "  onClick={()=>downArrow(item._id)}><i className="fa-solid fa-arrow-down"></i></span>
                                                {/* <Link to={`${routerName.productDetailsById}/${item._id}`}><span className="eye-button"><i className="fa fa-eye"></i></span> </Link>  */}
                                                <Link to={`${routerName.editProductById}/${item._id}`} > <span className="eye-edit"><i className="fa fa-pencil"></i></span>  </Link> 
                                                <span className="eye-delete" onClick={()=>remove(item._id)}><i className="fa fa-trash"></i></span>
                                            </td>
                                        </tr>
                                    ))
                                }

                                {/* {!error && data && data.data.map((item,index)=>(
                                    <tr key={item._id}>
                                        <td className="align-middle">{index+1}</td>
                                        <td className="align-middle" > <img className="table-image" src={`${process.env.REACT_APP_BASE_URL}/uploads/${item.image}`}></img></td>
                                        <td className="align-middle" >{item.name}</td>
                                        <td className="align-middle" >{item.price}</td>
                                        <td className="align-middle text-center" >
                                          <Link to={`${routerName.productDetailsById}/${item._id}`}><span className="eye-button"><i className="fa fa-eye"></i></span> </Link> 
                                          <Link to={`${routerName.editProductById}/${item._id}`} > <span className="eye-edit"><i className="fa fa-pencil"></i></span>  </Link> 
                                           <span className="eye-delete" onClick={()=>remove(item._id)}><i className="fa fa-trash"></i></span>
                                        </td>
                                        
                                    </tr>
                                ))} */}

                            </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ImageList