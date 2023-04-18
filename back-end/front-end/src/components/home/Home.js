
import { useDispatch,useSelector } from "react-redux"
import { useGetAllProductsQuery } from "../../features/productApi"
import { addToCart,decreaseItemQuantity, increaseItemQuantity, removeSingleItemFromCart } from '../../features/cartSlice'
import { useNavigate } from "react-router-dom"
import SiteCart from "../siteCart/SiteCart"
import SideBar from "../left-side-bar/SideBar"
import { useEffect } from "react"
import routesName from '../../routes'
import './home.css'

const Home = () => {
    const { data, error, isLoading } = useGetAllProductsQuery()
    const dispatch = useDispatch()
    const allCarts = useSelector((state)=>state.cartSlice)
    // let getAllProducts = []
    // if (!error) {
    //     if (data) {
    //         if (data.type === 'success') {
    //             getAllProducts = data.data
    //         }
    //     }
    // } else {
    //     console.log(error)
    // }
    const navigate = useNavigate()
    const handelClick = (product) => {
        dispatch(addToCart(product))
        // navigate(routesName.cart)
    }
    const decrese = (item)=>{
        dispatch(decreaseItemQuantity(item))
        // if(item.cartQuantity == 1){
        //     dispatch(removeSingleItemFromCart(item))
        // }
    } 

    const increment = (item)=>{
        dispatch(increaseItemQuantity(item))
    }
//    const removeCart = (item)=>{
//         dispatch(removeSingleItemFromCart(item))
//     }
    
    const findCartItem = (item)=>{
      const data =   allCarts.cartItems.find((carts)=>carts._id === item._id)
      if(data){
        // if(data.cartQuantity===0){
        //     removeCart(item)
        // }
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


    return (

        <div>
            <SiteCart/>
            {
                isLoading ? (<p>Loading...</p>) : error ? (<p>An error occered</p>) : (
                    <>

                        <div className="home-container">
                            <h2 >All collection is available </h2>
                        </div>
                        <hr />
                        <SideBar/>
                        <div className="row">
                            
                            <div className="col-md-10 offset-md-2">
                                <div className="row">
                                    {data && data.data.map((item) => (
                                        <div className="col-md-3" key={item._id}>
                                            <div className="product">
                                                <h3>{item.name}</h3> 
                                                <img src={`${process.env.REACT_APP_BASE_URL}/uploads/${item.image}`} alt="rolax-watch" />
                                                <div className="details">
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