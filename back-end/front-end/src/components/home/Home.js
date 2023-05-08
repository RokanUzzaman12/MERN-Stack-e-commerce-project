
import { useDispatch,useSelector } from "react-redux"
import { useGetAllProductsQuery } from "../../features/productApi"
import { addToCart,decreaseItemQuantity, increaseItemQuantity, removeSingleItemFromCart } from '../../features/cartSlice'
import {useFetchAllImageQuery} from '../../features/slideImageApi'
import { useNavigate } from "react-router-dom"
import SiteCart from "../siteCart/SiteCart"
import SideBar from "../left-side-bar/SideBar"
import { Fade } from 'react-slideshow-image';
import image2 from '../../images/slide-image-3.jpg'
import 'react-slideshow-image/dist/styles.css'
import { useEffect } from "react"
import routesName from '../../routes'
import './home.css'

const Home = () => {
    const { data, error, isLoading } = useGetAllProductsQuery()
    const {data:slideImageData,errors:slideImageError,loading:slideImageLoading} = useFetchAllImageQuery()
    console.log(slideImageData)
    const dispatch = useDispatch()
    const allCarts = useSelector((state)=>state.cartSlice)

    const navigate = useNavigate()
    const handelClick = (product) => {
        dispatch(addToCart(product))
        // navigate(routesName.cart)
    }
    const decrese = (item)=>{
        dispatch(decreaseItemQuantity(item))

    } 

    const increment = (item)=>{
        dispatch(increaseItemQuantity(item))
    }
    const findCartItem = (item)=>{
      const data =   allCarts.cartItems.find((carts)=>carts._id === item._id)
      if(data){
        return (
            <div className="cart-product-quantity">
                <button onClick={()=>decrese(item)} >-</button>
                <div className="count">{data.cartQuantity}</div>
                <button onClick={()=>increment(item)} >+</button>
            </div>
        )
      }else{
        return (<button onClick={() => handelClick(item)}>Add to Cart</button>)
      }
    }

    const productDetails=(slug)=>{
        navigate(`/product/${slug}`)
    }

    const spanStyle = {
        padding: '20px',
        background: '#efefef',
        color: '#000000'
      }
      
      const divStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundSize: 'cover',
        width:'1300px',
        height: '550px'
        
      }

    const fadeImages = [
        {
          url: {image2},
          caption: 'First Slide'
        },
        {
          url: 'https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80',
          caption: 'Second Slide'
        },
        {
          url: 'https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
          caption: 'Third Slide'
        },
      ];

    return (

        <div>
            <SiteCart/>
            {
                isLoading ? (<p>Loading...</p>) : error ? (<p>An error occered</p>) : (
                    <>


                        <SideBar />
                        <div className="home-container">
                            {/* <video src={video} autoPlay loop muted id="main_video" /> */}

                                <div className="slide-container">
                                    <Fade indicators={true} pauseOnHover={false}>
                                        {slideImageData && slideImageData.data.map((fadeImage, index) => (
                                        <div key={index}>
                                            
                                            <img style={divStyle} src={`${process.env.REACT_APP_BASE_URL}/uploads/${fadeImage.image}`} />
                                            {/* <h2 style={spanStyle}>{fadeImage.caption}</h2> */}
                                        </div>
                                        ))}
                                    </Fade>
                                </div>
                            <h2 >All collection is available </h2>
                            <hr />
                        </div>
                        
                        <div className="row">
                            
                            <div className="col-md-10 offset-md-2">
                                <div className="row">
                                    {data && data.data.map((item) => (
                                        <div className="col-md-3" key={item._id}>
                                            <div className="product" >
                                                <h3 onClick={()=>productDetails(item.slug)}>{item.name}</h3> 
                                                <img onClick={()=>productDetails(item.slug)} src={`${process.env.REACT_APP_BASE_URL}/uploads/${item.image}`} alt="rolax-watch" />
                                                <div onClick={()=>productDetails(item.slug)} className="details">
                                                    <span>Price</span>
                                                    <span className="price">{item.price}</span>
                                                </div>
                                               {findCartItem(item)}
                                                
                                            </div>
                                        </div>

                                    ))}
                                </div>
                            </div>
                        </div>
                    </>
                )
            }
        </div>
        // <div className="home-container">
        //     {
        //         isLoading?(<p>Loading...</p>):error?(<p>An error occered</p>):(
        //             <>

        //             <h2>All collection is available</h2>
        //             <hr/>
        //             <div className="products">
        //                 {getAllProducts && getAllProducts.map((item)=>(
        //                     <div key={item._id} className="product">
        //                         <h3>{item.name}</h3>
        //                         <img src={item.image} alt="rolax-watch"/>
        //                         <div className="details">
        //                             <span>Price</span>
        //                             <span className="price">{item.price}</span>
        //                         </div>
        //                         <button onClick={()=>handelClick(item)}>Add to Cart</button>
        //                     </div>
        //                 ))}
        //             </div>
        //             </>
        //         )
        //     }
        // </div>
    )
}

export default Home