
import { useGetSingleProductQuery } from "../../features/productApi"
import { useParams } from 'react-router-dom'
import ReactImageMagnify from 'react-image-magnify';
// import './productDetails.css'
// import image300 from '../../../../images/300.jpg'
// import image1200 from '../../../../images/1200.jpg'
const ProductDetailsForClient = () => {

    const { productId } = useParams()
    const { data, error, isLoading } = useGetSingleProductQuery(productId)
    let image300 = data?`${process.env.REACT_APP_BASE_URL}/uploads/${data.data.image}`:''
    let image1200 = data?`${process.env.REACT_APP_BASE_URL}/uploads/${data.data.image}`:''
    
    return (
        <div>
            <div className="margin-top-right">
                <div className="row">
                    <div className="col-md-1"></div>
                    <div className="col-md-4">
                        <div className="card mt-5">
                            <div className="card-header text-center "> {data && data.data.name} </div>
                            <div className="card-body">

                                <div className="productImage">
                                        <ReactImageMagnify {...{
                                            smallImage: {
                                                alt: 'Wristwatch by Ted Baker London',
                                                isFluidWidth: true,
                                                src: image300
                                            },
                                            largeImage: {
                                                src: image1200,
                                                width: 1200,
                                                height: 1800
                                            },

                                            style:{
                                                width:'100%',
                                                height:'100%'
                                            },

                                            enlargedImageContainerDimensions: {
                                                width: '120%',
                                                height: '100%'
                                            }
                                        }} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 desc">
                        <div className="card mt-5">
                            <div className="card-header text-center">
                               Description
                            </div>
                            <div className="card-body">
                                 {
                                 data && 
                                    <div className="product-description">
                                        {data.data.description}
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="col-md-1"></div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetailsForClient