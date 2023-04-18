import AdminSidebar from "../../adminSideBar/AdminSidebar"
import {useGetAllProductsQuery, useDeleteProductMutation} from "../../../../features/productApi"
import routerName from '../../../../routes'
import {toast} from 'react-toastify'
import {Link} from "react-router-dom"
import './ProductList.css'

let ProductList = ()=>{
    const {data, error, isLoading} = useGetAllProductsQuery();
    const [deleteProduct] = useDeleteProductMutation()
    const remove = (id)=>{
        deleteProduct(id).then((response)=>{
            if(response.data?.type == 'success'){
                toast.success(response.data.msg)
            }
        })
    }
    return (
        <div className="margin-top-right">
            <div className="row">
                <div className="col-md-2">
                    <AdminSidebar />
                </div>
                <div className="col-md-10">
                    <div className="card mt-5">
                        <div className="card-header text-center "> Product List </div>
                        <div className="card-body">
                        <table className="table">
                            <thead>
                                <tr>
                                <th scope="col">#</th>
                                <th scope="col">Image</th>
                                <th scope="col">Name</th>
                                <th scope="col">Price</th>
                                <th scope="col" className="text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {!error && data && data.data.map((item,index)=>(
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

export default ProductList