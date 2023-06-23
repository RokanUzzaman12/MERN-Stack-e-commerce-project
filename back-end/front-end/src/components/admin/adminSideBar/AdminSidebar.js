import { useEffect, useState } from 'react'
import { useSelector,useDispatch } from "react-redux"
import { Link } from 'react-router-dom'
import routes from '../../../routes.js'
import { useGetAllRoleByUserRoleQuery } from '../../../features/roleApi.js'
import {showHandle,addData,handelSubNav} from '../../../features/sideBarSlice.js'
import './adminSidebar.css'
const AdminSidebar = () => {
    const dispatch = useDispatch()
    const allRoleMenu = useSelector((state)=>state.sideBarSlice)
    // console.log("test",allRoleMenu)
    const{data:allUserRole,error:userRoleError,isLoading:userRoleLoading} = useGetAllRoleByUserRoleQuery()
    // console.log(allUserRole)


    const [dropdown, setDropdown] = useState([])
    const [show, setShow] = useState(false)
    const [navigation, setNavigation] = useState([])
    const [previousNavId,setPreviousNavId] = useState(null)


    useEffect(()=>{
        allUserRole && setNavigation(allUserRole.data)
        if(allRoleMenu.navData.length==0){
            allUserRole && dispatch(addData(allUserRole.data))
        }
        
    },[allUserRole])

    
    // useEffect(() => {
    //     showChildBar()
    // }, [])

    // let showChildBar = () => {
    //     setShow(!show)

    // }

    let handelSubNavMenu = ()=>{
        let data = {navData:allUserRole.data}
        dispatch(handelSubNav(data))
    }

    let showMenuHandle = (navId)=>{  
        let data = {navId:navId,navData:allUserRole.data}
        dispatch(showHandle(data))
         
    }

    return (
        <div className="side-bar">

            <div className="search-by-other">
                <p>Admin Dashboard</p>

                {
                    allRoleMenu && allRoleMenu.navData.map((nav,index) => (
                        <ul key={nav._id}>
                            <li className='product-button'  > <span onClick={()=>showMenuHandle(nav._id)} > {nav.title} <i className={nav.rightIcon} ></i></span> 
                                <ul className='childNav' >
                                    {
                                    
                                    allRoleMenu.show && nav.subNav.map((item) => (
                                        <span key={item._id}>
                                            {item.isMenu &&                                         
                                                <li>
                                                { <span> <span><i className="fa-regular fa-hand-point-right"></i></span> <Link to={item.routePath} onClick={()=>handelSubNavMenu()} className='childNavIdem' key={item._id} >{item.subNavTitle} </Link> </span> }
                                                </li>
                                            
                                            }
                                        </span>
   
                                    ))
                                    
                                    }
                                </ul>
                            </li>
                        </ul>
                    ))
                }



            </div>




        </div>
    )
}

export default AdminSidebar