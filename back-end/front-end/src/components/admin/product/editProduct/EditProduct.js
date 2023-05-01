import AdminSidebar from "../../adminSideBar/AdminSidebar"
import { useGetSingleProductQuery, useUpdateProductMutation } from "../../../../features/productApi"
import { useParams } from 'react-router-dom'
import { useState,useEffect,useRef } from "react"
import { toast } from 'react-toastify'
import Multiselect from 'multiselect-react-dropdown';

const EditProduct = () => {
    let fileRef = useRef(null)
    const { productId } = useParams()
    const { data, error, isLoading } = useGetSingleProductQuery(productId)
    const [updateProductData] = useUpdateProductMutation()
    
    let initialState = {
        name:'',
        image:'',
        description:'',
        price:0,
        brand:''
    }

    let verificationData = {
        nameError:'',
        descriptionError:'',
        priceError:'',
        imageError:''
    }
    let options = ['potion1','option2','option3','option4']
    // const [product, setProduct] = useState(productData)
    const [verification,setVerification] = useState(verificationData)

    const submitProductData = (e)=>{
        e.preventDefault()
        setVerification(verificationData)
        let formData = new FormData()
        formData.append('_id',editItem._id)
        formData.append('name',editItem.name)
        formData.append('description',editItem.description)
        formData.append('price',editItem.price)
        formData.append('image',editItem.image)
        console.log(formData.entries())
        if(editItem.name == '' || editItem.description == '' || editItem.price == '' || editItem.image == ''){

            if(editItem.name == ''){
                setVerification((state)=>({...state,nameError:"Name is required"}))
            }
            if(editItem.description == ''){
                setVerification((state)=>({...state,descriptionError:"Description is required"}))
            }
            if(editItem.price == ''){
                setVerification((state)=>({...state,priceError:"Price is required"}))
            }
            if(editItem.image == ''){
                setVerification((state)=>({...state,imageError:"Image is required"}))
            }    
        }else{
            updateProductData({data:formData,_id:editItem._id}).then((response)=>{

                if(response.data.type == 'success'){
                    toast.success(response.data.msg)
                }
            })
        }


    }

    const onSelect = (selectedList, selectedItem)=>{
        console.log('list',selectedList)
        console.log('item',selectedItem)
    }

    const [editItem,setEditItem] = useState(initialState)
    useEffect(()=>{
        if(data){
            setEditItem({...data.data})
        }
        
    },[data])
   
    return (
        <div>
            <div className="margin-top-right">
                <div className="row">
                    <div className="col-md-2">
                        <AdminSidebar />
                    </div>
                    {data &&
                        <div className="col-md-10">
                            <div className="col-md-10">
                                <div className="card mt-5">
                                    <div className="card-header text-center ">Edit Product</div>
                                    <div className="card-body">
                                        <form onSubmit={(e)=>submitProductData(e)} encType="multipart/form-data">
                                            <div className="form-group">
                                                <label >Product Title</label>
                                                <input type="text" className="form-control mt-1" placeholder="Product Title" value={editItem.name} onChange={(e)=>setEditItem({...editItem,name:e.target.value})}/>
                                                <small className="text-danger">{verification.nameError?verification.nameError:''} </small>

                                            </div>

                                            <div className="form-group mt-3">
                                                <label>Product Description</label>
                                                <textarea className="form-control mt-1" placeholder="Product description" rows="5" value={editItem.description} onChange={(e)=>setEditItem({...editItem,description:e.target.value})}></textarea>
                                                <small className="text-danger">{verification.descriptionError?verification.descriptionError:''} </small>
                                            </div>

                                            <div className="form-group mt-3">
                                                <label >Product Price</label>
                                                <input type="number" className="form-control mt-1" placeholder="Product Price" value={editItem.price} onChange={(e)=>setEditItem({...editItem,price:e.target.value})} />
                                                <small className="text-danger">{verification.priceError?verification.priceError:''} </small>
                                            </div>
                                            
                                            <div className="form-group mt-3">
                                                <label >Brand Name</label>
                                                <Multiselect
                                                    isObject={false}
                                                    singleSelect={true}
                                                    options={options}
                                                    onSelect={onSelect}
                                                />
                                            </div>


                                            

                                            <div className="form-group mt-3">
                                                <label >Product Image</label>
                                                <input ref={fileRef} type="file" className="form-control mt-1" onChange={(e)=>setEditItem({...editItem,image:e.target.files[0]})} />
                                                <small className="text-danger">{verification.imageError?verification.imageError:''} </small>
                                            </div>
                                            {/* <div className="product-image mt-5">
                                                <img width='300' height='300' src={`${process.env.REACT_APP_BASE_URL}/uploads/${editItem.image}`}/>
                                            </div> */}
                                            <button className="btn btn-primary mt-3">Submit</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }

                </div>
            </div>
        </div>
    )
}

export default EditProduct