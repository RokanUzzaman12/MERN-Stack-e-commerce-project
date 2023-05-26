import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from "./components/home/Home";
import Cart from "./components/cart/Cart";
import Nav from "./components/nav/Nav";
import NotFound from "./components/NotFound";
import AdminIndex from './components/admin/AdminIndex';
import LogIn from './components/login/LogIn';
import Register from './components/register/Register';
import AboutUs from './components/static-pages/AboutUs';
import ContactUs from './components/static-pages/ContactUs';
import AuthProtectRoutes from './components/auth/AuthProtectRoutes';
import AddProducts from './components/admin/product/addProduct/AddProducts';
import ProductList from './components/admin/product/productList/ProductList';
import ProductDetails from './components/admin/product/productDetails/ProductDetails';
import EditProduct from './components/admin/product/editProduct/EditProduct';
import Permission from './components/admin/manage-admin/permission/Permission';
import Menu from './components/admin/manage-admin/menu/Menu';
import AdminSignUp from './components/admin/adminAuth/AdminSignUp';
import AdminLogIn from './components/admin/adminAuth/AdminLogIn';
import AdminAuthProtect from './components/auth/AdminAuthProtect';
import ProductDetailsForClient from './components/productDetails/ProductDetailsForClient';
import AddNewSlideImage from './components/admin/slideImage/addSlideImage/AddNewSliderImage';
import ImageList from './components/admin/slideImage/slideImageList/ImageList';
import Role from './components/admin/manage-admin/role/Role';
import {Routes,Route} from "react-router-dom"
import routerName from './routes'
import './App.css'
function App() {
  return (
    <div className="App container-fluid">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Nav/>
      <Routes>
        <Route path={routerName.home} element={<Home/>}/>
        <Route path={routerName.logIn} element={<LogIn/>}/>
        <Route path={routerName.signUp} element={<Register/>}/>
        <Route path={routerName.aboutUs} element={<AboutUs/>}/>
        <Route path={routerName.contactUs} element={<ContactUs/>}/>
        <Route path={`/product/:slug`} element = {<ProductDetailsForClient/>}/>
        <Route element={<AuthProtectRoutes/>}>
          <Route path={routerName.cart} element={<Cart/>}/>
        </Route>

        <Route element={<AdminAuthProtect/>}>
          <Route path={routerName.menu} element = {<Menu/>} />
          <Route path= {routerName.addProduct} element = {<AddProducts/>}/>
          <Route path={routerName.productList} element = {<ProductList/>} />
          <Route path={routerName.addSlideImage} element = {<AddNewSlideImage/>} />
          <Route path={routerName.slideImageList} element = {<ImageList/>} />
          <Route path={routerName.permission} element = {<Permission/>} />
          <Route path={routerName.role} element = {<Role/>}/>
          <Route path={routerName.admin} element={<AdminIndex/>} />
          <Route path={`${routerName.productDetailsById}/:productId`} element={<ProductDetails/>} />
          <Route path={`${routerName.editProductById}/:productId`} element = {<EditProduct/>} />
        </Route>

        <Route path={routerName.adminSignUp} element = {<AdminSignUp/>} />
        <Route path={routerName.adminLogIn} element = {<AdminLogIn/>} />
        
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </div>
  );
}

export default App;
