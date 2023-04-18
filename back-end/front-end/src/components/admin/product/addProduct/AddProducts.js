import { useState } from "react"
import {useRef} from 'react'
import AdminSidebar from "../../adminSideBar/AdminSidebar"
import {useAddNewProductsMutation} from "../../../../features/productApi"
import { toast } from 'react-toastify'
const AddProducts = () => {
    
    let fileRef = useRef(null)

    let productData = {
        name:'',
        description:'',
        price:'',
        image:''
    }
    let verificationData = {
        nameError:'',
        descriptionError:'',
        priceError:'',
        imageError:''
    }
    const [product, setProduct] = useState(productData)
    const [verification,setVerification] = useState(verificationData)
    const [addNewProduct] = useAddNewProductsMutation()

    

    const submitProductData =(e)=>{
        e.preventDefault()
        setVerification(verificationData)
        let formData = new FormData()
        formData.append('name',product.name)
        formData.append('description',product.description)
        formData.append('price',product.price)
        formData.append('image',product.image)
        console.log(formData)
        if(product.name == '' || product.description == '' || product.price == '' || product.image == ''){

            if(product.name == ''){
                setVerification((state)=>({...state,nameError:"Name is required"}))
            }
            if(product.description == ''){
                setVerification((state)=>({...state,descriptionError:"Description is required"}))
            }
            if(product.price == ''){
                setVerification((state)=>({...state,priceError:"Price is required"}))
            }
            if(product.image == ''){
                setVerification((state)=>({...state,imageError:"Image is required"}))
            }
    
            
            
        }else{
            addNewProduct(formData).then((response)=>{
                if(response.data.type == 'success'){
                    setProduct(productData)
                    fileRef.current.value = null
                    toast.success(response.data.msg)
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
                    <div className="card mt-5">
                        <div className="card-header text-center ">Add Product</div>
                        <div className="card-body">
                            <form onSubmit={(e)=>submitProductData(e)} encType="multipart/form-data">
                                <div className="form-group">
                                    <label >Product Title</label>
                                    <input type="text" className="form-control mt-1"  placeholder="Product Title" value={product.name} onChange={(e)=>setProduct({...product,name:e.target.value})}/>
                                     <small className="text-danger">{verification.nameError?verification.nameError:''} </small>
                                </div>

                                <div className="form-group mt-3">
                                    <label>Product Description</label>
                                    <textarea className="form-control mt-1" placeholder="Product description" value={product.description} onChange={(e)=>setProduct({...product,description:e.target.value})}  rows="5"></textarea>
                                    <small className="text-danger">{verification.descriptionError?verification.descriptionError:''} </small>
                                </div>

                                <div className="form-group mt-3">
                                    <label >Product Price</label>
                                    <input type="number" className="form-control mt-1"  placeholder="Product Price" value={product.price} onChange={(e)=>setProduct({...product,price:e.target.value})}/>
                                    <small className="text-danger">{verification.priceError?verification.priceError:''} </small>
                                </div>

                                <div className="form-group mt-3">
                                    <label >Product Image</label>
                                    <input ref={fileRef} type="file" className="form-control mt-1" onChange={(e)=>setProduct({...product,image:e.target.files[0]})}/>
                                    <small className="text-danger">{verification.imageError?verification.imageError:''} </small>
                                </div>
                                
                                <button className="btn btn-primary mt-3">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddProducts