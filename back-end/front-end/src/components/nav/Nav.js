import "./nav.css"
import { useSelector } from "react-redux"
import routesName from '../../routes'
import {Link} from 'react-router-dom'
const Nav = () => {
    const allCarts = useSelector((state)=>state.cartSlice)
    const userInfo = useSelector((state)=>state.authSlice)
    return (
        <div >
            <nav className="row nav-bar">
                <div className="col-md-4">
                    <Link to={routesName.home}>
                        <h2>E-commerce Shop</h2>
                    </Link>
                </div>

                <div className="col-md-4 nav-item" >
                    <Link className="p-2" to='/'>Home</Link>
                    <Link className="p-2" to={routesName.aboutUs}>About Us</Link>
                    <Link className="p-2" to={routesName.contactUs}>Contact Us</Link>
                </div>

                <div className="col-md-2 nav-item" >
                    <Link className="p-2" to={routesName.logIn}>LogIn</Link>
                    <Link to={routesName.signUp}>Register</Link>
                </div>
                
                <div className="col-md-2">
                    
                    <Link to={routesName.cart}>
                    <div className="nav-bag">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-bag-heart" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5v-.5Zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0ZM14 14V5H2v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1ZM8 7.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132Z" />
                        </svg>
                        <span className="bag-quantity">{allCarts.cartItems.length}</span>
                        <span className="user-name text-capitalize">{userInfo?userInfo.userInfo.firstName:'User Name'}</span>
                    </div>
                    </Link>
                </div>


            </nav>
        </div>
    )
}

export default Nav