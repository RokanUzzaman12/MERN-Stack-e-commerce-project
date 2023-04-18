import { useSelector,useDispatch } from "react-redux"
import { useEffect } from "react"
import {removeSingleItemFromCart, decreaseItemQuantity, increaseItemQuantity, calculateTotal} from '../../features/cartSlice'
import {Link} from 'react-router-dom'
import routesName from '../../routes'
import './cart.css'
const Cart = ()=>{
    const allCarts = useSelector((state)=>state.cartSlice)
    const dispatch = useDispatch()

    // ========================================== Remove single Cart Item Start =====================================
    const removeSingleItem = (item)=>{ 
        dispatch(removeSingleItemFromCart(item))  
    }
    // ========================================== Remove Single cart item End =======================================

    // =========================================== decrease cart items start =======================================
    const decrease = (item)=>{
        dispatch(decreaseItemQuantity(item)) 
    }
    // ========================================== Decrease cart Items End ==========================================

    // ========================================== Increase cart item  cartQuantity =================================
        const increase = (item)=>{
            dispatch(increaseItemQuantity(item))
            // dispatch(calculateTotal())
        }
    // ========================================== Increase cart item cart quantity End==============================

    useEffect(()=>{
        dispatch(calculateTotal())
    },[allCarts.cartItems])
    return (
        <div className="cart-container">
            <h2> Shoping Cart </h2>
            {

            allCarts.cartItems.length === 0 ? (
                <div className="cart-empty">
                    Your cart is empty
                    <div className="start-shopping">
                        <Link to={routesName.home}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                            </svg>
                            <span>Start Shopping</span>     
                        </Link>
                    </div>
                </div>

                

            ):(
                <div>
                    <div className="titles">
                        <h3 className="product-title">Product</h3>
                        <h3 className="price">Price</h3>
                        <h3 className="quantity">Quantity</h3>
                        <h3 className="total">Total</h3>
                    </div>
                    <div className="cart-items">
                        {
                            allCarts.cartItems?.map((item)=>(
                                <div className="cart-item" key={item._id}>
                                    <div className="cart-product">
                                        <img src={`${process.env.REACT_APP_BASE_URL}/uploads/${item.image}`}/>
                                        <div>
                                            <h3>{item.name}</h3>
                                            <p>{item.description}</p>
                                            <button onClick={()=> removeSingleItem(item)}>Remove</button>
                                        </div>
                                    </div>
                                    <div className="cart-product-price">
                                        $ {item.price}
                                    </div>
                                    <div className="cart-product-quantity">
                                        <button onClick={()=>decrease(item)}>-</button>
                                        <div className="count">{item.cartQuantity}</div>
                                        <button onClick={()=>increase(item)}>+</button>
                                    </div>
                                    <div className="cart-product-total-price">
                                        $ {item.price * item.cartQuantity}
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className="cart-summary">
                        <button className="clear-cart">Clear Cart</button>
                        <div className="cart-checkout">
                            <div className="subtotal">
                                <span>Sub Total</span>
                                <span className="amount">${allCarts.totalPrice}</span>
                            </div>
                                <br/>
                            <div className="subtotal">
                                <span>Total Quantity</span>
                                <span className="amount">{allCarts.totalQuantity}</span>
                            </div>
                            <p>Taxs and Shipping calculate at checkout</p>
                            <button>Checkout</button>
                            <div className="continue-shopping">
                                <Link to={routesName.home}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                                    </svg>
                                    <span>Continue Shopping</span>     
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )

            }
        </div>
    )
}

export default Cart