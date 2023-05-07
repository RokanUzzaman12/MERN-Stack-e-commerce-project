import { useState } from "react"
import {useRef} from 'react'
import AdminSidebar from "../../adminSideBar/AdminSidebar"
import {useAddNewSlideImageMutation} from "../../../../features/slideImageApi"
import { toast } from 'react-toastify'
const AddNewSlideImage = () => {
    
    let fileRef = useRef(null)

    let slideImage = {
        title:'',
        order:'',
        image:''
    }
    let verificationData = {
        titleError:'',
        orderError:'',
        imageError:''
    }
    const [imageData, setImageData] = useState(slideImage)
    const [verification,setVerification] = useState(verificationData)
    const [addNewImage] = useAddNewSlideImageMutation()

    

    const submitProductData =(e)=>{
        e.preventDefault()
        console.log(imageData)


        setVerification(verificationData)
        let formData = new FormData()
        formData.append('title',imageData.title)
        formData.append('image',imageData.image)

        // addNewImage(formData).then((response)=>{
        //     console.log(response)
        // })
        
        if(imageData.title === '' || imageData.image === ''){

            if(imageData.title === ''){
                setVerification((state)=>({...state,titleError:"Name is required"}))
            }

            if(imageData.image === ''){
                setVerification((state)=>({...state,imageError:"Image is required"}))
            }
            
        }else{
            addNewImage(formData).then((response)=>{
                console.log(response)
                if(response.data.type === 'success'){
                    setImageData(slideImage)
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
                                    <label >Image Title</label>
                                    <input type="text" className="form-control mt-1"  placeholder="Product Title" value={imageData.title} onChange={(e)=>setImageData({...imageData,title:e.target.value})}/>
                                     <small className="text-danger">{verification.nameError?verification.nameError:''} </small>
                                </div>


                                <div className="form-group mt-3">
                                    <label >Product Image</label>
                                    <input ref={fileRef} type="file" className="form-control mt-1" onChange={(e)=>setImageData({...imageData,image:e.target.files[0]})}/>
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

export default AddNewSlideImage